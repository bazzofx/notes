As I continue to test more tools used to steal web browser credentials #T1555 
it becomes more evident they all relying on either one of these two tricks to attack [[Web Browser Store Credentials]]

Read the encrypted contents of the file from its location where its store, and decrypting it later using DPAPI stolen from the victim, or attempt to inject the browser process itself and read the passwords in plain text directly from browser memory.  
  
The most common is reading the encrypted files and decrypting it later using mimikatz or SharpChrome or another variation.  
  
The credentials are saved differently on Firefox compared to Chromium browsers because Firefox uses its own encryption system based on the NSS (Network Security Services) library and stores credentials in logins.json with encryption keys in key4.db, while Chromium-based browsers store credentials in an SQLite database (Login Data) and encrypt them using Windows DPAPI with a key found in the Local State JSON file.  
  
  
If you want to monitor for credential harvest, and your users falling victim to infostealer, redliner, lazagne malware strains. Make sure to keep an eye on processes accessing the below files, I know I will  
## 🦊 Firefox:  
```
C:\Users\<USER>\AppData\Roaming\Mozilla\Firefox\Profiles\<PROFILE>
```
- `key4.db` — for master password and credentials  
- `logins.json` — stores encrypted usernames/passwords  
  
## 🧿 Chrome (chromium browser) / Edge/ Brave  
Below path is for Chrome but you will find a similar format for Edge and Brave also.  
![[Pasted image 20250518184604.png]]
Process trying to read the Local State  
👉 Malware need the encryption key within this file to be able to decrypt the password stored on the browser  
```
"$env:LOCALAPPDATA\Google\Chrome\User Data\Local State"  
```
👉 Direct access to the password file within the browser  
```
%LOCALAPPDATA%\Google\Chrome\User Data\Default\Login Data
```
- `Local State` — for master password and credentials  
- `Login Data` — stores encrypted usernames/passwords  

# CredentialKats
CredentialKatz works differently from the other tools we looked at. This one gathers the information from memory instead of the actual files. However on the newer Chrome (chromium based) Edge/Brave version 135.0 or higher [CredentialKats](https://github.com/Meckazin/ChromeKatz) is not working. However [CookieKatz](https://github.com/Meckazin/ChromeKatz) which is part of the same suite is still working
**CredentialKats** 
![[Pasted image 20250518192642.png]]
**CookieKatz**
![[Pasted image 20250518192540.png]]
