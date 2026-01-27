This video covers the correct way to allow remote desktop users using GPO on Active Directory

## 1st Step
Create a Security Group ie: Boss
Create a GPO and link to Computers
Inside the GPO select the Security Group you created
Computer> Policies>Windows Settings> Security Settings>Restricted Groups
![[Pasted image 20250914190708.png]]
and then add Remote Desktop Users to be part of this group

![[Pasted image 20250927143750.png]]
## 2nd Step
Next still inside the GPO
Computer>Administrative Templates>Windows Components>Remote Desktop Services > Remote Desktop Session host >Connections 
`Allow user to connect remote using Remote Desktop Service`
**Set Enabled**
![[Pasted image 20250914191022.png]]
Next
Administrative Templates>Windows Components>Remote Desktop Services > Remote Desktop Session host >Security
`Require user authentication for remote connection`
![[Pasted image 20250914191110.png]]

Now the security Group you have created on step 1 will have permissions to RDP on the servers that are under the GPO you have created.

Force a Group Policy Update on both server and desktop and job done. 
```cmd
gpupate /force
```