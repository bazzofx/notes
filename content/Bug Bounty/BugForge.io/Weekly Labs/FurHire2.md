

## General fragment discovery
![[Pasted image 20260125182355.png]]


# Exploring BugWitcher
This is an static analysis tool I have put together.



![[Pasted image 20260125201305.png]]

Using the notification WebSocket we discovered we sent the request, but this time we included the payload below, and we manage to reveal the stored session for the user, unfortunatell this is not our flag.
```javascript
<img src=x onerror="alert(localStorage.getItem('user'))">
```
![[Pasted image 20260125203434.png]]

[BugWitcher]() Gave the below analysis summary, which confirmed to be I should be looking for a way to send a XSS to the admin to reitrve their localStorage. 
url
>[!Bug Witcher Analysis:]
>"The codebase includes multiple client-side JavaScript functions with security risks, primarily around DOM-based XSS via unsanitized Socket.io messages and localStorage data, insecure direct object references, and lack of input validation in form handling. Key sinks are the toast element and API requests, with trust boundaries at Socket.io event handlers and form submissions."

An interesting find was the below

![[Pasted image 20260125224003.png]]