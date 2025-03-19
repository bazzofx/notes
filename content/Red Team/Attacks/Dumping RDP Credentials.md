
Administrators typically use Remote Desktop Protocol (RDP) in order to manage Windows environments remotely. It is also typical RDP to be enabled in systems that act as a jumpstation to enable users to reach other networks. However even though this protocol is widely used most of the times it is not hardened or monitor properly.

From red teaming perspective dumping credentials from the lsass process can lead either to lateral movement across the network or directly to full domain compromise if credentials for the domain admin account have been stored. Processes which are associated with the RDP protocol can also be in the scope of red teams to harvest credentials. These processes are:

1. svchost.exe
2. mstsc.exe

The above processes can be targeted as an alternative method to retrieve credentials without touching lsass which is a heavily monitored process typically by endpoint detection and response (EDR) products.

## svchost

The service host (svchost.exe) is a system process which can host multiple services to prevent consumption of resources. When a user authenticates via an RDP connection the terminal service is hosted by the svchost process. Based on how the Windows authentication mechanism works the credentials are stored in memory of the svchost process in plain-text according to the discovery of [Jonas Lyk](https://twitter.com/jonasLyk). However, looking at the process list, there are multiple svchost processes so identification of which process, hosts the terminal service connection can be achieved by executing one of the following commands.

Querying the terminal service:

```
sc queryex termservice
```

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-process-identification-service-query.png?w=818)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-process-identification-service-query.png)

svchost Identification – Service Query

Querying which task has loaded the rdpcorets.dll:

```
tasklist /M:rdpcorets.dll
```

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-process-identification-command-prompt.png?w=890)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-process-identification-command-prompt.png)

svchost Identification – RDP Core DLL

Running netstat:

```
netstat -nob | Select-String TermService -Context 1
```

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-process-identification-powershell.png?w=821)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-process-identification-powershell.png)

svchost Identification – netstat

Looking at the memory strings of the process the password is displayed below the username.

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-memory-strings.png?w=485)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-memory-strings.png)

Memory Strings

Process dump from Sysinternals can be used also to dump the memory by specifying the PID and the directory which the .dmp file will be written.

```
procdump64.exe -ma 988 -accepteula C:\Users\pentestlab
```

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-dumping-memory-process-dump.png?w=800)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-dumping-memory-process-dump.png)

Memory Dumping – Process Dump

The .dmp file can be transferred to another host for offline analysis. Performing a simple grep will identify the password stored in the memory file below the username.

```
strings -el svchost* | grep Password123 -C3
```

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-memory-dump-grep.png?w=1024)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-memory-dump-grep.png)

Discovery of Password in Memory Dump

The above method doesn’t consider fully reliable and it is still unknown in which conditions the credentials are maintained in the svchost process. However, Mimikatz support the retrieval of credentials from existing RDP connections by executing the following:

```
privilege::debug
ts::logonpasswords
```

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-mimikatz.png?w=838)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-mimikatz.png)

Mimikatz – RDP Credentials

## mstsc

The mstsc.exe process is created when a user opens the remote desktop connection application in order to connect to other systems via the RDP protocol. API hooking could be used to intercept the credentials provided by the user and use them for lateral movement. [Rio Sherri](https://twitter.com/0x09al) has developed a proof of concept tool called [RdpThief](https://github.com/0x09AL/RdpThief) which attempts to hook the functions used by mstsc process (CredIsMarshaledCredentialW & CryptProtectMemory) in order to retrieve the credentials and write them into a file on the disk. Details of the tool can be found in an [article](https://www.mdsec.co.uk/2019/11/rdpthief-extracting-clear-text-credentials-from-remote-desktop-clients/) in the MDSec website.

From a system that has been compromised and the mstsc.exe is running the DLL needs to be injected into the process.

```
SimpleInjector.exe mstsc.exe RdpThief.dll
```

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-rdp-thief-injection.png?w=708)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-rdp-thief-injection.png)

RdpThief.dll – DLL Injection

Once the user enter the credentials for authentication to the destination host these will be captured and written into a file on the C:\temp folder.

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-rdp-thief-credprompt.png?w=446)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-rdp-thief-credprompt.png)

CredPrompt

The file creds.txt will include also the IP address. This information could be utilized to move laterally across the network or even to escalate privileges if an elevated account is used.

- [![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-rdp-thief-file.png?w=796)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-rdp-thief-file.png?w=796)
    
- [![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-rdp-thief-credentials.png?w=594)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-rdp-thief-credentials.png?w=594)
    

The tool has been rewritten in C# by [Josh Magri](https://twitter.com/passthehashbrwn). However comparing to RdpThief, [SharpRDPThief](https://github.com/passthehashbrowns/SharpRDPThief) uses an IPC server in order to receive the credentials from the mstsc.exe process. In the event that the mstsc.exe is terminated the server will continue to run and when the process is initiated again will attempt to perform the hooking. This removes the limitation that RdpThief had that the process should already exist.

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-sharprdpthief.png?w=884)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-sharprdpthief.png)

SharpRDPThief

## RDP Files

Users that tend to authenticate multiple times to a particular host via an RDP connection they might save the connections details for quick authentication. These credentials are stored in an encrypted form in the Credential Manager of Windows by using the Data Protection API.

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-credential-manager.png?w=912)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-credential-manager.png)

Credential Manager

The location of the Windows Credentials on the disk is the following:

```
C:\Users\username\AppData\Local\Microsoft\Credentials
```

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-dpapi-windows-credentials-location.png?w=808)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-dpapi-windows-credentials-location.png)

Windows Credentials Location

The file can be viewed through the Mimikatz binary:

```
dpapi::cred /in:C:\Users\pentestlab\AppData\Local\Microsoft\Credentials\ACC240EEE479C1B634EC496F9838074B
```

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-dpapi-windows-credentials-mimikatz.png?w=962)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-dpapi-windows-credentials-mimikatz.png)

DPAPI Credentials – Mimikatz

The “_pbData_” field contains the information in an encrypted form. However the master key for decryption is stored in the lsass and can be retrieved by executing the following Mimikatz module. The “_guidMasterKey_” is also important as multiple entries might exist when the lsass is queried and it is needed to match the GUID with the Master Key.

```
sekurlsa::dpapi
```

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-dpapi-mimikatz-master-key.png?w=959)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-dpapi-mimikatz-master-key.png)

Mimikatz – DPAPI Master Key

Executing again the dpapi::cred module with the master key switch will have as a result the decryption of the contents and the RDP credentials to be disclosed in plain-text.

```
dpapi::cred /in:C:\Users\pentestlab\AppData\Local\Microsoft\Credentials\ACC240EEE479C1B634EC496F9838074B
/masterkey:05d8e693421698148d8a4692f27263201f1c65e0b3ac08e3be91ea75f43e71e9b398e2418ba0f0c62ea70a317bdba88f11da3adebd07d65d2b349f933eab85e1
```

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-dpapi-decrypting-credentials-mimikatz.png?w=961)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-dpapi-decrypting-credentials-mimikatz.png)

DPAPI – Decrypting Credentials

Executing the following command will provide the details in which server these credentials belong.

```
vault::list
```

[![](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-dpapi-mimikatz-vault-list.png?w=923)](https://pentestlab.wordpress.com/wp-content/uploads/2021/05/rdp-password-dumping-dpapi-mimikatz-vault-list.png)