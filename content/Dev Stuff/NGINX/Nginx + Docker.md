
## Exposing Docker Internal only
When using Nginx and docker we only need to expose our container to our local network when deploying it, so on this example we have an app running on port 3000. 
But since we have a proxy settings on our nginx we only need to deploy it like the below. 
Using this method we do not have to expose port 3000 to the internet
```
docker run -d --name hacker-terminal -p 127.0.0.1:3000:3000 hacker-terminal
```

Because our nginx **/conf.d/hackerterminal.conf**  has been configure to have the proxy settings it will be able to pass the requests to the app

#### /etc/nginx/conf.d/hackerterminal.conf
```
upstream hacker_terminal_3000{
        server localhost:3000;
}
server{
        listen 80;
        server_name xheaders.com www.xheaders.com;

        location /{
        proxy_pass http://hacker_terminal_3000/;
        }
}
```
