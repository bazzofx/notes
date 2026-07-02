## Example Development Claude.md
```markdown
## Overview

Node.js/Express REST API for banking operations. Handles PII and financial data for 2M+ customers. Microservices architecture with Redis cache and PostgreSQL.

## Security Classification: HIGH

All code must comply with PCI DSS v4.0 and OWASP ASVS Level 2.

## Mandatory Security Rules

- NEVER hardcode secrets, API keys, passwords, or connection strings
- ALL user input MUST be validated and sanitised before processing
- ALL database queries MUST use parameterised statements
- ALL passwords MUST be hashed with bcrypt (min cost factor 12)
- ALL API endpoints MUST enforce authentication and RBAC
- ALL HTTP responses MUST include security headers (helmet.js)
- NEVER log sensitive data (PII, tokens, passwords, card numbers)
- ALL file uploads MUST validate type and size (allowlist only)
- ALL auth endpoints MUST implement rate limiting
- NEVER generate IDOR-vulnerable endpoints
- NEVER return database errors or stack traces to clients

## Banned Patterns

- `eval()`, `exec()`, `Function()` constructor
- MD5 or SHA1 for password hashing
- HTTP (non-TLS) for external communication
- `console.log()` in production paths
- Wildcard CORS (`*`)
- SQL string concatenation or template literals
- JWT without expiration
- Session tokens in localStorage
- Disabled CSRF protection

## Approved Libraries

|Purpose|Library|
|---|---|
|Hashing|bcrypt|
|Headers|helmet|
|Validation|joi|
|Rate limiting|express-rate-limit|
|CSRF|csurf|
|Sessions|express-session + connect-redis|
|Crypto|Node.js built-in only|

## Compliance

- PCI DSS v4.0
- OWASP ASVS Level 2

## Verify Before Completing Any Task

`npm run lint && npm test && npm audit && npm run typecheck`

## Pre-Completion Checklist

- [ ]  Input validation on all user-facing endpoints
- [ ]  Authentication and authorisation checks in place
- [ ]  No hardcoded secrets, keys, or credentials
- [ ]  All queries use parameterised statements
- [ ]  Error handling returns generic messages (no stack traces)
```