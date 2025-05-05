
# Scenario
Server A is running **HackerTerminalApp** on port 3000
Nginx is running on Server A as a proxy_pass

Server B is running a web server www.website.com
We want to allow server B to server the app when we use
www.website.com/terminal


# Solution

When deploying app on server A we need to allow connection to port 3000 from server B.
For now we will deploy our docker container and allow all IPs to communicate to the port.
### Deployment Docker - Exposing port 3002
```
docker run -d --name cybersiege -p 3002:3002 cybersiege
```

### Deployment Docker - NOT Exposing port 3002
In case we are just deploying a server to be accessible from the main server running the app (ie:Server A), we do not need to expose port 3002 to the internet, instead run like this
```
docker run -d --name cybersiege -p 127.0.0.1:3002:3002 cybersiege
```

## Server A config
We need to have the **proxy_pass** on server A  as usual to re-direct traffic from port 3000 to port 80.
```
upstream cyber_siege_3002 {
    server localhost:3002;
}

server {
    listen 80;

    access_log /var/log/nginx/hackerterminal.local.access.log;
    error_log /var/log/nginx/hackerterminal.local.error.log;

    location / {
        proxy_pass http://cyber_siege_3002/;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```


## Server B config
We will also need to create a **proxy_pass** settings on Server B 

```
upstream cyber_siege_solo_3002{
        server 101.11.111.180:3002;
}
server{
...
.... [redacted] ....

   location /cybersiege/ {
        proxy_pass http://cyber_siege_solo_3002/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

       # rewrite ^/cybersiege/(.*)$ /$1 break;

        }
    }
```
This modification will update the path so when we go to https://cybersamurai.co.uk/cybersiege the request is re-directed to the other server.

For this configuration we don't need the **rewrite** option but Im keeping commented out, for reference purposes only.

## The Rewrite vs Proxy_pass
- `proxy_pass` determines the destination (use the IP + port here).
    
- `rewrite` just changes the path part of the URL.
    
- You **do not** include IPs or ports in `rewrite`


### Rewrite meaning, step by step:

1. **`rewrite`** — This directive tells NGINX to **change the URI** of the request.
    
2. **`^/cybersiege/(.*)$`** — This is a **regular expression** that matches any URL that starts with `/cybersiege/` and captures whatever comes after it.
    
    - Example match:
        
        - `/cybersiege/game/new?team=blue` → matches
            
        - Captured part: `game/new`
            
3. **`/$1`** — This is what the URI is **rewritten to**, using the capture group.
    
    - So `/cybersiege/game/new` becomes `/game/new`
        
4. **`break`** — This tells NGINX to **stop processing further rewrite rules** and **use the updated URI** immediately for handling the request


```
rewrite ^/cybersiege/(.*)$ /$1 break;
```



### Error1:
![[Pasted image 20250418205145.png]]

### Solution:
On the **default.conf of Server B,** I add a rewrite for the path added
This modify the error and now we can see what is going on better.
Server B is trying to load the files directly from its servers, instead of Server A.
![[Pasted image 20250418205117.png]]

### Error2:
Notice now we can see the path of the files giving error.
![[Pasted image 20250418205603.png]]

## 404 Errors not found

### Solution
![[Pasted image 20250419083519.png]]
<hr>
If receive 404 errors not found when accessing the files 
We will need to add the below to our settings to allow rewrite of the path, or we need to modify our application to server the files from an specific directory instead like **/game/_next , /game_static**   instead of just **/_next , /static**

Because I don't have any conflict on this servers to rewrite these paths, it was okay for me to use the rules on the default.conf as below
```
location ^~ /_next/ {
    proxy_pass http://cyber_siege_solo_3002/_next/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

```
        location  /static/ {
        proxy_pass http://cyber_siege_solo_3002/static/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
```

Also we need to make sure no other regex rules on the config are conflicting we the new ones we are adding. The below does not interfere but the image below is just for example
![[Pasted image 20250418233641.png]]

