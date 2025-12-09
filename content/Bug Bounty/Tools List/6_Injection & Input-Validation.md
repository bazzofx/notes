
## SQL / NoSQL discovery (non-destructive checks)
- `sqlmap` (use safe, non-invasive options; avoid `--os-cmd` or `--sql-shell` unless explicitly allowed).
- Manual payloads via Burp Repeater (small controlled probes).
    

# Command injection / OS interaction checks (passive)
- Identification via unusual error messages, time-based blind checks only with permission.
- `Burp` and `Repeater` to emulate safe inputs.
    

# Template/Server-side injection probes
- `retire` / `snyk` to identify vulnerable templating libs.
- Manual inspection of client-side templates and server responses.

> Note: For all injection classes, prefer _detection_ signals (errors, parameter behaviour) rather than destructive proof-of-concept commands.