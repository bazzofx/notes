When hosting subdomains from the same server. If you are encountering issues, check if you are adding the below into the subdomain config.

`root /var/www/domain`

Example config for **cyber-siege.conf**
[cybersiege.cybersamurai.co.uk](https://cybersiege.cybersamurai.co.uk)

![[Pasted image 20250427222315 1.png]]

```
upstream cyber_siege_3002 {
    server localhost:3002;
}

server {
    listen 80;
    server_name server_name cybersiege.cybersamurai.co.uk www.cybersiege.cybersamurai.co.uk;
    root /var/www/cybersamurai/;

    access_log /var/log/nginx/cybersiege.local.access.log;
    error_log  /var/log/nginx/cybersiege.local.error.log;

    location / {
       proxy_pass http://cyber_siege_3002/;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```