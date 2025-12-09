# HTTP tooling (manual + scripted)
- `curl` (single requests / scripting).
- `httpie` (more human-friendly CLI).
- `Postman` / `Insomnia` (GUI request chaining, scripting).
- `Burp` (Repeater, History, Compare) for interactive testing.
    

# Automated API fuzzing & auth testing
- `ffuf` (fuzz JSON params, endpoints).
- `fuzzapi` / `restler` (API fuzzers; use with authorization).
- `oathtool` / `jwt.io` tools for token inspection.
    

# Response parsing & chaining
- `jq` (JSON parsing in CLI pipelines).
- `gron` (makes JSON grep-friendly).
- `xq` / `xmlstarlet` for XML responses.
    

# Rate-limit & throttling checks
- `wrk` / `hey` (load generators — **only with permission**).
- Monitor response headers, spikes in 429/503.
    

# API schema exploration
- `swagger-parser`, `openapi-to-postman` (import and enumerate).
- `Dredd` (spec testing).