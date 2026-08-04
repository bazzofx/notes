**Microsoft Defender for Cloud Apps** is a multi-cloud CASB that delivers visibility, data governance, and advanced analytics to detect and mitigate threats across cloud services.

## Glossary
- IdPs -  identity providers
- UEBA -  User and Entity Behavioral Analytics
## Core Functions Microsoft Cloud Apps

- **Shadow IT discovery** — identifies unknown cloud apps (IaaS/PaaS), averaging 1,000+ per organization, to assess risk.

- **Data protection** — classifies and secures sensitive data at rest via DLP controls across leak points.

- **Threat & anomaly detection** — uses UEBA, anomaly detection, and rule-based alerts to spot unusual behavior and ransomware across users and apps.
    
- **Compliance assessment** — evaluates cloud apps against regulatory/industry standards, prevents data leaks to non-compliant apps, and restricts access to regulated data.

[Microsoft Cloud Apps Module](https://learn.microsoft.com/en-us/training/modules/microsoft-cloud-app-security/)
![[Pasted image 20260804222555.png]]
## Learn objectives
- Define the Defender for Cloud Apps framework.
- Understand how to use Cloud Discovery for visibility in your organization.
- Explain how to use Conditional Access App Control policies to monitor and control access to your applications.
- Understand how to classify and protect your information.
- Understand how to use anomaly detection policies to detect threats in your cloud environment.


## Cloud Apps Framework

A CASB acts as an intermediary between users and cloud services, enforcing monitoring and security controls over users and data—similar to how a firewall secures a corporate network.

Microsoft Defender for Cloud Apps is a CASB for threat detection across Microsoft and third-party clouds, with integrated deployment, central management, and automation.
It helps understand what Apps are accessing your data.
- **Defender for Cloud Apps** natively integrates with **Azure Information Protection** for cloud-based classification and protection of files and emails.
>NOTE
>You have to enable the app connector for Microsoft 365 to take advantage of Azure Information Protection



## Cloud Discovery
**Cloud Discovery** analyses network traffic logs against a catalog of **16,000+ cloud apps**, scoring each on **80+ risk factors** to uncover Shadow IT and non-compliant apps.  
The **dashboard** shows:

- App types, open alerts, and risk levels
- Top users and app headquarters (geolocation)
- Filterable views for customized analysis.

## Conditional Access App Control
**Cloud Discovery** offers post-hoc visibility, but real-time protection is achieved via **Conditional Access App Control** in Microsoft Defender for Cloud Apps, integrated with **Microsoft Entra ID** (or other IdPs).

- **Access & session controls** are enforced in real time based on Conditional Access policies (user, app, location/network conditions).
    
- Policies route users through Defender for Cloud Apps for granular data protection.
    
- In Microsoft Entra ID, under Conditional Access > Session controls, select **"Use Conditional Access App Control"**; custom controls are defined in the Defender for Cloud Apps portal.
    
- Built-in policies simplify deployment.

Here's a simplified table summarizing the key controls:
### Conditional Access Settings

| **Control Action**                        | **Purpose / Technical Description**                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Block download / copy / print**         | Prevents data exfiltration of sensitive documents on unmanaged devices.                                                  |
| **Label & protect on download**           | Instead of blocking, applies Azure Information Protection labels and protection to files during risky session downloads. |
| **Block upload of unlabeled files**       | Enforces classification by blocking uploads until proper labels/protection are applied.                                  |
| **Monitor user sessions**                 | Logs actions of risky users during app sessions for behavioral analysis and future policy tuning.                        |
| **Block access**                          | Denies app access based on risk factors (e.g., using client certificate as device management).                           |
| **Block custom activities**               | Scans and blocks app-specific risky actions (e.g., messages with sensitive content in Teams/Slack) in real time.         |
| **Block Teams IM with sensitive content** | Uses real-time content inspection (expression/regex) to block Teams messages and alert admins.                           |

## Classify and protect sensitive information
### Phase 1: Discover data
This phase it scans for Apps that are connected to MS Defender for Cloud Apps to classify data.
Then apply policies and controls, with `app connector`, or use `Conditional Access App Control`

### Phase 2: Classify sensitive information
Define sensitivity using **100+ predefined sensitive info types** (e.g., passport/ID numbers) and **Azure Information Protection default labels**—used by Defender for Cloud Apps during scanning to classify data.

|**Label**|**Description**|**Examples**|
|---|---|---|
|**Personal**|Non-business, personal use only|–|
|**Public**|Freely shareable externally|Marketing posters, blog posts|
|**General**|Not public, but shareable with external partners|Project timelines, org charts|
|**Confidential**|Internal only; unauthorized disclosure could cause damage|Sales data, forecasts|
|**Highly Confidential**|Very sensitive; unauthorized disclosure would cause serious damage|Customer details, passwords, source code|

 Enable Azure Information Protection integration in Microsoft Defender for Cloud Apps by selecting **Automatically scan new files for Azure Information Protection classification labels** in the **Settings** pane:
 ![[Pasted image 20260804234409.png]]

### Phase 3: Protect data
**File policies** in Defender for Cloud Apps scan files in real time and at rest to detect sensitive data. They support automated governance actions, including:

- Alerts and email notifications
- Modify sharing access
- Quarantine files
- Remove permissions
- Move files to trash

#### Policy Overview 
|**Field**|**Description**|
|---|---|
|**Policy severity**|Defines importance and notification trigger; customizes risk visibility.|
|**Category**|Informative label (default: DLP for File policies).|
|**Create a filter**|Determines which files/apps trigger the policy; narrow to reduce false positives.|
|**Apply to (apps)**|Scope: _All files excluding selected folders_ or _Selected folders_ (e.g., Box, SharePoint, OneDrive, Dropbox).|
|**Apply to (users)**|Scope: _All owners_, _Owners from selected groups_, or _All owners excluding selected groups_.|
|**Content inspection method**|Choose _Built-in DLP_ or _Data Classification Services (DCS)_ — Microsoft recommends DCS for unified labeling across M365, AIP, and Defender for Cloud Apps.|
|**Governance**|Automated actions (e.g., alerts, quarantine, permission changes) on policy match.|

### Phase 4: Monitor and report
Monitor alerts and environment health via the dashboard. To view file-related alerts, go to **Alerts pane** → filter **Category = DLP**.
![[Pasted image 20260804234921.png]]

## Detect Threats

**Defender for Cloud Apps** includes built-in **anomaly detection policies** using **UEBA and machine learning** to detect threats across cloud environments.  
- Detections are **nondeterministic**—triggered only by **deviations from normal behavior**.  
- Policies are **auto-enabled** but require a **7-day learning period** to establish a baseline (IPs, devices, locations, apps, risk scores).  
- Machine learning profiles user sign-in patterns to **reduce false positives**.

Risk are then grouped into those risk factors:
- Risky IP address
- Login failures
- Admin activity
- Inactive accounts
- Location
- Impossible travel
- Device and user agent
- Activity rate

### Anomaly detection policy overview
The Microsoft Defender for Cloud Apps anomaly detection policies is configured to detect various security issues. The most popular are:

|**Detection Type**|**Description**|
|---|---|
|**Impossible travel**|Activity from geographically distant locations within less than the expected travel time.|
|**Activity from infrequent country**|Access from a country rarely or never used by the user or any org user.|
|**Malware detection**|Scans files via Microsoft threat intelligence for known malware.|
|**Ransomware activity**|Detects file uploads potentially infected with ransomware.|
|**Activity from suspicious IPs**|Activity from IPs flagged as risky by Microsoft Threat Intelligence.|
|**Suspicious inbox forwarding**|Detects suspicious forwarding rules set on a user's mailbox.|
|**Unusual multiple file downloads**|Identifies bulk downloads in a single session, deviating from baseline (potential breach).|
|**Unusual administrative activities**|Identifies bulk admin actions in a single session, deviating from baseline (potential breach).|

## Configure an anomaly detection policy
**Discovery anomaly policy** detects unusual spikes in cloud app usage (downloads, uploads, transactions, users) by comparing against each app’s baseline. Extreme deviations trigger alerts.

**Configuration options:**
- **Filters** – application, data views, start date
- **Sensitivity** – controls alert volume (threshold for triggering)

1. Sign in to the Microsoft Defender Portal through your browser.
2. In the navigation menu, expand the Cloud apps section, and select **Policies**.
3. Select **Policy management**, and set the **Type** filter to **Anomaly detection policy**.
4. Select the policy you want to scope.
5. Under **Scope**, change the dropdown from the default setting of **All users and groups**, to **Specific users and groups**.
6. Select **Include** to specify the users and groups for whom this policy applies. Any user or group not selected here won't be considered a threat or generate an alert.
7. Select **Exclude** to specify users for whom this policy won't apply. Any user selected here won't be considered a threat or generate an alert, even if they're members of groups selected under **Include**.