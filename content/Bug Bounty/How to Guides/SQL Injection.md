
| Attack Tactics                                                                                   | Description                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search for endpoints that are serving data which could be linked to a SQL DB ie:(/api/jobs/1)    | ie:(login pages, comments, job boards..) Test different characters on the request and see if the application gives an error (**" , ' ; & #**)Confirming error save the request as **req.txt** and send it to **sqlmap -r req.txt --batch --dump --level 3** |
| SQL Where Clause Attack login forms, these can sometimes be bypassed with simple boolean queries | **' OR 1=1-- -** Is a very common query that can bypass login by asking to return a true statement and commenting out the rest of the query with **-- -**                                                                                                   |
| Look for anything on the page that could be passing a paremeter with **?** or **&**              | example[.]com/filter?category=Pets - On this case we could attempt to modify the query with **filter?category=Pets' OR 1=1 -- -** and verify if any contents on the page have changed or the response is different.                                         |
| SQL Union Attacks                                                                                |                                                                                                                                                                                                                                                             |

## SQL Labs
- [SQL injection vulnerability in WHERE clause allowing retrieval of hidden data](https://portswigger.net/web-security/learning-paths/sql-injection/sql-injection-retrieving-hidden-data/sql-injection/lab-retrieve-hidden-data#)

## SQL Union Attacks
For `UNION` query to work, two requirements must be met:
- The individual query must return same number of columns
- The data types in each column must be compatible
	- Find out number of columns 
	- Which column from original query is suitable data type to hold injected query
### Attack Method 1
Inject ORDER BY until an error occurs.  This might be a database error, blank page, or generic error, but it will be different from the other queries
```sql
' ORDER BY 1-- 
' ORDER BY 2-- 
' ORDER BY 3--

```
### Attack Method 2
Column count mismatch causes database error when NULLs differ.
```sql
' UNION SELECT NULL-- 
' UNION SELECT NULL,NULL-- 
' UNION SELECT NULL,NULL,NULL--
```
>[!Note]
>NULL values are used in injected SELECT queries because they are compatible with all common data types, increasing the likelihood of successful execution when the injected query’s column count matches the original.

## Methods
- SQLMap
- Burp Suite SQL-Extension
## Where to try SQL Injections
- Where we noticed SQL DB is running on the background
- When the application is querying information that looks like its coming from a database (ie: user, productId, country,stored data)

### SQL Injection
```sql
' OR 1=1 --
```
Note: Be careful with this payload because if the DB has thousands of roles, this could crash the server.
- Every time we manage to crash the server  using a character for the language of interest, we probably have a ==SQL injection==
![[Pasted image 20251128125451.png]]

