
## Compensating Controls
These are usually the compesating controls on a Web Application we have to pay attention too, this is also know as Defense In-Depth which gives many layers of defense to an application in case one of the layers fail

- Cookie Policy
- Browser Security Headers
- Content Security Policy (CSP)
	- [Link to Google CSP Evaluator](https://csp-evaluator.withgoogle.com)
- WAF (Web Application Firewall)
- Client-Side Validation
- Server-Side Validation
- Output enconding


- Session cookies should not contain **Client Information** , it should only contain **Identifier the Server can identify**
- If we want client information store within the client/browser we should use other tools like [JWT](https://www.jwt.io/introduction#what-is-json-web-token-structure), they allow to implement integrity protection to prevent manipulation of data
## Tips
- We should send multiple request to the same API to understand what is changing within the cookie, then we compare the cookies to see what  has changed.
![[Pasted image 20251123131419.png]]
- Register a new user and lets compare the cookies of new user with the cookie of the authenticated account
