**Links**
[Sentinel Price](https://www.microsoft.com/en-gb/security/pricing/microsoft-sentinel/)
[Data Lake Supported Zones](https://learn.microsoft.com/en-gb/azure/sentinel/geographical-availability-data-residency#supported-regions)
[MS Sentinel Training Lab Github](https://github.com/Azure/Azure-Sentinel/blob/master/Tools/Microsoft-Sentinel-Training-Lab/README.md)
### Instructions

- Login into Azure.Portal
- Create Log Analytics WorkSpace (Workspace and Analytics WorkSpace are different)
	- *Obs: Not all regions support DataLake Storage*
- Search for Sentinel, Create then select your Analytics Workspace and click "Add" 
**Add Connectors**
- Install connectors from Content Hub
- Endpoint Protection, Azure, Entra,Defender XDR
>[NOTE]
>All this ingestion needs to be taken into consideration and will result into how much we pay.
>Link : [Microsoft Calculator](https://azure.microsoft.com/en-us/pricing/calculator/)


### Connectors Automatically Added
In the past we used to configure the below connectors manually, however these are all added by default now. We just need to configure them.
![[Pasted image 20260902231841.png]]
### Connect Azure Logs
On the Data Connector page, click on *Content Hub*, this will open a search page, search for Azure. This ia a *FREE* Connector and its worth adding. 
![[Pasted image 20260903000459.png]]
1. In the **Basics** tab, click the button with the three dots under **Scope** to select your resources assignment scope.
2. In the **Parameters** tab, choose your Microsoft Sentinel workspace from the **Log Analytics workspace** drop-down list, and leave marked as "True" all the log and metric types you want to ingest.
3. To apply the policy on your existing resources, select the **Remediation tab** and mark the **Create a remediation task** checkbox
#### Configure Diagnostic Settings for Activities Logs
1. Navigate to **Monitor** > **Activity log**
2. Click **Export Activity Logs** or **Diagnostic settings**
3. Click **+ Add diagnostic setting**
4. Configure the setting:
    - **Diagnostic setting name**: `activity-logs-to-law`
    - **Log categories**: Select all categories:
        - Administrative
        - Security
        - Service Health
        - Alert
        - Recommendation
        - Policy
        - Autoscale
        - Resource Health
    - **Destination details**:
        - Check **Send to Log Analytics workspace**
        - Select your subscription and workspace
5. Click **Save**

After creating the Connector for Azure logs, make sure the policy is compliant, Go to `Policy Assignment` and verify
![[Pasted image 20260902231631.png]]

**Connect Cloud Apps Logs** [guide]((https://learn.microsoft.com/en-us/defender-cloud-apps/siem-sentinel)
System > Settings > Cloud Apps > SIEM agents 


## Deploying Agent on Azure VM
![[Pasted image 20260902230203.png]]
Download the package from the M365 Defender Portal
Settings  > Endpoint > Onboarding > Choose the correct OS and download the package

On the VM extract the .zip and run the bash file
![[Pasted image 20260902230057.png]]

After deploying, run the test script to verify the detection is working as expected, after a few minutes it will create an alert on our dashboard. Defender has been installed succesfully.
![[Pasted image 20260902230606.png]]
