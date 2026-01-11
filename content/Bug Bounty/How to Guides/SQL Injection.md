
| Attack Tactics| Description|
|--------------|---------------|
|Search for endpoints that are serving data which could be linked to a SQL DB ie:(/api/jobs/1)| ie:(login pages, comments, job boards..) Test different characters on the request and see if the application gives an error (**" , ' ; & #**)Confirming error save the request as **req.txt** and send it to **sqlmap -r req.txt --batch --dump --level 3**|

## SQL Labs


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

