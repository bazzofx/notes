# Passive OSINT
- `theHarvester` — e-mail & host harvesting (passive).
- `crt.sh` / `certspotter` (cert transparency queries).
- `Waybackurls` / `gau` (archived URLs).
- `shodan` / `censys` (host & service fingerprints).
- `GitHub adv search`  `gitleaks`, `truffleHog` (public repo secrets discovery).
- `hunter.io`, social media, LinkedIn (manual OSINT).
- `google dorks`

# Subdomain Enumeration
- `amass` (enum, passive + active).
- `subfinder` (fast passive discovery).
- `assetfinder` (subdomains).
- `massdns` / `dnsx` (fast DNS resolution).
- `crt.sh` / `certstream` (cert transparency feeds).
- `dig` / `host` for manual DNS.
# Certificate & TLS discovery

- `openssl s_client` (manual TLS checks).
- `sslyze` (TLS configuration checks).
- `certgraph` / `ctfr` (cert-based discovery).
    

# Port & service discovery (non-invasive first)

- `httpx` (probe hosts for HTTP(S) quickly).
- `nmap` (service discovery; avoid aggressive scripts unless permitted). 
- `masscan` (very fast; **use with caution** — can be disruptive).
    

# Visual reconnaissance / screenshots

- `aquatone` (screenshots, host grouping).
- `gowitness` (screenshot collector).
- `EyeWitness` (visual reports).
    

# Technology fingerprinting & WAF detection

- `Wappalyzer` / `whatweb` / `builtwith` / `httpx -title -tech-detect`.
- `wafw00f` / `nmap --script http-waf-detect` (WAF detection).
    

# Asset aggregation & management

- `csv/jq` pipelines, `merge` outputs from tools into a canonical host list.    
- `defang` / `triage` scripts for organizing targets.