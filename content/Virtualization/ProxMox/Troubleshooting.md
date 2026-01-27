"Can't download VM templates, - cant reach proxmox.com server"

DNS issue
-  add "nameserver 8.8.8.8" into /etc/resolv.conf
- When creating the Container, make sure to select DHCP option, to make sure the server receives an IP automatic from the DHCP pool.
- Check Network settings has DNS configuration

```bash
# cd /etc/network/  
# nano interfaces  
dns-nameservers 8.8.8.8 8.8.4.4
```
![[Pasted image 20250615001234.png]]