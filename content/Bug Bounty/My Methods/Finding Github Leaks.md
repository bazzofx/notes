
# Method 1 
## Manual
We will perform a manual advance search, similar to how we would use google dorks, but on github
### 1. General presence I discovery
'verity.com'
"verily.com" in:description
"verily.com" in:readme
org:verily "verily.com"
"user:verily" "verily.com"
•verily.com" filenarne:Dockerfilo
"verily.com" filenarne:docker-compose.yml
"verily.com" filenarne:requirements.txt
"verily.com" filenarne:package.json
### 2. High-value secrets I tokens
"verily.com" "api_key"
"verilycom" "access_token"
"verily.com" "auth_token"
•verilycom•• "client_secret"
"verily.com" "secret_key"
"verily.com" "SECRET KEY"
"verily.com" "SESSION-_SECRET"
"verily.com" "GH TOKEN"
"verily.com" "PAT"
"verily.com" "jwt"
"verilycom" "slack_token"
"verily.com" "xoxb-"
"verily.com" "xoxp-"
"verilycom" "glpat-"



# Method 2 
## Tools
```
https://github.com/gitleaks/gitleaks
```

## Gitleaks
Clone the repo we would like to inspect its commit history, then run the below
![[Pasted image 20251011184638.png]]
```
gitleaks detect -v
```