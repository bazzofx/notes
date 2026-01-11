Below are a few ways to find API and Secret.
# Method 1 - Katana+Mantra

## Walkthrough Summary - Method 1

| Step | Action                   | Tool                                                 | Achieved                          |
| ---- | ------------------------ | ---------------------------------------------------- | --------------------------------- |
| 1    | Fetch paths of a website | [Katana](https://github.com/projectdiscovery/katana) | Obtained all paths from a website |
| 2    | Fetch Body and run ReGex | [Mantra](https://github.com/brosck/mantra)           | Will fetch body and perform pattern match in one go|
## Instructions
#step1
```bash
#Download all the files from a website, so we can scrap it later
katana -list host.txt -jc -o katana_out.txt
```
#step2
```bash
#Scrape for passwords using Mantra
cat hosts2.txt | mantra
```
---

# Method 2 - Katana+ PBFFF + GF

## Walkthrough Summary - Method 2

| Step | Action                   | Tool                                                 | Achieved                          |
| ---- | ------------------------ | ---------------------------------------------------- | --------------------------------- |
| 1    | Fetch paths of a website | [Katana](https://github.com/projectdiscovery/katana) | Obtained all paths from a website |
| 2    | Download the body+header of website | [pbfff](https://github.com/bazzofx/pbfff)           |Downloaded website will be searched for api/passwd |
| 3    | Custom grep pattern for API| [gf](https://github.com/tomnomnom/gf)              | Using custom grep we search for API keys|
## Instructions
#step1
```bash
#Download all the files from a website, so we can scrap it later
katana -list host.txt -jc -o katana_out.txt
```
#step2
```bash
#Download the content of the links we scrapped
cat katana_out.txt | pbfff -o roots
```
![[Pasted image 20251213093516.png]]
#step3
```bash
#using grep pattern we will search for api keys
cd roots
gf secrets | tee secrets.txt
```
![[Pasted image 20251213093545.png]]

---

#### Create a Custom GF Secrets Pattern
```
gf -save secrets "(secret|api|aws|azure|gcp|google|github|bitbucket|firebase|datadog|auth0|jwt|mongodb|mongo|postgres|db|database|app|access|secret|private|public|consumer|client|security|slack|service|vault|tomcat|authorization|auth|ftp|cloud|encryption|password|refresh|sso|storage|third[_-]?party|upload|web)[_-]?(key|secret|token|pass|uri|password).{10,70}"
```
### Profit!!!
![[Pasted image 20250308115933.png]]

---

---
# Method 3 - Cariddi

## Walkthrough Summary - Method 3

| Step | Action                   | Tool                                                 | Achieved                          |
| ---- | ------------------------ | ---------------------------------------------------- | --------------------------------- |
| 1    | Fetch paths of a website | [Katana](https://github.com/projectdiscovery/katana) | Obtained all paths from a website |
| 2    | Fetch Body and run ReGex | [cariddi](https://github.com/edoardottt/cariddi)     | Will fetch body and perform pattern match in one go|

## Instructions
#step1 
```bash
#Download all the files from a website, so we can scrap it later
katana -list host.txt -jc -o katana_out.txt
```
#step2 
```
Look for secrets within the urls
cat katana_out.txt | cariddi -s
```
