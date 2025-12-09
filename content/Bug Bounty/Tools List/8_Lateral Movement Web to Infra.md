# SSRF & internal service discovery
- `Burp Collaborator` (detects external callbacks — use responsibly).
- `curl` or Burp to test for SSRF endpoints (detect ability to fetch internal metadata).
- `naabu` / `nmap` for internal port findings only if explicitly allowed.
    

### Cloud metadata & API discovery
- IMDS (AWS metadata) checks — avoid destructive checks; record reachable endpoints and recommend IMDSv2.
- Cloud tooling for mapping (only with permission): `awscli`, `gcloud` for discovery of misconfigurations.