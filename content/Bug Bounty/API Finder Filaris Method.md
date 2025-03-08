### Download Filaris and install it
```
git clone https://github.com/YuriRDev/filaris.git
sudo apt install libssl-dev pkg-config
```

### Run Filaris
```
cd ~/Documents/pubtools/filaris
cargo run --url "http://$targetwebsite" | tee filaris_result.txt
```

### Clean up results (focus on admin urls only)
```
cat filaris_result.txt | $targetwebsite | grep admin | sort | uniq | cut -d ">" -f 2| | sed 's/ //g'| tee 2filaris_results.txt
```

### Fetch Body and Header of each url
```
cat 2filaris_results.txt| pbfff -o roots
```

### Create a Custom GF Secrets Pattern
```
gf -save secrets "(secret|api|aws|azure|gcp|google|github|bitbucket|firebase|datadog|auth0|jwt|mongodb|mongo|postgres|db|database|app|access|secret|private|public|consumer|client|security|slack|service|vault|tomcat|authorization|auth|ftp|cloud|encryption|password|refresh|sso|storage|third[_-]?party|upload|web)[_-]?(key|secret|token|pass|uri|password).{10,70}"
```

### Fetch Secrets
```
cd roots
gf secrets | tee ../secrets.txt
cd ..
mkdir reports_results
mv *.txt report_results
PROFIT!
```
### Profit!!!
![[Pasted image 20250308115933.png]]

## Tools Used
> [filaris tool](https://github.com/YuriRDev/filaris) - is a tool to fetch all the urls linked to a website
> [gf tool](https://github.com/tomnomnom/gf) - is a grepFinder tool by TomNomNom
> [pbfff tool]([bazzofx/pbfff](https://github.com/bazzofx/pbfff)  - is a variation of FFF by PauloBazzo 
> [gf patterns tool](https://github.com/1ndianl33t/Gf-Patterns) - adds custom patterns to gf tool

