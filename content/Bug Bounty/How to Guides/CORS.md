## CORS - Attack Summary
| Attack Name                 | Vuln Example                                           |
|-----------------------------|---------------------------------------------------------|
| [[Origin-reflection Attack]] | `origin: random_website.com`                           |
| [[Trusted Null Origin]]      | `origin: null`                                         |
| [[Chain CORS + XSS]]         | CORS attack sent from victim subdomain via XSS vuln    |


## Testing CORS
1. Change the origin header to an arbitrary value
2. Change the origin header to the null value
3. Change the origin header to one that begins with the origin of the site
4. Change the origin header to one that ends with the origin of the site

###  Access-Control-Allow-Credentials: true
Most CORS attacks rely on the presence of the response header:
```javascript
Access-Control-Allow-Credentials: true
```
That means the response can be requested to be retrieve with the user cookies, which makes it vulnerable.

However, there is one common situation where an attacker can't access a website directly: when it's part of an organization's intranet, and located within private IP address space. Internal websites are often held to a lower security standard than external sites, enabling attackers to find vulnerabilities and gain further access. For example, a cross-origin request within a private network may be as follows:
![[Pasted image 20251225223448.png]]





# What is CORS (Cross-origin Resource Sharing)
Cross-origin resource sharing (CORS) is a browser mechanism which enables controlled access to resources located outside of a given domain. It extends and adds flexibility to the same-origin policy (SOP). However, it also provides potential for cross-domain attacks, if a website's CORS policy is poorly configured and implemented. CORS is not a protection against cross-origin attacks such as cross-site request forgery (CSRF). [](https://portswigger.net/web-security/learning-paths/cors/cors-what-is-cors-cross-origin-resource-sharing/cors/what-is-cors-cross-origin-resource-sharing)
![[Pasted image 20251224005155.png]]

## Same-origin policy
The same-origin policy is a restrictive web security rule that prevents a website from accessing or interacting with data from a different domain, though it generally allows a domain to issue requests to other domains, but not to access the responses.

## Relaxation of the same-origin policy
The same-origin policy is very restrictive and consequently various approaches have been devised to circumvent the constraints. Many websites interact with subdomains or third-party sites in a way that requires full cross-origin access. A controlled relaxation of the same-origin policy is possible using cross-origin resource sharing (CORS). 

The cross-origin resource sharing protocol uses a suite of HTTP headers that define trusted web origins and associated properties such as whether authenticated access is permitted. These are combined in a header exchange between a browser and the cross-origin web site that it is trying to access.

## Vulnerabilities arising from CORS configuration issues
Many modern websites use CORS to allow access from subdomains and trusted third parties. Their implementation of CORS may contain mistakes or be overly lenient to ensure that everything works, and this can result in exploitable vulnerabilities.


## Errors parsing Origin headers
Some websites will whitelist their application to a list of allowed domains , The application checks the supplied origin against its list of allowed origins and, if it is on the list, reflects the origin as follows:
```http
HTTP/1.1 200 OK
 ...
Access-Control-Allow-Origin: https://innocent-website.com
```
### Vulnerabilities when parsing Origin headers
Mistakes happens when an organizations decide to allow access from all their subdomains (including future subdomains not yet in existence)

>For example, suppose an application grants access to all domains ending in:
 **normal-website.com**
An attacker might be able to gain access by registering the domain:
**hackersnormal-website.com**

>Alternatively, suppose an application grants access to all domains beginning with
**normal-website.com**
An attacker might be able to gain access using the domain:
**normal-website.com.evil-user.net**

## Exploiting XSS via CORS trust relationships
Even "correctly" configured CORS establishes a trust relationship between two origins. If a website trusts an origin that is vulnerable to cross-site scripting (XSS), then an attacker could exploit the XSS to inject some JavaScript that uses CORS to retrieve sensitive information from the site that trusts the vulnerable application.

![[Pasted image 20251224175342.png]]
## Breaking TLS with poorly configured CORS
Its also possible to break TLS if the application whitelist a trusted origin to make request in HTTP


# How to prevent CORS-based attacks
> If a web resource contains sensitive information, the origin should be properly specified in the `Access-Control-Allow-Origin` header.

### Only allow trusted sites
Origins specified in the `Access-Control-Allow-Origin` header should only be sites that are trusted. 
### Avoid whitelisting null
Avoid using the header `Access-Control-Allow-Origin: null`. Cross-origin resource calls from internal documents and sandboxed requests can specify the `null` origin. CORS headers should be properly defined in respect of trusted origins for private and public servers.
### Avoid wildcards in internal networks
 Trusting network configuration alone to protect internal resources is not sufficient when internal browsers can access untrusted external domains

### CORS is not a substitute for server-side security policies
CORS defines browser behaviors and is never a replacement for server-side protection of sensitive data - an attacker can directly forge a request from any trusted origin. Therefore, web servers should continue to apply protections over sensitive data, such as authentication and session management, in addition to properly configured CORS
