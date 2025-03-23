![[Pasted image 20250323190849.png]]
There has been highlighted on a [DefCon talk]() when #CloudFlare enable on their [Cloud Flare Workers](https://developers.cloudflare.com/workers/get-started/guide)the option to send emails, as long as they are sent from the CF Worker you have deployed.
- Anybody can deploy a CloudWorker, you just need a ==free== CoudFlare account.
On the surface sending emails from the CloudWorkers seems fine, however, a small detail within the e-mail records turn this feature into a playground for SPAM!

![[Pasted image 20250323192645.png]]
### How It Works

Emails sent via CloudFlare Workers are relayed through [MailChannels](https://www.mailchannels.com/), a third-party email provider similar to SendGrid and MailGun. The problem lies in how Mail Channels configures SPF (Sender Policy Framework) for its customers.
The e-mail relay CloudFlare Workers were using was the same relay used by thousands of other customers from Mail Channels.

### The Issue

There is a well-known issue with SPF when dealing with email relays. The image below shows the SPF record for **boston.gov**, which includes **relay.mailchannels.net**. This is a standard configuration step that many overlook.

However, this record introduces a critical vulnerability:

- Any customer using the same relay can **spoof** emails from another customer.
    
[Cloudflare Workers](https://workers.cloudflare.com/) enable email sending **without authentication**, leading to two major problems:

- **All Mail Channels customers can spoof each other!**
    
- **Mail Channels effectively acts as an open relay when used through Cloud Flare Workers!**

Since SPF validation will always pass when spoofing a domain that relies on MailChannels, this creates a serious loophole for abuse.
![[Pasted image 20250323131927.png]]

As you can imagine, Mail Channels pulled back from the e-mail feature it was providing to the CloudWorkers on August, 2024 after they started to get some heat from the results of the [DefCon talk video](https://www.youtube.com/watch?v=NwnT15q_PS8&t=206s&ab_channel=DEFCONConference).
![[Pasted image 20250323192933.png]]

# Proof of Concept
This particular POC does not work anymore, but below is some of the POC material.
[VIDEO: Spoofing email from a domain with DMARC + DKIM](https://www.youtube.com/watch?v=eODw4t4WaCw&feature=youtu.be)
[VIDEO: Impersonating Satan](https://www.youtube.com/watch?v=61PIOBp30vA&feature=youtu.be)
- [Github SpamChannel](https://github.com/byt3bl33d3r/SpamChannel?tab=readme-ov-file)
- [SpamChannel deployed by Haxxx](https://spamchannel.haxxx.workers.dev/submit)
## Finding Vuln Sites 
![[Pasted image 20250323191659.png]]
We can use a service like [BuildWith](https://trends.builtwith.com/websitelist/MailChannels) to view technologies behind a website.
When we search for **Mail Channels** we are presented with over 2.5Milion websites using it. To confirm if the website could be vulnerable to #emailspoofing we can run the below command

```
#WINDOWS
nslookup -type=TXT brainpop.com
```
```
#LINUX
dig brainpop TXT +short
```
Below we can see that brainpop.com still has the relay.mailchannels.net on its record, which means that if other customers from MailChannel could spoof send emails as brainpop.com and still pass the SPF/DMARC.
![[Pasted image 20250323192044.png]]