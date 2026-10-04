---
Title:
Lab: "[SQL Injection by Errors](https://portswigger.net/web-security/learning-paths/sql-injection/sql-injection-error-based-sql-injection/sql-injection/blind/error-based-sql-injection)"
Video: "[Blind SQL Injection by z3nsh3ll](youtube.com/watch?v=HjXUtCKm1FM&source_ve_path=NzY3NTg&embeds_referring_euri=https%3A%2F%2Fportswigger.net%2F&embeds_referring_origin=https%3A%2F%2Fportswigger.net)"
Resource: "[SQL Cheat Sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)"
---
## Error Based SQL injection
The difference between an error base as an injection and a blind as an injection is that when the query is returned false or true there are no visible changes on the web page.
**We have to create a sub query using the case function** So we can submit an impossible query so and trigger the error and make it ever visible on the page

>[!Example]
`xyz' AND (SELECT CASE WHEN (1=2) THEN 1/0 ELSE 'a' END)='a` -> evaluates false
`xyz' AND (SELECT CASE WHEN (1=1) THEN 1/0 ELSE 'a' END)='a` -> evaluates true

![[Pasted image 20260920185312.png]]

>[!NOTE]
>CASE means `IF` on some databases
>Oracle DB has a table called dual

### 1. Initial query to find error logic
We need to use the correct syntax to match the database type in the backend
`xyz' AND (SELECT CASE WHEN (1=2) THEN 1/0 ELSE 'a' END)='a` -> evaluates false
`xyz' AND (SELECT CASE WHEN (1=1) THEN 1/0 ELSE 'a' END)='a` -> evaluates true

Oracle syntax for this lab
`' AND (SELECT case WHEN (2=1) THEN TO_CHAR(1/0) ELSE 'a' END FROM dual)='a' -- `


![[Pasted image 20260920190023.png]]
### 2. Query to find password length
Oracle syntax for this la
`' AND (SELECT case WHEN LENGTH(password) >10 THEN TO_CHAR(1/0) ELSE 'a' END FROM users where username='administrator')='x' --`
![[Pasted image 20260920191153.png]]

### 3. Substring Password SQL Boolean
Oracle syntax for this lab
![[Pasted image 20260920215453.png]]
`' AND (SELECT CASE WHEN SUBSTR(password,1,1)='a' THEN TO_CHAR(1/0) ELSE 'a' END FROM users where username='administrator')='a' --`
## Error Based SQL Injection - Summary
Error-based SQL injection refers to cases where you're able to use error messages to either extract or infer sensitive data from the database, even in blind contexts. The possibilities depend on the configuration of the database and the types of errors you're able to trigger:

- You may be able to induce the application to return a specific error response based on the result of a boolean expression. You can exploit this in the same way as the conditional responses we looked at in the previous section. For more information, see Exploiting blind SQL injection by triggering conditional errors.
- You may be able to trigger error messages that output the data returned by the query. This effectively turns otherwise blind SQL injection vulnerabilities into visible ones. For more information, see Extracting sensitive data via verbose SQL error messages.
## Exploiting blind SQL injection by triggering conditional errors
Some applications carry out SQL queries but their behavior doesn't change, regardless of whether the query returns any data. The technique in the previous section won't work, because injecting different boolean conditions makes no difference to the application's responses.

It's often possible to induce the application to return a different response depending on whether a SQL error occurs. Y**ou can modify the query so that it causes a database error only if the condition is true.** Very often, an **unhandled error** thrown by the database causes some **difference in the application's response**, such as an error message. This enables you to infer the truth of the injected condition.

## Exploiting blind SQL injection Example
o see how this works, suppose that two requests are sent containing the following `TrackingId` cookie values in turn:

`xyz' AND (SELECT CASE WHEN (1=2) THEN 1/0 ELSE 'a' END)='a`
`xyz' AND (SELECT CASE WHEN (1=1) THEN 1/0 ELSE 'a' END)='a`

These inputs use the `CASE` keyword to test a condition and return a different expression depending on whether the expression is true:

- With the first input, the `CASE` expression evaluates to `'a'`, which does not cause any error.
- With the second input, it evaluates to `1/0`, which causes a divide-by-zero error.

If the error causes a difference in the application's HTTP response, you can use this to determine whether the injected condition is true.

Using this technique, you can retrieve data by testing one character at a time:

`xyz' AND (SELECT CASE WHEN (Username = 'Administrator' AND SUBSTRING(Password, 1, 1) > 'm') THEN 1/0 ELSE 'a' END FROM Users)='a`

>[!NOTE]
  There are different ways of triggering conditional errors, and different techniques work best on different database types. For more details, see the SQL injection cheat sheet.
