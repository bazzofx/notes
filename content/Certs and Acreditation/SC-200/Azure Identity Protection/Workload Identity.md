
A workload identity is an identity that allows an application or service principal access to resources, sometimes in the context of a user. These workload identities differ from traditional user accounts as they:

- Can’t perform multifactor authentication.
- Often have no formal lifecycle process.
- Need to store their credentials or secrets somewhere.

These differences make workload identities harder to manage and put them at higher risk for compromise.

### Requirements to use workload identity protection

To make use of workload identity risk, including the Risky workload identities blade and the Workload identity detections tab in the Risk detections blade, in the Microsoft Entra admin center you must have the following.

- Microsoft Entra ID Premium P2 licensing
    
- Logged in user must be assigned either:
    
    - Security administrator
    - Security operator
    - Security reader
### What types of risks are detected?

|**Detection name**|**Detection type**|**Description**|
|---|---|---|
|Microsoft Entra threat intelligence|Offline|This risk detection indicates some activity that's consistent with known attack patterns based on Microsoft's internal and external threat intelligence sources.|
|Suspicious Sign-ins|Offline|This risk detection indicates sign-in properties or patterns that are unusual for this service principal.|
|||The detection learns the baselines sign-in behavior for workload identities in your tenant in between 2 and 60 days, and fires if one or more of the following unfamiliar properties appear during a later sign-in: IP address / ASN, target resource, user agent, hosting/non-hosting IP change, IP country, credential type.|
|Unusual addition of credentials to an OAuth app|Offline|This detection is discovered by Microsoft Defender for Cloud Apps. This detection identifies the suspicious addition of privileged credentials to an OAuth app. This can indicate that an attacker has compromised the app, and is using it for malicious activity.|
|Admin confirmed account compromised|Offline|This detection indicates an admin has selected 'Confirm compromised' in the Risky Workload Identities UI or using riskyServicePrincipals API. To see which admin has confirmed this account compromised, check the account’s risk history (via UI or API).|
|Leaked Credentials|Offline|This risk detection indicates that the account's valid credentials have been leaked. This leak can occur when someone checks in the credentials in public code artifact on GitHub, or when the credentials are leaked through a data breach.|


# Explore the Identity Risk Management Agent
[Risk Agent Management Doc Page](https://learn.microsoft.com/en-us/training/modules/manage-azure-active-directory-identity-protection/8a-identity-risk-management-agent)
The agent checks for new risky identities that weren't previously identified. If new risky identities are found, it takes the following steps (no SCUs consumed):

1. The agent checks for new risky users in your tenant who currently have a risk state of "At risk".
2. The agent identifies risky users that are within your defined scope settings.

If the agent finds new suggestions, it takes the following steps (SCUs consumed):
>[NOTE]
>A **Security Compute Unit (SCU)** is Microsoft's consumption-based unit for AI-powered security features, including security agents and copilots. Instead of charging for each API call or AI inference, Microsoft meters the work performed by these AI capabilities in SCUs.

|Step|Agent activity|
|---|---|
|Investigate the risky user|The agent checks the user's risky sign-ins and risk detections to analyze what's risky about this user.|
|Generate findings and a risk summary|The agent generates findings based on the investigation, which includes a thorough risk summary explaining the suggestion and defining the key risk factors.|
|Generate a recommended remediation action|The agent suggests a remediation action, using the information gathered during the investigation.|
|Answer questions through chat|IT administrators ask the agent questions related to the risky users and the risk summary.|
|Store custom instructions in agent memory|Customers can give the agent custom instructions through agent chat, which the agent stores in its memory and applies for future runs. Currently, agent memory can store preferred remediation actions.|


