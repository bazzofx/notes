# Directory & file fuzzing
- `ffuf` (fast, flexible).
- `gobuster` (dir & vhost brute).
- `dirbuster` (GUI option). 
- Wordlists: `SecLists`, `raft-large-directories`.
    
Example high-level pattern: `ffuf -u https://target/FUZZ -w wordlist.txt -mc 200,301`

# VHost & virtual host discovery
- `ffuf` / `vhost discovery scripts` (Host header fuzzing).
- `dnsx` + vhost lists to probe host header differences.
    

# Parameter discovery & enumeration
- `Burp Suite`: Repeater / Intruder / Param Miner plugin.
- `Arjun` (parameter discovery).
- `gf` (grep-like patterns) + `qsreplace` pipelines.
    

# JavaScript & client-side analysis
- `linkfinder` (find JS endpoints).
- `secretfinder` (find potential secrets in JS).
- `waybackurls` / `gau` combined with `grep` to find JS endpoints.
- `Burp JS Miner` / manual inspection in browser devtools.
    

# API surface discovery
- `swagger-parser` / `swagger-ui` / `openapi-generator` (if OpenAPI discovered).
- `Postman` collections import/export for mapping endpoints.
- `insomnia`.
    

# Content scanning automation
- `nuclei` (templated checks), `naabu` for host discovery orchestration.
- `aquatone` / `gowitness` for triage of interesting hosts.