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

