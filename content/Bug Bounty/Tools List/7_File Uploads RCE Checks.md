
# File upload testing
- Check content-type enforcement with `curl` / burp; check magic-bytes validation.
- Tools: Burp Intruder / Repeater, custom small benign files to test handling.

# Unsafe deserialization discovery
- `ysoserial` (Java) — **extremely dangerous**; only use in lab environments or with explicit permission.
- `Burp` to inspect serialized payload flows; `jq`/`gron` to parse JSON.
    

# Webshell detection & triage (if you find signs)
- DO NOT upload remote shells to targets. Note indicators and provide safe PoC (e.g., echo output from benign code).
- Tools for local analysis: `strings`, `file`, `exiftool` (for file metadata).