
> [!quotation] Order to Remember
> BCIISVISSS
 
### A01. Broken Access Control

If authentication and access restrictions are not properly implemented, attackers can easily take whatever they want. With broken access control flaws, unauthenticated or unauthorized users may have access to sensitive files and systems or even user privilege settings.

### A02: Cryptographic Failures

Common errors, such as using hardcoded passwords, outdated cryptographic algorithms, or weak cryptographic keys, can expose sensitive data (the previous name for this category).

### A03: Injection

Injection attacks occur when attackers exploit vulnerabilities in web applications that accept untrusted data. Common types include SQL injection and OS command injection. This category now also includes Cross-Site Scripting (XSS). By inserting malicious code into input fields, attackers can execute unauthorized commands, access sensitive databases, and potentially gain control over systems.

### A04: Insecure Design

Insecure design is a new category in the 2021 OWASP Top Ten, which focuses on fundamental design flaws and ineffective controls rather than weak or flawed implementations.

Creating secure designs and secure software development lifecycles requires a combination of culture, methodologies, and tools.

### A05: Security Misconfiguration

Application servers, frameworks, and cloud infrastructure are highly configurable, and security misconfigurations, such as too broad permissions, insecure default values left unchanged, or too revealing error messages, can provide attackers with easy paths to compromise applications.

### A06: Vulnerable and Outdated Components

Modern applications are built using a large number of third-party libraries (which are themselves dependent on other libraries) and frequently run on open-source frameworks. In a modern application, there may be orders of magnitude more code from libraries and components than written by an organization’s developers.

As might be expected with any software, vulnerabilities in libraries and components will routinely be discovered, patched, and new versions released. The challenges of identifying all the components in use, keeping track of their vulnerability status, and routinely rebuilding and testing deployed software are both essential and onerous. Perhaps this is why so many organizations are still running vulnerable software in production

### A07 Identification and Authentication Failures

Identifying and authorizing users and non-human clients is a fundamental security practice. It goes without saying that weaknesses in how an application allows access or identifies users are critical vulnerabilities.

While mitigation starts with secure coding practices, tools to detect and prevent credential stuffing and brute force attacks are also useful protections.

### A08: Software and Data Integrity Failures

The tools used to build, manage, or deploy software are increasingly common vectors of attack. A CI’CD pipeline that routinely builds, tests and deploys software can also be used to inject malicious code (or libraries), create insecure deployments, or steal secrets.

As discussed in ‘Vulnerable and Outdated Components,’ modern applications use many third-party components, often pulling them from third-party repositories.

Organizations can mitigate this threat by ensuring both the security of the build process, and the components pulled into the build. Adding in code scanning and software component analysis steps into a software build pipeline can identify malicious code or libraries

### A09: Security Logging and Monitoring Failures

Having adequate logging and monitoring in place is essential in both detecting a breach early, hopefully limiting the damage, and in incident forensics to establish the scope of the breach, and to determine the method of compromise.

Simply generating the data is obviously insufficient. Organizations must have adequate collection, storage, alerting, and escalation processes. Organizations should also verify that these processes are working correctly—using Dynamic Application Security Testing DAST #DAST tools

### A10: Server-Side Request Forgery (SSRF)

Modern web applications commonly fetch additional content or data from a remote resource. If an attacker can influence the destination resource, and the application does not validate the supplied URL, then a crafted request may be sent to a target destination.

Mitigating #SSRF SSRF attacks involves familiar methods, such as sanitizing user input, using explicit allow lists, and inspecting request responses before they are returned to clients.

##### Reference

https://www.veracode.com/security/owasp-top-10/