
This is a lab with #BrokenAccessControl where a functionality of the app to protecte users from seen each other private information is not working correctly.
# Recon Phase
The first step for me is to map the application I use 
`sqlfinder, kiterunner, katana` to help me test for SQL Injection while crawling the application for interesting endpoints.
I did found a `/admin` page which I spend quite some time testing but unfortunately I could no proceed, so I moved on. 

The below is the result of the SQL Injection crawler Im working on, it did found a few of the hidden `/admin` endpoints, however the  SQL Injection is false,  it was triggered because the difference between status code but that alone is not good enough indication of SQLi
![[Pasted image 20260118001432.png]]

## Testing File Upload
Next I tried to reproduce some [[File Upload]]  [[Path Tranversal]] vulnerabilities but that didn go as I expected,  I could not image the CTF flag been displayed using this mechanism so I did not spend too much time on it.

## WebSockets
Now I had to take the hint and that is where I saw this lab is a #websocket vulnerability. I know that web sockets are used to produce real time communication on applications, these are often used to generate messages, chat messaging apps, multiplayer games online, or collaborative tools. 
Next step was to understand how the app is using web sockets, 
I then notice another functionality in the app send messages, from a previous lab I remember how live feed can trigger vulnerabilities on 'Client-Side' so I place both Test1 and Test2 accounts side by side and tested the messaging and notice a pop up on the receiver, so I went to examine it on Burp.

![[Pasted image 20260118005137.png]]
### Burp>Proxy>WebSocket History
Because we are dealing with WebSockets there is a constant back and forth of communication, so its always best to clear our history before any testing.
>[!Note]
>Notice there is a "Preview" button on the Test2 account notification page, that interaction will also send a response back, and possible through WebSocket, which in this case was the key to the lab.

I crafted a message, clear the history and press sent.
For a quick moment we can see the result of our action without any noise, now lts inspect those requests and see what we can manipulate
![[Pasted image 20260118005940.png]]

By trying and error modifying the WebSocket message, we manage to alter the `messageId:` on the form which revealed us our flag today as a pop up for Test2.
![[Pasted image 20260118010306.png]]


![[Pasted image 20260118010547.png]]

# Vulnerability
The `messageId` was receptive to forgery when we intercepted it and manipulated it.
There was no checks been done on the server to verify any validations. When the user clicked on the "Preview" sending a response to ourselves he also sent data from a previous messageId he did not intended.

# How to Fix it
**1. Implement a Robust Authorization Check**  
For every request involving a `messageId`, the server must:

- **Validate Ownership:** Query the database to confirm that the `messageId` is associated with the current authenticated user's session or belongs to a resource they are authorized to access.
- **Validate State:** Ensure the `messageId` references a resource in a valid state for the intended action (e.g., a draft message can be previewed, but not a sent one).

**2. Use Indirect Reference Maps (Optional, for Added Security)**  
Instead of exposing direct database IDs (like `12345`), use random, unpredictable tokens (UUIDs) or map client-provided indirect references to real IDs on the server

- **Client sends:** `preview_token = "aBcDeFgHiJ123"`
- **Server looks up:** `real_message_id = token_map.get("aBcDeFgHiJ123")` and then performs the authorization check above.

# Web Sockets Summary
### Why Burp sees all WebSockets and Dev Tools does not?
Burp sits in the middle of the connection like a MITM, so its capture every transmission sent.
The browser is messages are often: Grouped,  Filtered or  Lazy-loaded

### **Further reading:**

[Awesome Websockets List](https://github.com/PalindromeLabs/awesome-websocket-security)
#### Web Socket Scanners
![[Pasted image 20260118015121.png]]
- [wshawk](https://github.com/noobforanonymous/wshawk) - *Not reliable yet, but worth keeping an eye on it..*
- [STEWS](https://github.com/PalindromeLabs/STEWS) - *Maybe good for fingerprinting servers, and test common WS:// CVEs*