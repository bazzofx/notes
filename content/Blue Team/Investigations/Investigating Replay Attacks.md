We will be looking how we can identify and investigate replay attacks coming from unauthorized locations.

## Links
[Entra Risk Users logs](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/SecurityMenuBlade/~/RiskDetections/menuId/IdentitySecureScore/fromNav/Identity)
[Entra Singin logs](https://entra.microsoft.com/#view/Microsoft_AAD_UsersAndTenants/UserProfileMenuBlade/~/SignIns/userId/)
[Entra Auth Log Analyzer](https://github.com/bazzofx/EntraAuthLogAnalyzer)
[Purview eDiscovery](https://purview.microsoft.com/audit/auditlogsearch)

## Identify Risk Users
On Entra we can check the **Risk Detections** to gain a quick glance of what Microsoft already detected to be possible malicious activity.
Link : [Entra Risk Users logs](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/SecurityMenuBlade/~/RiskDetections/menuId/IdentitySecureScore/fromNav/Identity)
`Home > Enterprise Applications > Sign-in logs > App Registration > Security`
![[Pasted image 20260302213632.png]]

## Download Sign-in logs
Next let's download the Sign-in logs for the user we want to look further. 
`Home > Users > UserName > Sign-in logs`
[Entra Singin logs](https://entra.microsoft.com/#view/Microsoft_AAD_UsersAndTenants/UserProfileMenuBlade/~/SignIns/userId/)
![[Pasted image 20260302213916.png]]

## Visualize the logs
For this section I have create my own tool, yes you can use excel or timeline to visualize the sign-logs but I have a better tool for it. Its open source and free to use 
Link : [Entra Auth Log Analyzer](https://github.com/bazzofx/EntraAuthLogAnalyzer)
After uploading our .csv to the app we can see there has been some successful logins from different countries on the account.
![[Pasted image 20260302214303.png]]

>[!NOTE]
>Sometimes this can be legit if the user is travelling, or is using VPN to perform certain activitities. But until that is clarified it should be taken as a possible account compromised.

We can see the only application which was logged in from the **US** is the **Office 365 Share Point Online** , usually if a malicious actor would have taken over the account, we would see it trying to access other applications as well like: Outlook, MsForms, SalesForce, MSTeams, 

## Extracting IOC from logs
We have identified the following so far
What country the login came from?
What is the suspicious IP?
What was the initial access time?
What applications did it interact with?
Has the IP still has access to the account?

## Checking raw logs
Opening the .csv file we downloaded we can verify if the session detected from the suspicious IP is still valid, and other activity it has done on the account, applications it used
![[Pasted image 20260302220122.png]]

## Exploring Audit Logs Purview
Next we will dive into the activity that was happening on the account within the initial time of access. 
To do this, we will use Purview
Link :[Purview eDiscovery](https://purview.microsoft.com/audit/auditlogsearch)

Having some of the IoC we identifies above, we can **filter by IP** to identify activity done by this IP.
On this occasion we cannot see any activity done by the IP 89.187.178.45, so we don't have any evidence that it interacted with the account.
![[Pasted image 20260302222810.png]]

## Next steps
The next steps is to search outside of Microsoft using the IoC we identified.

- Use your SIEM/XDR to search for the IP address and find more information of what activity it was doing.

- Also verify if the same IP has been used by other users (sometimes this can be an office) but multiple accounts been use by the same IP is also an indication of compromise

