
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

Next we want to run the below command which grab all the images and set up all the DNS records on CloudFlare we need for our set up.
```
docker-compose up
```
![[Pasted image 20250322201708.png]]

# Check for Block List
![[Pasted image 20250323001603.png]]

## Update March, 2025

Upon investigating and trying to deploy the server on many online plataform such as [Linode](https://linode.com) ,  [DigitalOcean](https://digitalocean.com)  , [Azure](portal.azure.com) , and [fly.io](fly.io) I have been consistent getting messages that to avoid spam email ports are now restricted, and are behind a much more expensive pay wall. 
Even when trying to deploy an email server as  local VM, I was presented with restrictions by by ISP, thank you VM! 
![[Pasted image 20250323190034.png]]
If the IP of the server you deployed on Linode or DigitalOcean is on the blocked list, the emails will not be sent. You could try working with a relay like SendGrid or MailGun to get around that.

[Video Lab Deploying GoPhish](https://www.youtube.com/watch?v=j6NJnFcyIhQ&ab_channel=ChrisPowell)
[Medium Article Deploying GoPhish](https://medium.com/@dukeyoung/setting-up-gophish-on-debian-compute-engine-with-sendgrid-4117f4958778)
[EvilGinx MiTM Video](https://www.youtube.com/watch?v=lTAQngMbtuM&list=PLOlX9QtPIng0pNLW0PvbfHsxyxvo86ykk)