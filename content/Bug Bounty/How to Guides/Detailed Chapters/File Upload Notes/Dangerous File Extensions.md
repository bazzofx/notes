[[How to File Upload]]
### 🎯 Core List of Potentially Dangerous File Extensions

The table below lists file extensions that have the potential to be executed as code on a server if uploaded. Your goal is to see if the application can block or correctly handle these.

|Category|Example Extensions|Purpose/Server Technology|
|---|---|---|
|**Common Server-Side Scripts**|`.php`, `.jsp`, `.asp`, `.aspx`, `.asmx`, `.cer`, `.asax`, `.ascx`|Classic targets for web shell uploads.|
|**Alternative PHP Extensions**[](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)|`.php5`, `.pht`, `.phtml`, `.phar`, `.phps`|Used to bypass filters that only block `.php`.|
|**Server-Side Includes (SSI)**|`.shtml`, `.shtm`, `.stm`|Can allow command execution if enabled on the server.|
|**Perl / CGI Scripts**|`.pl`, `.cgi`, `.dll`|May execute commands on the server.|
|**Configuration Files**|`.asa`, `.inc`, `.config`|May leak sensitive data like credentials if served as text[](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/03-Test_File_Extensions_Handling_for_Sensitive_Information)[](https://owasp.org/www-project-web-security-testing-guide/stable/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/03-Test_File_Extensions_Handling_for_Sensitive_Information).|
|**Archive Files**|`.zip`, `.rar`, `.tar`, `.gz`, `.jar`|Can contain malicious scripts, used for zip bomb attacks[](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)[](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/03-Test_File_Extensions_Handling_for_Sensitive_Information)[](https://owasp.org/www-project-web-security-testing-guide/stable/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/03-Test_File_Extensions_Handling_for_Sensitive_Information).|

### 🔬 Advanced Test Cases for Bypassing Validation

A simple blacklist is easily bypassed. Here are specific techniques, many detailed in OWASP resources, to test the robustness of the validation logic[](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)[](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload):

|Bypass Technique|Test Case Example|Expected Application Behavior|
|---|---|---|
|**Double Extension**[](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)[](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)|`webshell.php.jpg`, `test.png.php`|Should reject file; may be incorrectly parsed as image.|
|**Trailing Characters**[](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)|`webshell.php.` (dot), `webshell.php` (space)|Should sanitize name, not treat as `.php`.|
|**URL Encoding**[](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)|`webshell%2Ephp` (`.` encoded), `webshell.asp%00.jpg` (null byte)|Should decode before validation, block null bytes.|
|**Case Insensitivity**[](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)|`webshell.PHP`, `webshell.PhP`, `WEBSHELL.asp`|Should block regardless of case.|
|**Semicolon (IIS)**[](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)|`webshell.asp;.jpg`|Should reject; IIS6 might treat as `.asp`.|
|**Path/Extension Manipulation**[](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)|`folder.asp/webshell.txt`, `webshell.png/.php`|Should reject files in directories named like scripts.|
|**Overlong Filename (DoS)**[](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)|Extremely long, random filename|Should enforce reasonable length limit.|

### 📝 Testing Methodology & Key Resources

To use these lists effectively in your assessment:

1. **Systematic Testing**: Start with the core list. If blocked, move to the advanced bypass techniques. Use tools like Burp Suite Repeater to manually manipulate upload requests[ref](https://portswigger.net/web-security/file-upload).
    
2. **Check Server Response**: Always review the server's response headers and body. A successful upload doesn't guarantee execution; you must verify if the file is stored with its original name, placed within the web root, and if the server is configured to execute it[ref](https://portswigger.net/web-security/file-upload).
    
3. **Follow Authoritative Guides**: These lists are derived from trusted security resources. You should consult them for deeper context:
    
    - **OWASP WSTG "Test File Extensions Handling"**: Provides methodology for testing extension handling and lists risky extensions[ref](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/03-Test_File_Extensions_Handling_for_Sensitive_Information)[ref](https://owasp.org/www-project-web-security-testing-guide/stable/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/03-Test_File_Extensions_Handling_for_Sensitive_Information).
        
    - **OWASP File Upload Cheat Sheet**: Details comprehensive protections and common bypasses (e.g., double extensions, null bytes)[ref](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html).
        
    - **PortSwigger Web Security Academy**: Offers excellent, practical tutorials and labs on exploiting file upload vulnerabilities[ref](https://portswigger.net/web-security/file-upload).
        
    - **OWASP "Unrestricted File Upload"**: A comprehensive list of weak protections and specific bypass methods[ref](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload).