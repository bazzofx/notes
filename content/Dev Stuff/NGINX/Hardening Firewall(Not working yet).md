## Hardening with FireWall
Now that we have the app working from our Server B using
website.com/terminal
We will limit which servers can reach our server on port 3000 using the **ufw** command.

### Check if Firewall is running

### Add explicit allow SSH avoid being locked out

### Create rules to only allow Server B IP:3000
```
sudo ufw allow from $SERVER_IP to any port 3000 comment 'Allow Server B access to port 3000'
```

## Docker Firewall
Docker will create its own IP Table rules, unless we explicitly tell it not to create.

Running the below iptable command we can see Docker have added its own line, to allow any server to reach the docker IP on port 3000
![[Pasted image 20250418194617.png]]
```
iptables -L -n
```


## Restricting Docker from adding IPTables
The below will not work to only allow a specific IP to communicate to the app port.
But its more a reference on cases where docker apps are not working as expected.

Create the file on the Docker Running image or edit if does not exist yet
**/etc/docker/daemon.json**

Add the following
```
{
  "iptables": false
}
```
Restart Docker:
```
sudo systemctl restart docker
```
⚠️ This disables Docker's iptables manipulation. You now **must manually publish** ports (with UFW or your own iptables).