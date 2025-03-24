
Get CloudFlare API Key to Edit DNS Record of the Zone we want to mess around with
On CloudFlare go to
Profile>API Tokens>Create
Create an API Key to Edit DNS Records for the zone.
![[Pasted image 20250322201436.png]]

Deploy Cloud Server and install Mail-Spoofer on it
```
sudo apt update -y && sudo apt upgrade -y
sudo apt install docker-compose -y
git clone https://github.com/6point6/mail-spoofer.git
```
Inside the mail-spoofer folder, we will update the **settings.env** file to match our domain and also add the CloudFlare API Key.
![[Pasted image 20250322201318.png]]

Next we want to run the below command which grab all the images and set up all the DNS records on CloudFlare we need for our set up. For full instructions read [Medium Article Deploying GoPhish](https://medium.com/@dukeyoung/setting-up-gophish-on-debian-compute-engine-with-sendgrid-4117f4958778)
```
docker-compose up
```

Because of the change in security on host and cloud providers it is much harder now to quickly deploy a server to send e-mails. There is a lot of restrictions on SMTP protocols like blocking ports **25,587 and 465**, these are only unlocked after a higher payment fee.

If you manage to get passed the initial block, there is also the change the IP you get from your deployment is **already in the blacklist**, which means you will need to do another deployment again, until you get an IP that is not blocked like the below.
# Check for Block List
![[Pasted image 20250323001603.png]]

## Update March, 2025

Upon investigating and trying to deploy the server on many online platform such as [Linode](https://linode.com) ,  [DigitalOcean](https://digitalocean.com)  , [Azure](portal.azure.com) , and [fly.io](fly.io) I have been consistent getting messages that to avoid spam email ports are now restricted, and are behind a much more expensive pay wall. 

If the IP of the server you deployed on Linode or DigitalOcean is on the blocked list, the emails will not be sent. You could try working with a relay like SendGrid or MailGun to get around that.

# Removing ISP IP from Blocked List

If you are trying to send emails locally, and are getting blocked message, chances are your Home IP is blocked.
Using a service like [https://check.spamhaus.org/](https://check.spamhaus.org/) we can **verify and request to remove our Home IP from the block list**, so we can use it to send emails from our own Email Server, no relay needed. 
This was part of the configuration for [Github Espoofer.py](https://github.com/chenjj/espoofer)
![[Pasted image 20250323231153.png]]
![[Pasted image 20250323231302.png]]


# Tricking SMTP Servers... almost
We can try tricking the Email server so our email appears to come from somewhere else like the below

However, there are many checks in place nowadays by the host providers to avoid this type of abuse, and is more difficult to create spam emails like it used to be.

An email like the below pretending to come from **hello@fakesite.com** will be easily flagged by some host providers as the Return-Path does not match the sender path.
![[Pasted image 20250324100747.png]]

After a few emails like the one above, my account was temporarily suspender due to **suspicious activity** being logged on the server.
![[Pasted image 20250324100558.png]]

After unlocking the account, I attempted then to send another email from the official Email Application supported by Hostinger, but was presented by another block, now from the **MailChannels Service** themself, which is the Email Relays **Hostinger** my host provider is using. 
![[Pasted image 20250324102510.png]]
## Reference
[Video Lab Deploying GoPhish](https://www.youtube.com/watch?v=j6NJnFcyIhQ&ab_channel=ChrisPowell)
[Medium Article Deploying GoPhish](https://medium.com/@dukeyoung/setting-up-gophish-on-debian-compute-engine-with-sendgrid-4117f4958778)
[EvilGinx MiTM Video](https://www.youtube.com/watch?v=lTAQngMbtuM&list=PLOlX9QtPIng0pNLW0PvbfHsxyxvo86ykk)
## Websites
[SpamHaus Remove Home IP from Spam List](https://check.spamhaus.org/)
## Tools Spoofing
[Github Zaqar.php](https://github.com/TobinShields/Zaqar_EmailSpoofer)
[Github Espoofer.py](https://github.com/chenjj/espoofer)
[Github Email-Bomber.py](https://github.com/bazzofx/Email-Bomber)