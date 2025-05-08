
## Conflicting
![[Pasted image 20250427213213 1.png]]

#### Error #nginxConflict
```
conflicting server name "" on 0.0.0.0:80, ignored
```

#### Meaning
means that you have _two_ or more server blocks (`server {}`) trying to listen on `0.0.0.0:80` (port 80, all interfaces) **with the same server_name** (or more specifically, _an empty_ `server_name ""`). Nginx doesn't know which one to use and is ignoring one.
#### Fixing conflict issue
usually its missing the server_name from the config file
![[Pasted image 20250427213321 1.png]]
