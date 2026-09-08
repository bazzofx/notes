# Objectives:
- Describe how App-ID reduces the attack surface
- Describe App-ID concepts and operation
- Describe how to manage new and modified App-IDs through dynamic updates    
- Configure App-ID objects with App-ID filters and tags
- Describe how to migrate to App-ID-based security policies


# Application ID
App-ID identifies network applications via signatures, decryption, and heuristics. Combined with User-ID, it reveals user identities, not just IPs, enabling risk assessment and behavioral visibility.
We can assign an app ID to an application this application is going to have its traffic monitored as  a custom heuristic that will help us to identify traffic coming from this application.

## The Birth of NGFW
NGFW (Next-generation firewalls) emerged because traditional port-based rules became obsolete. Originally, applications like FTP and SMTP used dedicated ports. But developers began using ports 80 and 443 for faster deployment, turning HTTP/HTTPS from an application protocol into transport protocols—causing many applications to evade detection.

### Using App ID
In an application-based policy, the identity of an application becomes the basis for firewall policy in addition to a port number.
### Using App ID and User ID
If you also enable User-ID, you can specify which users and groups are allowed to use different applications or their functions. For example, you can allow all users to download files from Dropbox, but only certain users will be able to upload files
![[Pasted image 20260906222739.png]]

# Configure App ID
To configure which applications are allowed which applications are to be restricted or blocked We're going to use an app ID policy. Once you understand what is happening on your network, you can easily turn that understanding into policies that correspond to how your business actually runs, not just based on ports and IP addresses

## App ID Features 
App ID makes it easy to understand app usage between the organization. We can see what features are within the application base on an assessment already done by Paulo Alto.

- Application are identified based on heuristics, ports, patterns
- We can also see if the app has certain certificates or has been on any data breaches.
- It's possible to control individual functions of the app, like download and upload, fire sharing, and block, posting, fire transfer, or other features of the app.
- Auto tagging of applications dynamically as per policy
- We can excluded apps from specific tags
- We can create custom tags
- Firewall can use tag based application filtering to enforce dynamic App ID 
![[Pasted image 20260906223710.png]]
![[Pasted image 20260906223905.png]]

# Application Control Command Center (ACC)
The Application Command Center (ACC) offers an interactive graphical dashboard for applications, threats, and traffic, with drill-down capability from summaries to individual logs for rapid answers.
- Run comprehensive report on SasS app usage
- Dive deep into the app understand why its considered risky
- Pre-defined and custom-reports


![[Pasted image 20260906224031.png]]

## Enhanced Application Visibility with Decryption
**Decryption Enabled**
![[Pasted image 20260906224440.png]]
**Decryption Disabled**
![[Pasted image 20260906224525.png]]

## Applipedia
Applipedia is Palo Alto Networks' application database, working with App-ID to identify network traffic. It provides detailed application data to help administrators decide which applications to permit through the firewall.

**Common uses of Applipedia**
Applipedia enables users to verify App-ID support and research application details like dependencies, port usage, and classifications. Its data—including name, description, and dependencies—aids in policy decisions and understanding application behavior.

# Config App IDs and Dynamic Updates

Palo Alto Networks releases Applications and Threats updates with new signatures. Firewalls and Panorama can pull these directly, or Panorama can push them to managed firewalls, with options to manage new App-IDs.
- Its possible to auto tag Apps

**Device > Dynamic Updates** to view a list of the new and modified App-IDs that the update includes.

The Applications and Threats section tracks updates to signatures, decoders, and App-IDs. New App-IDs release monthly (third Tuesday), while other content updates more often. Weekly updates can be scheduled via the Schedule hyperlink.
**Action Column** - Install, review policy, view details etc.
![[Pasted image 20260906225148.png]]
## APP ID Filter
App-ID filters are based on app categories, subcategories, and other characteristics. For example, you can quickly create a dynamic list of the widely used business and collaboration tools, including such subcategories as instant messaging or office programs.
![[Pasted image 20260906225649.png]]

## Use Application Filters Based on Dynamic Tags
An App-ID filter is a mechanism that allows you to create a dynamic list of applications that address your needs. One of the ways to use this feature is to use it along with the App-ID tags.

Tags allow you to easily choose all existent and future App-IDs related to one or more specific characteristics. For example, the Enterprise VoIP tag unites all Voice-over-IP applications, including video and internet conferencing tools, that are widely spread in enterprise environments. Click the arrows for more information about the steps to create and dynamically apply the Enterprise VoIP tag.
![[Pasted image 20260906230645.png]]

## Policy Optimizer to Reduce the Attack Surface
After monitoring the application usage for a while, you can use the Policy Optimizer to choose only applications that have been seen on the firewall and then keep only those applications in the Security policy rule. Policy Optimizer allows you to narrow down the Security policy and reduce the potential attack surface.
![[Pasted image 20260906230953.png]]

# Migrate to App-Based Policies
This section explains how to migrate from a PORT  based FW policy to an App ID based security policy.
When combined with PORT restrictions, app-based rules also stop evasive apps from hiding on nonstandard ports.
![[Pasted image 20260906231324.png]]

## Policy Optimizer
The Policy Optimizer identifies overly broad application-based rules that allow unused apps, reducing attack surface and preventing malicious traffic.

## Moving to Application-Based Policies
One way to implement the migration method is to migrate an existing port-based policy to an application-based policy.
### Phase 1 - Identify legacy port rules
In Phase 1, you identify existing legacy port-based Security policy rules and determine which policy rules to convert and in which order. A gradual conversion is safer than migration of a large rulebase at one time and allows you to more easily ensure that new application-based rules control the necessary applications. The Policy Optimizer provides sorting options to help you prioritize which rules to convert or clean up.
### Phase 2 - Add App-based rule
In Phase 2, you use the Security Policy’s Policy Optimizer tool to add application-based rules to the Security policy. Add each new application-based rule above its corresponding port-based rule. The goal is to ensure that traffic matches the application-based rule before it can match the legacy port-based rule. Matching of traffic to a specific application reduces your attack surface.
### Phase 3 - Remove port-based rule
In Phase 3, Policy Optimizer reviews app usage and rule matches. Legacy rules with no traffic are removed; those with traffic are updated to app-based rules. This final cleanup minimizes attack surface by eliminating outdated rules.

## App-ID Based Policies
Dynamic application filters enforce security policies on app groups based on criteria like risk or type. They auto-update rules as new matching apps emerge, keeping policies current without manual intervention.
![[Pasted image 20260906232120.png]]