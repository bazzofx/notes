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