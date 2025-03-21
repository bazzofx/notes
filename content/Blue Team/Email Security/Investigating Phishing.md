

# Methodology
A Phishing is a method of attempt to steal credentials from the user, the attacker is "fishing" for information and hoping you would **click** his malicious link or download his files.
When an email is flagged as phishing, we need to investigate if the email came from a legitimate source or if this was a legitimate phishing attempt.

## Impact Scope
The first step is to understand what the user have done. We need to understand if the has potentially already been compromised, or not.
- Has the user clicked on a phishing link?
- Entered real password into a potential malicious website?
- Or just suspect of a malicious email received, and not taken any action yet

Once we know if we are dealing with a **Response Scenario** or **Investigative Scenario** we know what to prioritize.

### Response Scenario
If a user knows he clicked on a potential malicious link, or have entered credential on a phishing page, like the fake Authentication Microsoft pages that that can be done using [EvilGinx](https://github.com/kgretzky/evilginx2)
==The user must change its passwords and the session tokens must be revoked==
This will invalidate all current logged-on sessions and revoking any authentication cookies that a potential #infostealer malware might have stolen. 
- This is done in precaution, but one that is easy to act without causing a big impact.
After user has change it's password we move to the **Investigative Scenario**

### Investigative Scenario
Here we we will be performing analysis on the email, we will be using 3 main techniques

|Technique| Description|
|-----------|-------------|
|Static analysis |Perform static revision of the links, email header|
|Dynamic analysis |Verify the links on the email |
|OSINT| Look at IP information |







# TOOLS
## SPF Check
https://www.nslookup.io/spf-lookup/

## Decode URL
CyberChef
jws.io

#Confirm SubUrl and SSL Cert
https://crt.sh/


## Phishing Talk EvilGinx
EvilGinx - Tool Red Team

### Objectives
Steal cookies, token, passwords, etc..

### Phishing techniques
- Browser in Browser attack
A pop up will be created size of the browser, the attacker can then manipulate the url of that pop up to look like the original url

### Protection Websites Owners

- JavaScript Protection

#### Redirect Users to Safety if on a Fake Domain
```
if (document.location.hostname !== "yourwebsite.com") {
    window.location.href = "https://yourwebsite.com/security-warning";
}
```
#### Warn Users Who Were Redirected from a Suspicious Site
```
if (document.referrer && !document.referrer.includes("yourwebsite.com")) {
    alert("Warning: You were redirected here from an unknown website. If you entered your credentials on another site, change your password immediately!");
}
```

- Shadow token - 
A website before you login gather telemetry of url, video card fingerPrint, then ecnrypt into blob of data and send as extra info when loging ing. The backend server decrypt the data and verify if the request came from a website that could be potential malicious and if so, it will block the account. (LinkedIn currently does it)


https://www.youtube.com/watch?v=aa7oFcr4Y-Y



Demonstration Phishing Attack using Nginx