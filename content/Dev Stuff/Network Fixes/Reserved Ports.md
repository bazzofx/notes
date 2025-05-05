When trying to spin a local server, some of the ports were coming up as blocked. This is because the server was trying to deploy from a reserved port on the system.

![[Pasted image 20250423233509.png]]
You can view a list of which ports are excluded from your user by running this command:

```powershell
netsh interface ipv4 show excludedportrange protocol=tcp
```
![[Pasted image 20250423233401.png]]