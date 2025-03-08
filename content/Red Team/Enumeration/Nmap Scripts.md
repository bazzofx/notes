# Top 10 Nmap Scripts

Let’s look at the top 10 useful Nmap scripts. I’ll walk you through each script, explain what it does, and show you how to use it.

## Http-Enum

The `http-enum` script helps to find directories, files, and services on an HTTP server. This can reveal its structure and potential weaknesses.

```
nmap --script=http-enum -p 80 <target-ip>
```

This script will scan the web server on port 80 (or a specified port). It will list common directories and files, like `/admin` and `/login`.

Knowing the paths to these resources can help you find misconfigured access controls or unprotected files.

## FTP-Anon

The `ftp-anon` script checks if an FTP server allows anonymous login. Anonymous FTP access can allow unwanted file downloads or uploads. So, this script is a good way to find vulnerabilities in your FTP setup.

```
nmap --script=ftp-anon -p 21 <target-ip>
```

This script attempts to log in as an anonymous user on the target FTP server. If successful, it lists accessible files and directories, helping you determine if any sensitive information is exposed.

## SMB-OS-Discovery

For scanning Windows machines, the `smb-os-discovery` script is a must. This script uses the SMB protocol to get details about the OS, including its version, build, and domain.

```
nmap --script=smb-os-discovery -p 445 <target-ip>
```

The script connects to the SMB service on the target and retrieves OS information. This can help you quickly identify the Windows version and other details about the server.

## Vulners

The `vulners` script taps into the [Vulners database](https://vulners.com/) to check if the target system has any known vulnerabilities. This script is extremely helpful for identifying potential security issues without needing a full vulnerability scanner.

```
nmap --script=vulners <target-ip>
```

This command will check the target’s open ports and services against the Vulners vulnerability database. It then lists potential vulnerabilities with CVE IDs. Use them to find and patch weaknesses in your network.

## HTTP-Headers

If you’re working with web applications, the `http-headers` script can give you quick insight into HTTP security settings. This script retrieves HTTP headers from the target server and displays them in the output.

```
nmap --script=http-headers -p 80 <target-ip>
```

The script lists HTTP headers, like `X-Frame-Options`, `X-XSS-Protection`, and `Content-Security-Policy`. These headers can help prevent security issues such as cross-site scripting (XSS) and clickjacking. By checking these headers, you can see if the web server is properly configured for security.

## SSH-Brute

To test SSH security, the `ssh-brute` script will try to log in using a list of common username-password combos. This script is useful for testing SSH password policies and identifying weak credentials.

```
nmap --script=ssh-brute -p 22 <target-ip>
```

The script tries different username-password combinations on the SSH server. If successful, it will display the correct credentials.

## DNS-Brute

The `dns-brute` script performs DNS enumeration by brute-forcing subdomains, which can reveal hidden parts of an organization’s infrastructure. This is especially useful when mapping large networks with multiple subdomains.

```
nmap --script=dns-brute <target-domain>
```

The script attempts to resolve a list of common subdomains, such as `mail`, `ftp`, and `www`. This can reveal subdomains that aren’t listed in public records, helping you to gain a fuller picture of an organization’s network layout.

## SSL-Cert

The `ssl-cert` script retrieves an SSL certificate from an HTTPS service, providing details like the issuer, subject, and validity period. This script is useful for checking certificate configurations and ensuring SSL/TLS security.

```
nmap --script=ssl-cert -p 443 <target-ip>
```

The script connects to the target server and retrieves its SSL certificate information. This helps you check if a certificate is close to expiring, is self-signed, or has an untrusted issuer, all of which can indicate potential security risks.

## SMTP-Enum-Users

If you’re auditing an email server, the `smtp-enum-users` script can help you identify valid email addresses. This script tries common SMTP commands to find users, which can expose weak spots in email server security.

```
nmap --script=smtp-enum-users -p 25 <target-ip>
```

The script tries to verify user accounts on the SMTP server by issuing commands like `VRFY` and `EXPN`. If successful, this can give an attacker a list of valid usernames, so running this script helps you spot potential leaks in your SMTP setup.

## MysQl-Info

The `mysql-info` script is designed for MySQL databases. It gathers information about the MySQL server version. This can help you assess its security.

```
nmap --script=mysql-info -p 3306 <target-ip>
```

The script connects to the target’s MySQL server and retrieves version information and some basic server details. This can help you check if the server is outdated or insecure. Older MySQL versions may have unpatched vulnerabilities.