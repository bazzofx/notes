![[Pasted image 20260804203947.png]]

The Microsoft Defender for Identity sensor, when installed directly on domain controllers, accesses required event logs locally. It parses logs and network traffic on-premises, then transmits only the parsed data—and only a subset of logs—to the Defender for Identity cloud service.

- Capture and inspect domain controller network traffic (local traffic of the domain controller)
- Receive Windows events directly from the domain controllers
- Receive RADIUS accounting information from your VPN provider
- Retrieve data about users and computers from the Active Directory domain
- Perform resolution of network entities (users, groups, and computers)
- Transfer relevant data to the Microsoft Defender for Identity cloud service
## View and configure sensor settings
In the Microsoft Defender portal ([https://security.microsoft.com](https://security.microsoft.com/)), go to **Settings** > **Identities**. In the left sidebar, under **Deployment**, select **On-premises**, then select the **Sensors** tab.

### Validate successful deployment
To validate successful Defender for Identity sensor deployment:

- Ensure the **Azure Advanced Threat Protection sensor service** is running on the sensor machine (may take a few seconds after saving settings).
    
- If the service fails to start, check the error log at:  
    `%programfiles%\Azure Advanced Threat Protection sensor\<sensor version>\Logs\Microsoft.Tri.sensor-Errors.log`

### To verify security alert functionality:

- On a domain-joined device, run `nslookup`, then set the server to your Defender for Identity sensor’s domain controller (e.g., `server contoso.azure`), and run `ls -d contoso.azure`. Repeat for each sensor.
    
- In the Defender portal, go to the device’s **Timeline** tab and look for:
    
    - **Events**: DNS queries to the specified domain
        
    - **Action type**: `MdiDnsQuery`
        
- For the first sensor deployed on a DC/AD FS/AD CS, allow **at least 15 minutes** for backend microservice deployment before verifying logical activity.