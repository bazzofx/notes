
## Remediate threats using MS Defender
AIR in Microsoft Defender for Office 365 includes certain remediation actions
- Soft delete email messages or clusters
- Block URL (time-of-click)
- Turn off external mail forwarding
- Turn off delegation
#### Safe Attachment Policy
[ref](https://learn.microsoft.com/en-us/training/modules/m365-threat-remediate/configure-protect-detect)
Microsoft Defender for Office 365 Safe Attachments routes messages without known malware signatures to a special analysis environment, using machine learning to detect threats. If no malicious activity is found, the message is delivered to the mailbox.
- **Off**: No scanning.
- **Monitor**: Deliver after detection, track results.
- **Block**: Stop malicious emails.
- **Replace**: Deliver body, remove malicious attachments.
- **Dynamic delivery**: Deliver body first, attach later if safe.
WhiteList emails from scanning using **Transport Rules or Mal Flow Rules** from the Exchange Admin Center.
As part of the mail flow rule, modify the message properties to set a message header with the **X-MS-Exchange-Organization-SkipSafeAttachmentProcessing** as the header name to bypass the safe attachment policy

#### Safe Links
[ref](https://learn.microsoft.com/en-us/training/modules/m365-threat-remediate/configure-protect-detect)
The Microsoft Defender for Office 365 Safe Links feature proactively protects your users from malicious URLs in a message or in an Office document, Teams message, 365 Apps.

[Interactive Video Guide](https://mslearn.cloudguides.com/guides/Safeguard%20your%20organization%20with%20Microsoft%20Defender%20for%20Office%20365)

#### EOP Policies Order Highest to Lowest
Strict preset
Standard
Custom 
Default policy

#### Phishing Triage Agent
[ref](https://learn.microsoft.com/en-us/training/modules/m365-threat-remediate/phishing-triage-agent)
The Phishing Triage Agent in Microsoft Defender is an AI agent that helps security teams scale the triage and classification of user-reported phishing emails, reducing repetitive investigation work and accelerating response.




## Architecture Azure Monitor
![[Pasted image 20260412184536.png]]


## Summary
- Windows Security Events via AMA data connector can ingest security events from any Windows VM regardless of server/client and region which is deployed.
- Which two data sources support UEBA? (Azure Activity and Security Events)
- Which two portals can we revise DLP Alerts ( Purview and MS Defender Portal )

## Insider Risk Management
![[Pasted image 20260412185620.png]]
Microsoft Purview It can help prevent insider threat scenarios like
- User downloading large amounts of data a month prior to their dimissal
- Data loss prevention scenarios