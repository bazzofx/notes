Today we will be comparing a few different SQL Injection tools, to see where which one is best used on which scenarios.
I am sure everyone is familiar with the big boss [SQLMap]() but have you heard of [Ghauri]() ?
We will also be looking into a few other SQL Map Injection tools, rate them between
 
 - Crawling
 - Direct Attack
 - Speed




# Tools
| **Name**                           |Rating| **GitHub Link**                                                                                                             | **Crawling / DB Enumeration**           | **Speed / Attack Type**                      | **Direct Attack / Blind SQL**                 | **Description**                                                                                       |
| ---------------------------------- |-------| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **SQLMap**                         |⭐⭐️⭐️⭐️⭐️| [https://github.com/sqlmapproject/sqlmap](https://github.com/sqlmapproject/sqlmap)                                          | ✔️ yes (enumerates DB, tables, columns) | 🚀 automated, can be slower on blind methods | ✔️ supports Boolean, Time-based, Error, UNION | Automatic SQL injection exploitation and database takeover tool — very comprehensive SQLi automation. |
| **Ghauri**                         |⭐⭐️⭐️⭐️ | [https://github.com/r0oth3x49/ghauri](https://github.com/r0oth3x49/ghauri?utm_source=chatgpt.com)                           | ✔️ DB enumeration                       | ⚡ automated SQLi detection                   | ✔️ supports Boolean, Error, Time, Stacked     | Python tool to detect & exploit SQL injection flaws; cross-platform and scriptable.                   |
| **jSQL Injection**                 |⭐️     | [https://github.com/ron190/jsql-injection](https://github.com/ron190/jsql-injection)                                        | ✔️ DB info extraction                   | ⚙️ semi-automated                            | ✔️ automatic SQL database injection           | Java GUI tool that automates SQLi and can extract databases.                                          |
| **BBQSQL**                         |⭐️     | [https://github.com/CiscoCXSecurity/bbqsql](https://github.com/CiscoCXSecurity/bbqsql?utm_source=chatgpt.com)               | ⚠️ requires manual setup                | 🐇 moderately fast (gevent concurrency)      | ✔️ blind SQL injection focused                | Python framework for blind SQLi with customizable queries.                                            |
| **NoSQLMap**                       |⭐️     | [https://github.com/codingo/NoSQLMap](https://github.com/codingo/NoSQLMap)                                                  | ✔️ NoSQL DB enumeration                 | ⚙️ script-driven                             | ❌ not classic SQL, NoSQL focus                | Automates injection against NoSQL databases (e.g., MongoDB).                                          |
| **DSSS (Damn Small SQLi Scanner)** |⭐️     | [https://github.com/stamparm/DSSS](https://github.com/stamparm/DSSS)                                                        | ✔️ basic scanning                       | 🐢 simple, light tool                        | ✔️ SQLi scanner, basic exploitation           | Lightweight Python SQLi scanner with GET/POST support.                                                |
| **Explo**                          |⭐️     | https://github.com/dtag-dev-sec/explo                                                                                       | ❌ not a SQLi crawler                    | ⚡ fast format tool                           | ❌ not direct SQL attack                       | Web vulnerability testing format tool — not specifically SQL.                                         |
| **Blind-SQL-Bitshifting**          |⭐️     | [https://github.com/awnumar/blind-sql-bitshifting](https://github.com/awnumar/blind-sql-bitshifting?utm_source=chatgpt.com) | ❌ not a crawler                         | ⚡ bitwise blind method                       | ✔️ blind SQLi via bit-shifting                | Python module that performs blind SQL extraction using bit shifts.                                    |
| **Blisqy**                         |⭐️     | https://github.com/JohnTroony/Blisqy      
## Targets

We will be using a few labs from [PortSwiggerAcademy]() as well as a vulnerable lab from [BugForge.io] called Fur Hire
![[Pasted image 20260117140404.png]]

>[!NOTES]
>The variables used during scanning are
>
>token='Authorization: Bearer ey.....GeoE'
# SQL Map
### Website Crawling Test
SQLMap has the capacity to crawl  a website and test if ro SQL Injection, however this seems to be very slow and so far I had not had luck with it.
#### Crawl a website and test for SQL Injection
```bash
token='Authoriation: Bearer ey...'
url="`https://lab-1768658597983-vfm9xi.labs-app.bugforge.io`"
sqlmap -u $url --crawl=1 --random-agent --batch --forms --threads=5 --level=5 --risk=3 --headers=$token --dbms=sqlite
```
### Crawling Results SQLMap
- Output too verbose
- The output does not show which endpoints its trying to crawl
- The scan runs very slowly, taking 30 minutes to scan a small website
![[Pasted image 20260117143435.png]]

>[!Output SQL Crawling]
> Returned saying there are no parameters, when in fact there is

### Direct Injection Test SQLMap
Direct invokation of SQLMap has picked up the wrong page.
```bash
token='Authoriation: Bearer ey...'
url="`https://lab-1768658597983-vfm9xi.labs-app.bugforge.io/jobs/1`"
sqlmap -u $target --random-agent --forms --threads=5 --level=5 --risk=3 --headers=$token --dbms=sqlite
```
![[Pasted image 20260117143814.png]]

---
#### Saving Request from Burp + SQLMap

**However, saving the original request from Burp as a req.txt works better**
Make sure to add a  * where sqlmap should try to attempt the injection before saving it.
![[Pasted image 20260117144954.png]]
![[Pasted image 20260117145613.png]]

```bash
#This command will dump all the tables and columns of the database
sqlmap -r req.txt --batch --headers=$token --dump
```
---
## SQLMap Conclusion
If we know the correct endpoint to test the sqlmap injection, SQLMap works wonders to test a varierty of SQL Injection techniques attempting to infect the database and extract the data.

---


# Ghauri
![[Pasted image 20260117150203.png]]
### Install
```text
Install
git clone https://github.com/r0oth3x49/ghauri
cd ghauri
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 -m pip install setuptools
python3 setup.py install
Now just run as a usual as command `ghauri`
```
Crawling pages for SQL Injection is not supported naturally by Ghauri

### Direct Injection Test Ghauri
- Outputs similar to SQlMap, 

```bash
ghauri -u $target --dbs --headers $token
```
Unfortunately, it did not discovered any endpoints 
![[Pasted image 20260117152203.png]]
### Direct Injection + Headers
Obs: Different from BurpSuite, this needs to be just headers.txt
```bash
ghauri -r headers.txt --headers="$token" --batch --dbs --random-agent
```
![[Pasted image 20260117152110.png]]

## Ghauri Conclusion
Ghauri looks to be very similar to SQL Map , I was not able to get an SQL injection on the target test, but I believe this was due to user error.

---

# SQLFinder
This is a tool I'm currently working on which will crawl a website and fetch its endpoints, then after a filter we send them to the queue where we will be checking for some SQL Injection.
 Current features are:
 - Checks that skip url if curl is not possible due to Single Page Application (SPA)
- Boolean SQL injection
- Difference SQL Injection
- Login page bypass when authentication is done on url (JSON login not supported yet)
### Craw
![[Pasted image 20260117175829.png]]

