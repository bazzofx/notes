**JSE File Execution via Script Host**

This rule detects the execution of `.jse` files using `wscript.exe` or `cscript.exe`

```
processFilePath:("*wscript.exe" OR "*cscript.exe") and not processCmd:("*showWindowContents*" or "*MonitorKnowledge*" or "*ManageEngine*" or "*SVNBackup*") and proc
```
---

```
eventSubId: 204 and endpointHostName:lt-* and iis and not endpointHostName:( LT-93870 or  LT-91892 or LT-91253)
```

```
FileFullPath:rclone.exe OR URL:(downloads.rclone.org OR "[https://github.com/rclone/](https://github.com/rclone/)*")
```

```
objectRegistryKeyHandle:"hklm\software\microsoft\windows\currentversion\run*" AND eventSubId:402
```