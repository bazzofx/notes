

# Useful Links
- [Course link academy.attackiq.com](https://www.academy.attackiq.com/topics/mappings-format)
- [GitHub link Azure Security Mapping](https://github.com/bazzofx/azure-security-stack-mappings)
- [Main Website Attack Mapping Explorers](https://center-for-threat-informed-defense.github.io/mappings-explorer/)
**Regulated Body Website MITRE**

- [CTID - Center of Threat Infor and Defense](https://ctid.mitre.org/)
- [CTID - Blue Team Tools](https://ctid.mitre.org/tags/cyber-tools)
- 

# Purpose Security Mapping
Help Identify what security control we are using and what its controlling.

## How to use 

Download one of the .JSON to identify how much coverage one of these security control is providing us. 

1. Download a JSON from the [github layers](https://github.com/bazzofx/azure-security-stack-mappings/tree/main/mappings/Azure/layers)
2. Upload the JSON to [Attack Navigator](https://mitre-attack.github.io/attack-navigator/)
3. Identify how much coverage you are getting per security control

## Security Stacking
The main security stack is hosted on [github] however there is also an [official website]([https://ctid.mitre.org/](https://center-for-threat-informed-defense.github.io/mappings-explorer/))
### **Map ping Format**
![[Pasted image 20260912092036.png]]
### Mapping Fields
This is some of the important fields we should pay attention and will help us to map our security controls Identify what we are securing within our environment.
![[Pasted image 20260912092409.png]]

# Microsoft Azure Security Control Mappings to MITRE ATT&CK
These mappings of the Microsoft Azure Infrastructure as a Services (IaaS) security controls to MITRE ATT&CK® are designed to empower organizations with independent data on which native Azure security controls are most useful in defending against the adversary TTPs that they care about. These mappings are part of a collection of mappings of native product security controls to ATT&CK based on a common methodology, scoring rubric, data model, and tool set. This full set of resources is available on the Center’s project [Azure Security Control Stack Mapping](https://center-for-threat-informed-defense.github.io/security-stack-mappings/Azure/README.html).

# How to access and Scoring

- Important factors are the Coverage, what are we covering with this security control?
- When accessing an Attack check for its sub-technique first, then map it to a MITRE Tactic

**Coverage**
The important factor to consider when considering the overall score
If a control provides minimal, full or partial coverage
- Detect Score
	- Low uncertain detection
	- Medium High detection coverage,unknown accuracy
	- High detection coverage, low false positives
- Protect Score 
	- Low protect coverage
	- Medium high protect coverage, temporal,hours/days
	- High protect coverage, real-time-NRM
- Response Scoring
![[Pasted image 20260912102722.png]]

**Temporal**
Accesses how frequently the control operates
- real time
- periodical
- trigger by an external event?
**Accuracy**
- Assess the fidelity of the controls detection capability
- build-in intelligence = a low false positive rate
- artefacts/ behaviours that are detected do not appear frequently = low fidelity


### Scoring Rubric Example

We can see some of the examples from the **YAML** files from the github repo
![[Pasted image 20260912102924.png]]


## Intelligence Gathering
The research team has done an incredible job of outlining the methodology used to arrive at these mappings. You can review its description in detail in the [methodology section](https://github.com/center-for-threat-informed-defense/security-stack-mappings/blob/main/docs/mapping_methodology.md). The team has provided a quick at-a-glance summary graphic that you can review below:

## Steps to Create Rubric Control Review

![[Pasted image 20260912103123.png]]


## Python Mapping Tool
mappings_cli.py
Based on the available documentation for `mappings_cli.py`, the capabilities it provides are:

- **Validation subcommand**
- **Rebuild mappings subcommand**
- **List scores subcommand**
The **Find mappings subcommand** is not a listed capability; the tool instead provides a `list_mappings` subcommand for querying mapping files[](https://github.com/center-for-threat-informed-defense/security-stack-mappings/blob/20af57836269c3fce4fed47b538a2858514b544f/tools/README.md#1).
