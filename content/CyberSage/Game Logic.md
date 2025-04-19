### **Blue Team Actions:**

These are actions that the **Blue Team** can take in response to an attack.

- **Monitor Activity**: Track and analyze suspicious activity in real-time (effective with **Security Monitoring**).
    
- **Investigate Alert**: Analyze and verify alerts for signs of an attack (this helps with **Security Monitoring**).
    
- **Patch Vulnerability**: Apply security patches to vulnerable systems (effective against **Exploit Vulnerability** and **Privilege Escalation**).
    
- **Isolate System**: Disconnect compromised systems to prevent further spread of the attack (this can be done at the **Endpoint**, **Server**, or **Router** level).
    
- **Block Traffic**: Block specific types of traffic (useful when dealing with **Phishing** or **Port Scanning** via **Firewall**).
    
- **Wipe and Restore**: Remove malware and restore systems to a known good state (effective when dealing with **Execution** and **Persistence**).
    

---

### **Red Team Attacks:**

#### **1. Phishing Attack**

- **Description**: Social engineering attack where the attacker tricks the victim into revealing sensitive information (e.g., credentials).
    
- **Effective Defense**:
    
    - **Firewall**: Block phishing traffic from known malicious domains or IP addresses.
        
    - **Antivirus**: Detect malicious attachments or links embedded in the phishing email.
        
    - **Security Monitoring**: Detect suspicious patterns like bulk email senders or attempts to send out credentials.
        

#### **2. Port Scanning**

- **Description**: The attacker scans the network to identify open ports, services, and potential vulnerabilities.
    
- **Effective Defense**:
    
    - **Firewall**: Block unauthorized traffic, preventing the port scanner from reaching internal devices.
        
    - **Access Control**: Restrict unnecessary ports/services to minimize the attack surface.
        
    - **Security Monitoring**: Detect anomalous scanning behavior across the network and generate alerts.
        

#### **3. Exploit Vulnerability**

- **Description**: The attacker uses a known or zero-day vulnerability in a system (often through unpatched software) to gain unauthorized access.
    
- **Effective Defense**:
    
    - **Patch Management**: Keep systems updated with the latest security patches to mitigate vulnerabilities.
        
    - **Antivirus**: Detect and block attempts to exploit vulnerabilities via malware.
        
    - **Access Control**: Restrict the permissions on systems and services to limit what can be accessed.
        
    - **Firewall**: Block traffic attempting to exploit the system from known malicious IPs.
        

---

### **Attack and Defense Logic:**

Here’s how each **Red Team attack** matches with the **Blue Team defense**:

#### **Phishing Attack:**

1. **Red Team Action**: Send a phishing email to a user to steal credentials or deploy malware.
    
2. **Blue Team Response**:
    
    - **Monitor Activity**: Use **Security Monitoring** to track abnormal email activity.
        
    - **Block Traffic**: Use the **Firewall** to block traffic from known malicious domains or IPs.
        
    - **Investigate Alert**: If an alert is triggered, investigate and verify the phishing attempt.
        
    - **Wipe and Restore**: If a system is compromised, use **Antivirus** to remove malicious software or **Wipe and Restore** from a clean backup.
        

#### **Port Scanning:**

1. **Red Team Action**: Attempt to discover open ports and services on internal devices.
    
2. **Blue Team Response**:
    
    - **Monitor Activity**: **Security Monitoring** can detect the scanning behavior and trigger an alert.
        
    - **Block Traffic**: Use the **Firewall** to block the scanning attempts or restrict access to non-essential ports.
        
    - **Investigate Alert**: If an alert is triggered by the scanner, investigate to determine the source and nature of the scan.
        

#### **Exploit Vulnerability:**

1. **Red Team Action**: Exploit an unpatched vulnerability to gain access to a system.
    
2. **Blue Team Response**:
    
    - **Patch Vulnerability**: Use **Patch Management** to apply the latest security patches to the system.
        
    - **Monitor Activity**: Use **Security Monitoring** to detect unusual behavior or exploit attempts.
        
    - **Isolate System**: If the attack is successful, isolate the affected system to prevent lateral movement.
        

---

### **Summary of Attack and Defense Matchups:**

| **Red Team Attack**       | **Blue Team Defense Tool**                            | **Effective Action**                                  |
| ------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| **Phishing Attack**       | Firewall, Antivirus, Security Monitoring              | Block Traffic, Monitor Activity, Investigate Alert    |
| **Port Scanning**         | Firewall, Access Control, Security Monitoring         | Block Traffic, Monitor Activity, Investigate Alert    |
| **Exploit Vulnerability** | Patch Management, Antivirus, Firewall, Access Control | Patch Vulnerability, Monitor Activity, Isolate System |


|Blue Teams Defense| Tactic|
|---------------------|----------|
|Monitor Activity |Track and analyze Suspicious activity in real-time |
|Investigate Alert |Analyze logs and the alert further|
|Patch Vulnerabilities |Apply security patches to |
|Isolate System | Quarantine the System from network Traffic|
|Completely wipe | and restore the affected system|





2nd Stage
Deploy Malware
Command Shell
Script Execution

3rd Stage
Install Backdoor
Create Account
Modify Startup

4th Stage
Exploit Admin
Bypass UAC
Steal Token

5th Stage
Disable Security
Code Obfuscation
Clear logs

6th Stage 
LAteral Movement
Remote Services
Internal Scanning

Data collection
Screen capture
Keylogging


Options:
Monitor Activity
Investigate Alert
Patch Vulnerabilities
Isolate System
Block Traffic
Wipe Restore

If Investigate alert successful reveal extra options to response


If Red Team targets a device that is not protected no logs are generated to the Blue Team only the log "Nothing is happening, business as usual"

If the Blue Team choose to Monitor Activity then reveals which server it was previously attacked by the Red Team

Port scanning should always be an option for Red Team

Blue Team needs to select the correct device which the Red Team attacked and choose the correct mitigation against the attack in order to prevent it.
Lateral movement should always become an option after KillChain 2nd stage


if server is brought offline decrease time by 100 seconds, however if a red team is on stage 3 or more on a server that is brought offline kill chain attack goes back to 1

This logic helps guide the **Blue Team's** responses based on the type of attack the **Red Team** executes. By using the right defense tools at the right time, the Blue Team can successfully mitigate or prevent attacks.