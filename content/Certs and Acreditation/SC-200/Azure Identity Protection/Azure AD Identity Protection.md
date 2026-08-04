
## Azure AD Identity Protection

Identity Protection is a service that enables organizations to view the security posture of any account. Organizations can accomplish three key tasks:

- Automate the detection and remediation of identity-based risks.
- Investigate risks using data in the portal.
- Export risk detection data to third-party utilities for further analysis.

> [Note]
> Always remember that Microsoft Entra Identity Protection requires a **Microsoft Entra ID Premium P2 license** to operate.


![[Pasted image 20260503133715.png]]

### Risk Detection and Remediation
|**Risk detection type**|**Description**|
|---|---|
|Anonymous IP address|Sign in from an anonymous IP address (for example: Tor browser, anonymizer VPNs).|
|Atypical travel|Sign in from an atypical location based on the user's recent sign ins.|
|Malware-linked IP address|Sign in from a malware-linked IP address.|
|Unfamiliar sign in properties|Sign in with properties we've not seen recently for the given user.|
|Leaked credentials|Indicates that the user's valid credentials have been leaked.|
|Password spray|Indicates that multiple usernames are being attacked using common passwords in a unified brute-force manner.|
|Microsoft Entra threat intelligence|Microsoft's internal and external threat intelligence sources have identified a known attack pattern.|
|New country|This detection is discovered by Microsoft Defender for Cloud Apps (MDCA).|
|Activity from anonymous IP address|This detection is discovered by MDCA.|
|Suspicious inbox forwarding|This detection is discovered by MDCA.|
### Permissions
Identity Protection requires users be a Security Reader, Security Operator, Security Administrator, Global Reader Administrator in order to access.

|**Role**|**Can do**|**Can't do**|
|---|---|---|
|Security Administrator|Full access to Identity Protection|Reset password for a user|
|Security Operator|View all Identity Protection reports and Overview screen, Dismiss user risk, confirm safe sign-in, confirm compromise|Configure or change policies, Reset password for a user, Configure alerts|
|Security Reader|View all Identity Protection reports and Overview screen|Configure or change policies, Reset password for a user, Configure alerts, Give feedback on detections|
## ### License requirements
Follow this link [to view license requirement to use Identity Protection](https://learn.microsoft.com/en-us/training/modules/manage-azure-active-directory-identity-protection/2-review-identity-protection-basics)

## Implement and manage user risk policy
There are two risk policies that can be enabled in the directory:

- **Sign-in risk policy**: The sign-in risk policy detects suspicious actions that come along with the sign-in. It's focused on the sign-in activity itself and analyzes the probability that the sign-in was performed by some other than the user.

- **User risk policy**: The user risk policy detects the probability that a user account has been compromised by detecting risk events that are atypical of a user's behavior.
Both policies work to automate response to self-remediate when risk is detected

### Prerquisites
If your organization wants to allow users to self-remediate when risks are detected, u**sers must be registered for both self-service password reset and multifactor authentication.** It is recommended to allow users to self-remediate to reduce admin work intervention.

Microsoft's recommendation is to set the user risk policy threshold to **High** and the sign-in risk policy to **Medium and higher**.

### Exclusions
Exclusions can be created, specially for the case of break glass emergency accounts.
> [Note]
> Configured trusted network locations are used by Identity Protection in some risk detections to reduce false positives.
> 