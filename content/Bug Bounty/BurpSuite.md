### Intruder
Helps modify the request that is intercepted

Proxy needs to be turned on on local host 127.0.0.1:8080

### Method
1)With intercept 'off' refresh the website and the Sitemap will be populated on 
Target >site map
Click 'Add to scope' 

2)Spidering - Crawl to website collect links, pages, methods
Right click then 'spider this branch'

-When spidering we can change login options to be SQL Injection for the id
admin' or 1=1 --


### ZAP
#OWASP ZAP - 
Zed Attack Proxy -alternative to Burp
Let us find hidden files with treeWalk attack

#### Wordpress
#WordPress
[tool] Zoom - Wordpress scanner, vulnerabilities, subdomains
[tool] Wordpress Scan
#3Brute forcing

#### WAF Scan
[tool] Wafw00f - Web Application Firewall Detection Tool
WAF will filter requests sent to an web application

#### Load Balancer Scan
Types: HTTP or DNS load balancing
[tool] lbd - scan domain for DNS/HTTP load balancer
