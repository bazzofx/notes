

# Attacking the DOM
- Stored Side Scripting
	- Data is stored somewhere then later reflected in the DOM

Ways to protect the DOM
## Compensating Controls

- Cookie Policy
- Browser Security Headers
- Content Security Policy (CSP)
	- [Link to Google CSP Evaluator](https://csp-evaluator.withgoogle.com)
- WAF (Web Application Firewall)
- Client-Side Validation
- Server-Side Validation
- Output enconding



We will use the ars0n framework to start getting an understanding of the subdomains we are scanning. 
We then classify each of the urls into categories like
- Subdomain w/ valid HTTP request
- No Functionality
- Restricted Access
- API
- External Service Login Page - Can't Log in(CNAME->External)
- Internal Service Login Page - Can't Log in (CNAME->internal)
- Full app w/ Authentication