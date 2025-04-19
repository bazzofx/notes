###### Ref:
[Nginx Course](https://www.linkedin.com/learning/learning-nginx-17014605/comparing-nginx-to-apache?autoSkip=true&resume=false&u=84863210)

# Intro
NGINX is a **reverse proxy** and web server and will help us host websites online and also protect our website with a reverse proxy.
A proxy server allows content to be passed onto other applications than back to the requestor
![[Pasted image 20250404214739.png]]

# Nginx vs Apache

## Similarities
- Open Source
- Proxy Server
- Handle multiple connections
## Differences
|Apache | NGINX|
|-----|-------|
|XML syntax  |C-Like syntax|
|Distributed .htaccess file|Centralize blocks|
|Less efficient serving static content|Efficient on seving static content|
|Dynamic content(can server php, python, pearl directy from binary|Dynamic content requires external processing|
|Caching and load-balancing available with modules|Native caching and load-balancing capabilities|
**Apache:** Under each directory under root directory it can contain a **httaccess file** to allow default config to be overridden, but that can slow down process as that is process before each request

**NGINX:** All config files are loaded at same time, and uses location blocks where it maps request to location on file system or some other application for processing

## Commands
|Command| Description|
|-------|-----------------|
|nginx -t | Test configuration files
|nginx -T | Shows all current config for Nginx

# File Location
### Nginx Config Files
| path                       |  Description   |
| -------------------------- | --- |
|/etc/nginx/conf.d           |Main configuration file     |
|/var/etc/www                |Where the website files are located|
|/var/log/nginx/             |Location where logs are sent     |

### Sites Config Files
| Path                            | Description |
| ------------------------------- | ----------- |
|  /etc/nginx/conf.d/             | Server config files    |
|  /etc/nginx/sites-available/    | Server config files    |
|  /etc/nginx/sites-enabled/      | Server config files    |

*The initial default config is on /sites-available/default*
*The default file inside **/sites-enabled** is a symlink to the file physical file on **/sites-available**
![[Pasted image 20250412125852.png]]
```
unlink /etc/nginx/sites-enabled/default
```

## First Steps
*unlink the default configuration* /etc/nginx/sites-available 
Update the conf.d file


# nginx.conf

To avoid making unwanted changes use the view command
```
view /var/etc/nginx/nginx.conf
```
The below block inside the nginx.conf tells nginx to process configuration files on the paths that matches the address below

- One method of configuration is placing the file ending in **.conf** and placing it in the conf.d directory
- Another method is to place configuration in the sites-available/ directory, and placing a symlink from sites-enabled/ directory
![[Pasted image 20250412103901.png]]



## Modifying configuration


## Location Modifiers
![[Pasted image 20250407010008.png]]


![[Pasted image 20250407005949.png]]