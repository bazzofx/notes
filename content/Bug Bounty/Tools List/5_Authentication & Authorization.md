
# Credentials & brute-forcing tools (use only in-scope)
- `hydra` / `medusa` (credential stuffing/brute; **be careful**).
- `crowbar` (credential stuffing).
- `ffuf` (parameter fuzzing for login endpoints).
    

# Session management & token analysis
- `jwt_tool` / `jwt.io` (inspect JWT contents).
- `burp-session-token` plugins, Burp macros to test session fixation.
- `session-vuln-scanner` like Burp extensions.
    

# Password reset / account takeover checks
- Manual Burp flows; `sqlmap` only for discovery with non-destructive flags and permission.
- `wfuzz` for parameter testing on reset tokens; `Burp Intruder` for safe testing (throttled).
    

# MFA / bypass testing
- `otp` manipulation with `oathtool` (only against test accounts or in-scope) — check for weak MFA flows.
- Phishing simulations are out-of-scope unless explicitly allowed.
    

# Enumeration & user discovery
- `ffuf` for user enumeration endpoints, Burp ext plugins to automate detection of enumeration side-effects.