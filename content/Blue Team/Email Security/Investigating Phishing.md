

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

# Retrieving the Phishing Email
We will need to retrieve the original email, so we can perform our analysis. If you cannot download the email from the #AdmiPanels .
We will ask the user to ==save the phishing email into a file and forward the file to us as an atachment==
The best format to receive the attachment is **.eml** if saved from the outlook browser  or **.msg** if saved from the Outlook application which thankfully are the default formats.

![[Pasted image 20250321220310.png]]
[.EML files the attachments can be re-created from CyberChef, by extracting the base64 and downloading it]:


# Zero Day Phishing
Although the chance of a zero day real phishing event on Outlook is low, its not impossible. The [CVE-2023-23397](https://cyberdefenseninja.blogspot.com/2023/03/CVE-2023-23397.html) is  triggered when an email is received, and a reminder is crafted using Powershell COM object and set to use a custom sound that will be retrieve from the attacker SMB server.

# Investigating Phishing
==IMPORTANT ==
All Dynamic Analysis should be done on a sandbox environment, we don't want to click on any potential phishing links ourselves.

### Investigative Scenario
We will be using 3 techniques for our investigation

|Technique| Description|
|-----------|-------------|
|Static analysis |Perform static revision of the email headers|
|Dynamic analysis |Verify the links/attachments of the email **on a control environment** |
|OSINT|Find public Information linked to the IP |

## Static Analysis

### Tools
[nslookup.io SPF Checker](https://www.nslookup.io/)
[MXToolBox Header Analyer](https://mxtoolbox.com/EmailHeaders.aspx)
[Msg Header Analyzer](https://mha.azurewebsites.net/)

### Info
Basically to email spoof is to separate and change the contents from the **Email Envolope** and **Email Content**
![[Pasted image 20250322152904.png]]

To protect against this type of attack there are 3 main email security protocols 

|Protocols | Descriptions|
|-----------|--------------|
|SPF|List of allowed Servers send email as the domain|
|DKIM|Ensures email integrity by signing the email header Private/Public Key|
|DMARC|Specifying how to handle failed authentication on SPF and DKIM|

These protocols are saved as a **.TXT** record on the DNS of a domain, and are checked on the fly when an email is received.
- You can check any website **.TXT** record and this is the same process an email provider is doing to check the validity and authentication of an email.
##### Exercise
Try the Window command below and look for **SPF** record.
```
nslookup -type=TXT domain.com;
```
![[Pasted image 20250322021330.png]]
Below command will reveal the **DKIM** public key
The query uses a selector, common values are:
**`google`** or **`default`** or **`selector`**  or **`selector1`**
```
nslookup -type=TXT default._domainkey.domain.com
```
![[Pasted image 20250322021210.png]]

Now see if you can find a **DMARC** from the domain using the below.
```
nslookup -type=TXT _dmarc.domain.com
```
![[Pasted image 20250322021347.png]]

### Analysing Headers
We will use the SPF, DKIM and DMARC knowledge to verify if the email came from the domain it is claiming to came from, and we are not dealing with a #spoofed email which would be our first ==red flag==.

The most important part of an email is it's the HEADER
This will contain a lot of information that we will use to verify the origin of the sender.
On outlook to retrieve the header go to **File>Properties>Internet Headers**
![[Pasted image 20250321233030.png]]

We will use the [MXToolBox](https://mxtoolbox.com/EmailHeaders.aspx) to verify the Email Headers. Another good website we can use is [mha.AzureWebsites](https://mha.azurewebsites.net/).
Our goal is to verify if the email came from an approved source by the domain it's claiming to be.

### SPF/DKIM Authenticate Failed

![[Pasted image 20250322003725.png]]
The result shows us that the email failed on both SPF authentication, which means the server it sent from was not on the allowed list **SPF TXT** record on the domain. It was also **not signed by DKIM key**, therefore is not DMARC compliant. 


Let's have a look and verify the IP Origin of the Email Server that first started sending the email.

![[Pasted image 20250322003126.png]]
Based on our header analysis, we can see that the IP is not listed in the SPF record for the domain it claims to be from. This raises a red flag and suggests the email may contain phishing links. While it could be a misconfiguration, that's unlikely
![[Pasted image 20250322003145.png]]

The image below also reveals that **the email was not signed using the DKIM Key** therefore  it did not pass the DKIM check either.
![[Pasted image 20250322003509.png]]

# SPF ISSUE
There is a known issue with SPF which is linked to email relays, on the picture below we see the SPF record for boston.gov includes the **relay.mailchannels.net**.  This record is part of the normal set up process and will be overlooked by a lot of people.
This record will allow any other client that is using the same relay address to spoof each other if they want to. 
If you want to understand a bit more [watch this talk from DefCon](https://www.youtube.com/watch?v=NwnT15q_PS8&t=206s&ab_channel=DEFCONConference)

[CloudFlare CloudWorkers](https://workers.cloudflare.com/) allows to send e-mails without authentication, so:
- All  MailChannel customers can spoof each other!
- MailChannel is acting as an open relay when used through CloudFlare
workers! We're guaranteed to pass SPF when spoofing
a domain that uses MailChannel!
![[Pasted image 20250323131927.png]]




## SRS Spoofing
#### SPF/DMARC Alignment Failed
Its good to note, when there is a mismatching records between the Return-Path and From field, we get a SPF Alignment mismatch. This suggests email spoofing or **a phishing attempt**.
![[Pasted image 20250322104126.png]]
![[Pasted image 20250322110901.png]]
 The `SRS` (Sender Rewriting Scheme) in the Return-Path means this email **was forwarded** to `DynamiertcTechHub.onmicrosoft.com` to pretend it came from a different server.
 #### Authentication-Results
 On this field we notice although the SPF passed, the email header contains information it was sent from the google domain
![[Pasted image 20250322142314.png]]

##### Compromised Account or Open Relay?🚨 Possible Risk
 - If `DynamiertcTechHub.onmicrosoft.com` has **a misconfigured mail server (open relay)**, an attacker could use it to send emails with forged `Return-Path` values.
- This would make the email appear as if it came from them, even if it was originally sent from elsewhere.




# Sender IP Verification
Now that we have the Sender IP we can perform some techniques OSINT to find out some more information about the sender.

### Info
At this stage we are still confirming if the email is potential malicious, and if there has been any recorded activity in the past that have made this IP being flagged somehow.

### Tools

[AbuseIPDB](https://www.abuseipdb.com/)
[VirusTotal]
[BGPTools](https://bgp.tools/)

On AbuseIPDB we can see that the sender IP from our email has been reported recently as SPAM 
![[Pasted image 20250322004854.png]]

### Who Is the Sender
We will be using the tool #whois to gather some information about the IP.
We can also use the [ICANN lookup website](https://lookup.icann.org/en/lookup)
Its good to pay attention to ==Country== and the ==Registration date== 
in some cases when verifying **domains** an very recent registration date is a sign for a potential phishing website.

On this case looks like this IP is not very recent, but we can see it has an abuse email linked to **ctgserver.com**.  Its very common for attackers to host Email relays on web hosting companies servers.
![[Pasted image 20250322005844.png]].

This is also a very good website we can use to investigate IPs and ASN 
![[Pasted image 20250322005622.png]]

Below is the location where the email came from, its common practice to report the phishing email to the owner of the domain/IP so in this case we would report this IP, to **cs.mail@ctgserver.com**.


#### Reporting the Abuser
Simply send the .eml file to the email and add a short comment explaining the sender is using the company server to host phishing campaigns.

![[Pasted image 20250322010327.png]]

### X-Originating-IP
If you are lucky, you might find other headers on your email that can give extra information about the sender.
On our example we have a X-Originating-IP section, which the ctgservers hosting company added to further identify the sender. This IP is linked to another web server hosting company.
![[Pasted image 20250322013105.png]]


Its also possible to retrieve a somewhat possible location of where the email came from using a website called [IpAddres.my/ServerIP](https://www.ipaddress.my/).
So for our example it will be **https://www.ipaddress.my/92.60.43.215**
![[Pasted image 20250322013737.png]]

Another good website that will help trace the email in a different fashion is
[ip2location.com](https://www.ip2location.com/free/email-tracer). Simply upload the headers to visualize a trace of the email servers.
![[Pasted image 20250322014201.png]]


















## Phishing Investigation Summary

##### Static Analysis
- Verify Email Headers for SPF/DKIM/DMARC 
- Verify Email contain attachments
- Analyse contents of attachments

##### OSINT Analysis
- Verify Domain on WhoIS
- Verify SenderIP on AbuseIPDB/VirusTotal

##### Dynamic Analysis
- On a sandbox, verify links



















# Investigating Email Attachments using CyberChef


## Cyber Chefs Recipe for emails .eml
#### Tools
 - [CyberChef](https://gchq.github.io/)
We can verify if the email contained attachments and even re-create them using CyberChef. The attachments will be near the end of the file.
- To load the **email.eml** into CyberChef  just drag and drop file  into the **input field** or click **open file as input** [CyberChef](https://gchq.github.io/)

After loading the **mail.eml** we can verify the links of the email
![[Pasted image 20250321224920.png]]

Managing to extracting the base64 from the **mail.eml** file we can download it, and save it with its original .extension mentioned on the filename field.
![[Pasted image 20250321230026.png]]

### Verify Attachment Names from .eml Recipe
```
Regular_expression('User defined','\n(?:Content-Description:.*)((?:[A-Za-z0-9+/=]+\\s*)+)\n',true,true,false,false,false,false,'List matches')
```

### Extract Attachments from .eml Recipe
```
Regular_expression('User defined','Content-Transfer-Encoding:\\s*base64\\s*\\n+([\\s\\S]+)',true,true,false,false,false,false,'List matches')
```




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
[Spoofed Email Video](https://www.youtube.com/watch?v=CYdihXNzm0g&t=56s&ab_channel=GrantCollins)
[Spoofing Email Exercise](https://www.youtube.com/watch?v=j6NJnFcyIhQ&ab_channel=ChrisPowell)

Demonstration Phishing Attack using Nginx