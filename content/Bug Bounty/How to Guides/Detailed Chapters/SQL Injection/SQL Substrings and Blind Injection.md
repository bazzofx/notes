---
"title:": SQL Substrings and Blind Injection
Lab: "[PortSwigger Blind SQL](https://portswigger.net/web-security/learning-paths/sql-injection/sql-injection-exploiting-blind-sql-injection-by-triggering-conditional-responses/sql-injection/blind/lab-conditional-responses)"
Video: "[Rana Khalil Video](https://www.youtube.com/watch?v=LBG_n9fr8sM)"
"Tags:":
---

## Exploiting blind SQL injection by triggering conditional responses

PortSwigger Lab: https://portswigger.net/web-security/learning-paths/sql-injection/sql-injection-exploiting-blind-sql-injection-by-triggering-conditional-responses/sql-injection/blind/lab-conditional-responses

This type of injection, we are only allowed to ask `TRUE` or `FALSE` questions.
 
On this lab the TrackingID is vulnerable to SQL Injection.
For example, suppose there is a table called `Users` with the columns `Username` and `Password`, and a user called `Administrator`. You can determine the password for this user by sending a series of inputs to test the password one character at a time.

## Method
- Confirm if its vulnerable Blind SQL with TRUE and FALSE cases
- Locate the user database
- Locate the username administrator on the user database
- Identify The length of the password
- Identify the first character of the password
- Continue with remaining characters until all password is revealed

### 1 Confirming Blind SQL Injection
The fist thing when testing for SQL Injection is forcing a `true case` and see how the application respond to it. 
We want to check if we can create a `true case` and a `false case` by messing with the parameter on the pages. If we do see it It means we have an exploitable SQL blind injection
- True case `AND 1=1--` *Do we get the same message on screen?*
- False case `AND 1=0 --` *Does the message on the screen is not visible anymore?*
If both answer for the above is true we have an exploitable Blind SQL Injection
![[Pasted image 20260920095631.png]]
 


### 2 Confirm we have users table
Next thing after confirming is checking what databases exist within the application, one of the most common is the user database
' and (select 'x' from users LIMIT 1)='x' --'
`trackingId = Rv4c456' and (select 'x' from users LIMIT 1)='x' --'`


### 3 Confirm that username administrator exists within users table
Next we need to check if the username administrator exist within user table, here we are looking for our `TRUE case` scenario. 
' and (select username from users where username='administrator')='adminisrator'--'`
`trackingId = Rv4c456' and (select username from users where username='administrator')='adminisrator'--'`
![[Pasted image 20260920135922.png]]

### 4 Finding Password length
Next we need to identify the length of the password that is been used.
##### Enumerate Password Length
' and (select username from users where username='administrator' and LENGTH(password)>20)='administrator'--
`trackingId = Rv4c456' and (select username from users where username='administrator' and LENGTH(password)>20)='administrator'--'`

### 5 Enumerate the password of administrator
Using the Substring method we will be running a loop to check if the first character of the password is `a` 
To speed up our detection and brute force we will use the `Intuder - Cluster Bomb` so we can check two variables at once. Because we know the password is **20 chars** we can set up the Cluster Bomb to match our settings.
`AND (select substring(password,1,1) FROM users WHERE username='administrator')='a'--`




>[!NOTE]
>The `SUBSTRING` function is called `SUBSTR` on some types of database. For more details, see the SQL injection cheat sheet.

