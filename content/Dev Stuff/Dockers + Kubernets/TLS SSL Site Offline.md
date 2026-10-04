# Fixing the "Site Offline" Issue: A Debugging Log

**TL;DR:** The n8n site was offline because Cloudflare SSL/TLS mode was set to **Flexible**, which conflicted with the Let's Encrypt certificate Dokploy/Traefik was trying to issue. The fix: switch Cloudflare to **Full (Strict)** (or turn off the proxy). Reference: [https://docs.dokploy.com/docs/core/domains/cloudflare](https://docs.dokploy.com/docs/core/domains/cloudflare)

## The Symptom

- The website (`n8n.cybersamurai.co.uk`) showed as **offline**.
- The n8n container was running and healthy, but external HTTPS access failed.
## Step-by-Step Investigation
### 1. Check which containers are running

```bash
docker ps -a
```
**What to look for:**

- Container status (`Up`, `Exited`, `Restarting`)
- Published ports in the `PORTS` column (e.g., `0.0.0.0:5678->5678/tcp`)

**What I found:**
- `n8n-1` was `Up`, but its port `5678` was **not published** to the host.
- That's normal when Traefik handles routing internally over the Docker network.

### 2. Check what's listening on the host
```bash
ss -tlpn
```

**What to look for:**

- Is anything listening on the port the app needs (e.g., `5678`)?
- Which processes own ports `80` and `443` (should be Traefik or docker-proxy)?

**What I found:**
- `5678` was missing — expected, since it's inside the container network.
- Ports `80` and `443` were held by `docker-proxy` for Traefik.
### 3. Verify the app is alive inside its own container
```bash
docker exec -it <n8n_container_id> wget -qO- http://localhost:5678/healthz
```
**Expected output:**
```json
{"status":"ok"}
```
**What I found:** ✅ n8n was healthy.


### 4. Verify Traefik can reach the app over the Docker network

```bash
docker exec -it <traefik_container_id> wget -qO- http://<n8n_container_name>:5678/healthz
```
**What I found:** ✅ Traefik → n8n worked fine internally.
**Conclusion:** The container, network, and internal routing were all fine. The problem was **outside** — at the TLS/proxy layer.

### 5. Check Traefik logs
```bash
docker logs <traefik_container_id> --tail 100
```

**What to look for:**

- `Cannot retrieve the ACME challenge for <domain>` → Let's Encrypt HTTP-01 challenge failing
- `Error while peeking client hello bytes` → TLS handshake issues (often bots)
- `Failed to list services for docker swarm mode` → Traefik provider timeouts

**What I found:**
- Repeated ACME challenge failures for `n8n.cybersamurai.co.uk`
- Most of the errors were **bot noise** (tokens like `index.php`, `admin.php`) — safe to ignore.
- But the real ACME challenge could never succeed either.

### 6. Check if the certificate exists and is valid
```bash
echo | openssl s_client -connect n8n.cybersamurai.co.uk:443 -servername n8n.cybersamurai.co.uk 2>/dev/null | openssl x509 -noout -dates -subject
```

**What to look for:**
- `notBefore` / `notAfter` dates (is the cert expired?)
- `subject` (does it match the domain?)
**What I found:**
- Cert was valid, but its `subject` was `CN = cybersamurai.co.uk`, **not** `n8n.cybersamurai.co.uk`

### 7. Check Traefik's ACME storage
```bash
docker exec <traefik_container_id> cat /letsencrypt/acme.json | head -c 500
```
**What I found:**
```text
cat: can't open '/letsencrypt/acme.json': No such file or directory
```
**Meaning:** Traefik had never successfully stored a certificate. The ACME challenge was failing every time.

### 8. Inspect Traefik's config and mounts
```bash
docker inspect <traefik_container_id> --format '{{json .Mounts}}' | jq
docker inspect <traefik_container_id> --format '{{json .Args}}' | jq
```
**What I found:**
- Traefik's config came from `/etc/dokploy/traefik/traefik.yml`
- Dynamic config in `/etc/dokploy/traefik/dynamic`
- Docker socket mounted read-only
- No ACME storage file was ever created
## Root Cause
The domain was proxied through Cloudflare (orange cloud) with **SSL/TLS mode set to "Flexible"**.
In Flexible mode:
- Cloudflare terminates HTTPS with its own cert
- Cloudflare talks to your origin server over **plain HTTP** (port 80)
- But Traefik/Dokploy was trying to serve **HTTPS with a Let's Encrypt cert** on port 443.
**The conflict:**

- Cloudflare expected HTTP on the origin, but Traefik was doing HTTPS.
- The TLS handshake between Cloudflare and Traefik was mismatched.
- Let's Encrypt's HTTP-01 challenge also failed because Cloudflare's proxy intercepted the verification request.

Result: no valid cert for the n8n subdomain → browsers showed the site as offline.

**Cloudflare Settings**
![[Pasted image 20261004100539.png]]
![[Pasted image 20261004100605.png]]

**Dokploy Mismatch Settings**
![[Pasted image 20261004100749.png]]

**New Settings**
![[Pasted image 20261004100838.png]]

## The Fix

Reference: [Dokploy – Cloudflare Guide](https://docs.dokploy.com/docs/core/domains/cloudflare
Two valid options depending on your setup:
### ✅ Option A: Full (Strict) mode (recommended if using Let's Encrypt)

1. Go to **Cloudflare Dashboard** → select your domain
2. Left sidebar → **SSL/TLS** → **Overview**
3. Click **Configure SSL/TLS Encryption**
4. Select **Full (Strict)**
5. Click **Save**
Then in Dokploy, make sure the domain is configured with:
- **HTTPS:** ON
- **Certificate:** Let's Encrypt

This lets Cloudflare trust the Let's Encrypt cert on your origin.

### ✅ Option B: Flexible mode (only if you don't want HTTPS on origin)

If you keep Cloudflare on **Flexible**, you must **turn off HTTPS in Dokploy**:
- **HTTPS:** OFF
- **Certificate:** None
Traefik then serves plain HTTP, matching what Cloudflare expects.
### ⚠️ Do NOT mix them

|Cloudflare Mode|Dokploy HTTPS|Result|
|---|---|---|
|Flexible|ON (Let's Encrypt)|❌ **Broken** (my case)|
|Flexible|OFF|✅ Works|
|Full (Strict)|ON (Let's Encrypt)|✅ Works|
|Full (Strict)|ON (Cloudflare Origin CA)|✅ Works|
|Full (Strict)|OFF|❌ Broken|

---
## Quick Reference: Debugging Checklist

When a site behind Cloudflare + Traefik/Dokploy is offline:
1. `docker ps -a` — are containers up?
2. `ss -tlpn` — what's listening on the host?
3. `docker exec <app> wget -qO- http://localhost:<port>/healthz` — is the app alive?
4. `docker exec <traefik> wget -qO- http://<app>:<port>/healthz` — can Traefik reach it?
5. `docker logs <traefik> --tail 100` — any ACME or TLS errors?
6. `openssl s_client -connect <domain>:443` — what cert is being served?
7. `docker exec <traefik> cat <acme_storage_path>` — does the cert exist?
8. `docker inspect <traefik>` — check mounts, args, config paths
9. **Check Cloudflare SSL/TLS mode** — is it compatible with your origin?

---
## Key Takeaways

- **Bot noise ≠ real errors.** `Cannot retrieve ACME challenge for index.php` is just scanners. Focus on whether the _legitimate_ challenge succeeds.
- **`acme.json` missing = certs never issued.** This is a strong signal that the ACME challenge is failing.
- **Cloudflare proxy + Let's Encrypt HTTP-01 don't mix.** The proxy intercepts the verification request.
- **Match your Cloudflare SSL mode to your origin setup.** Flexible → origin HTTP. Full (Strict) → origin HTTPS with a valid cert.
- **Dokploy's "Custom Certificate Resolver" won't help alone.** You still need a working resolver in Traefik (e.g., DNS-01 challenge) — see the [Cloudflare DNS-01 guide](https://doc.traefik.io/traefik/https/acme/#dnschallenge) if you go that route.

---
## Links
- Dokploy Cloudflare guide: [https://docs.dokploy.com/docs/core/domains/cloudflare](https://docs.dokploy.com/docs/core/domains/cloudflare)
- Traefik ACME DNS-01 challenge: [https://doc.traefik.io/traefik/https/acme/#dnschallenge](https://doc.traefik.io/traefik/https/acme/#dnschallenge)
- Cloudflare SSL/TLS modes explained: [https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/)