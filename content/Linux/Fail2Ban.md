## Install
```bash
sudo apt-get install -y fail2ban 
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

## Config
After installing we will see a new chain under the iptables. In case it does not work restart the iptables service
```bash
sudo iptables -L -v
```


![[Pasted image 20260222214953.png]]