## Issue
![[Pasted image 20260726112132.png]]

## Solution:
Purge cached files from CloudFlare
![[Pasted image 20260726112217.png]]

## Quick Test to Confirm
If this returns JavaScript, then Cloudflare is the problem. If it returns HTML (your website's homepage), then nginx is the problem.
```bash
#Check if it returns the actual content of the file, insead of the main page

curl -v http://localhost/assets/js/secret.js

#Check how its been resolved externally
curl -v http://cybersamurai.co.uk/assets/js/secret.js
```
## Check Sever Settings
```bash
# Check the file permissions
ls -la /var/www/cybersamurai.co.uk/assets/js/secret.js

# Check the actual file content
cat /var/www/cybersamurai.co.uk/assets/js/secret.js

# Check if nginx can read it
sudo -u www-data cat /var/www/cybersamurai.co.uk/assets/js/secret.js

# Check if there's a symlink or mount issue
readlink -f /var/www/cybersamurai.co.uk/assets/js/secret.js
namei -l /var/www/cybersamurai.co.uk/assets/js/secret.js

# Check debug log
cat /var/log/nginx/secret_access.log

```

Diagnosing
If you can resolve the file internally, but not externally the problem is within the CloudFlare and not on the Proxy Server.

![[Pasted image 20260726111757.png]]
### Purge Cloudflare cache

- Cloudflare → Caching → Configuration → Purge Everything
## Cloudflare Settings That Might Help

Other settings to check. 
If the local test shows nginx is serving the correct content, then Cloudflare is the issue. Try these Cloudflare settings:

### Disable "Automatic HTTPS Rewrites" temporarily

- This can cause redirect loops if your origin is also redirecting HTTP→HTTPS
- Go to Cloudflare → SSL/TLS → Automatic HTTPS Rewrites → Toggle OFF

### Set SSL/TLS encryption mode to "Full"

- Cloudflare → SSL/TLS → Overview
- Set to "Full" (not "Full (strict)" temporarily)
### Add a Page Rule to bypass cache for your assets

- Cloudflare → Rules → Page Rules
- Create rule: `cybersamurai.co.uk/assets/js/*`
- Setting: Cache Level = Bypass