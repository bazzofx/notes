


## Basic IpTables
## test2 
To avoid being locked out when doing IPTables run the below.
To accept already Established connections, like the SSH we are likely using

### View IPTable Rules
```bash
iptables -L -v
```
### Initial Rules
```bash
#Allow Traffic going into the loop back interface, using ifconfig
sudo iptables -A INPUT -i lo -j ACCEPT

#Continue to Allow Already established Connections
sudo iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
```

### Append allow SSH on INPUT chain
```bash
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```
### Insert rule to position 3
```bash
iptables -I INPUT 3 -p tcp --dport 443 -j ACCEPT
```
### Delete Rule number 4 on INPUT chain
```bash
iptables -D INPUT 4
iptables -D INPUT -p tcp --dport 3001 -j ACCEPT
```
### Change Default Policy ACCEPT/DROP
```bash
sudo iptables -D INPUT -j DROP
```

### List Current Rules
This command shows what commands were used to create the current rules in place.
This can be useful when backing up or deleting a complex rule. 
```bash
iptables -S
```

![[Pasted image 20260222091112.png]]

## How it works
Any incoming traffic will go into the INPUT CHAIN from top to bottom checking if the rule matching. If there is not an specific rule, it will accept the traffic by default.

![[Pasted image 20260222091406.png]]
> To change the default policy to DROP run the below, but make sure to only change once the other rules are in place or you will kick yourself out the servee.
> `iptables -P INPUT DROP`
### Drop and Reject
Accept will allow traffic in
Drop will silently drop the packet without alerting the client
Reject will tell the client the packet has been rejected
#### Drop 
Drop will silently drop the packet without alerting the client

![[Pasted image 20260222093152.png]]
![[Pasted image 20260222101117.png]]
#### Reject --reject-with tcp-reset
Reject will tell the client the packet has been rejected

![[Pasted image 20260222093248.png]]
![[Pasted image 20260222101019.png]]
#### Reject
 `The response will be almost instantly, instead of waiting for timing out`
 It will appear time out  on the console, but we can see the message on WireShark
 
![[Pasted image 20260222100732.png]]
![[Pasted image 20260222100609.png]]

#### Other Reject Rules
The most verbose option for the client is `REJECT --reject-with tcp-reset`

|Type|What client sees|Notes|
|-----------------------------|---------------------|--------------------------------|
|`icmp-host-unreachable`|"Host unreachable"|Looks like server unreachable|
|`icmp-net-unreachable`|"Network unreachable"|Looks like routing issue|
|`icmp-host-prohibited`|"Administratively prohibited"|Clear firewall block|
|`icmp-net-prohibited`|"Administratively prohibited"|Similar to above|
Modern Windows systems and many firewalls:
- Ignore incoming ICMP error messages
- Convert them into generic socket errors
- Or suppress them entirely

As a result, ICMP-based `REJECT` messages usually won’t be visible in tools like `curl` or PsPing. You’ll typically only see the actual ICMP response in packet captures (e.g., Wireshark), since many modern systems block or hide incoming ICMP errors by default
![[Pasted image 20260222100902.png]]

## Save & Restore 
Iptables rules are not saved automatically, if the server is rebooted they will be gone. The below command saves the current rules into a file so we can restore it when the server reboots. 
We find the IPv4 and IPv6 rule files at `/etc/sysconfig/iptables` and `/etc/sysconfig/ip6tables` respectively.
```bash
## Save
sudo iptables-save > ~/rules.v4
## Restore
sudo iptables-restore < ~/rules.v4
```

### Persisting Rules through Reboots (Debian/Ubuntu)
```bash
sudo apt-get install -y iptables-persistent
sudo service iptables-persistent start
sudo iptables-save > /etc/iptables/rules.v4
sudo service iptables-persistent restart
```
### Persisting Rules through Reboots (CentOS/RedHat)
We dont need to install anything on this Linux flavor
```bash
sudo chkconfig iptables on
sudo service iptables save
sudo service iptables start
```

Also check out [[Fail2Ban]] to help add simple and effective protection against unauthorized login attempts.
