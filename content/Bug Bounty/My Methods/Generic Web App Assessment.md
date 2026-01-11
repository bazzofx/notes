## 1. Subdomain Enum

```
subfinder -d domain.com -all -recursive > subs_domain.com.txt
```

## 2. httpx

```
cat subs_domain.com.txt | httpx -td -title -sc -ip -fc 403,404 |tee httpx_domain.com.txt
```
```
cat httpx_domain.com.txt | awk '{print $1}' > live_subs_domain.com.txt
```

## 3. ports

```
subfinder -d domain.com -all -recursive > subs_domain.com.txt
```
```
cat subs_domain.com.txt | httpx -silent -ports 80,443,3000,8080,8000,8081,8008,8888,8443,9000,9001,9090 | tee -a alive_subs_port.txt
```

## 4. nuclei subdomain

```
nuclei -l live_subs_domain.com.txt -rl 10 -bs 2 -c 2 -as -silent -s critical,high,medium
```

## 5. nuclei dast

```
nuclei -l waymore_domain.com.txt -rl 20 -bs 2 -c 2 -silent -s critical,high,medium -dast
```

## 6. JS file analysis

```
cat waymore_domain.com.txt | grep '.js' | httpx -mc 200 >> js.txt
```
```
nuclei -l js.txt -t /home/kali/.local/nuclei-templates/http/exposures -o potential_secrets.txt
```

## 7. finding WAF

```
cat httpx_domain.com.txt | grep 403
```

## 8. Subdomains without WAF

```
cat httpx_domain.com.txt | grep -v -i -E 'cloudfront|imperva|cloudflare' > nowaf_subs_domain.com.txt
```

## 9. List of 403 Subdomains for Fuzzing

```
cat nowaf_subs_domain.com.txt | grep 403 | awk '{print $1}' > 403_subs_domain.com.txt
```

## 10. 403 fuzzing

```
dirsearch -u https://sub.domain.com -x 403,404,500,400,502,503,429 --random-agent
```
```
dirsearch -u https://sub.domain.com -e xml,json,sql,db,log,yml,yaml,bak,txt,tar.gz,zip -x 403,404,500,400,502,503,429 --random-agent
```

## 11. Finding Public exploit

```
dork: apache tomcat 9.0.82 exploit poc site:github.com
```


