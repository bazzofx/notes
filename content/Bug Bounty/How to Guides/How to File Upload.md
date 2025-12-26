# File Upload - Attack Summary
| Flaws                                   | Attack                                                                                                                                   |     |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --- |
| Unrestricted file extension upload      | upload of exe.php or any other type that can execute code, ie:.exe, .js, .jsp, .py                                                       |     |
| Flawed type validation                  | Pretend to be different Content-Type, request can pretend to be from a different MIME type                                               |     |
| Folder restriction Upload               | Upload the file to a different folder using **../** pay attention if the value is been decoded by the server also, ie: **..%2f**         |     |
| Insufficient blacklisting of file types | Blacklist a few extensions but not others, ie: **.php5 or .shtml5**                                                                      |     |
| Upload our own config file              | Uploading our own .htaccess(Apache) or web.config(IIS), so we can enable our custom file extension                                       |     |
| Obfuscating file extensions             | Exploit.p.phphp, Exploit.php.jpg, exploit%2Ephp, exploit.asp%00.jpg [[How to File Upload]]                                               |     |
| Flaw validation of Content-Type         | Use a polygloth attack to make a file look like a different file type [[Creating Polyglot Files]]                                        |     |
| Exploit file upload Race Condition      | Send two or more request in quick successions, Post/Get before server AV deletes the file [[Exploiting File Upload and Race Conditions]] |     |
| Upload client-side scripts .js .html .svg| We can potentially create stored XSS on the server if we can upload these files. Due to same-origin policy restrictions, these kinds of attacks will only work if the uploaded file is served from the same origin to which you upload it|
| Vuln on parse uploaded files            |  For example, you know that the server parses XML-based files, such as Microsoft Office `.doc` or `.xls` files, this may be a potential vector for XXE injection attacks.|
| Uploading files using PUT               | Check [Test HTTP Method](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/06-Test_HTTP_Methods) on OWASP Website. You can try sending `OPTIONS` requests to different endpoints to test for any that advertise support for the `PUT` method. |


![[Pasted image 20251223174936.png]]

### Open Permissions Folder Linux
- /tmp/
- /dev/shm/
- /var/tmp


## Special Server Configs Apache and IIS Servers
### Apache
 If Apache server try upload a file called ==.htaccess== this allows will load a directory-specific configuration from a file called `.htaccess` if one is present.
	- ```text
	  AddType application/x-httpd-php .php
	  ```
  ### IIS Server
If ISS Servers try upload a file called ==web.config== file. This might include directives such as the following, which in this case allows JSON files to be served to users
	- ```xml
	  <staticContent> <mimeMap fileExtension=".json" mimeType="application/json" /> </staticContent>
	  ```

## Attacks to try
- Try uploading another  file format ie:.**exe.php**
- Check if we can upload and path transversal at the same time with **"../"**
- Common path transversal technique also **'...///'** Some server may restrict execution on the folder its uploaded, but if we can control the location using path transversal we can get RCE.
- We can embed a malicious payload inside an image, and sometimes the server will execute  it. View the image to verify.
- Websites often validate file uploads by checking whether the Content-Type header matches the expected MIME type.


# PHP Payload
- If a PHP application return a SQL error, we have SQL injection,  if return an SH error we have sh command injection
### Common php test commands
```php
<?php echo system($_GET['command']); ?>
<?php system($_REQUEST[cmd]); ?>
<?php echo file_get_contents('/path/to/target/file'); ?>

```

# How to prevent file upload vulnerabilities

### Defences Best Practices
>Allowing users to upload files is commonplace and doesn't have to be dangerous as long as you take the right precautions. In general, the most effective way to protect your own websites from these vulnerabilities is to implement all of the following practices:

- Check the file extension against a whitelist of permitted extensions rather than a blacklist of prohibited ones. It's much easier to guess which extensions you might want to allow than it is to guess which ones an attacker might try to upload.
- Make sure the filename doesn't contain any substrings that may be interpreted as a directory or a traversal sequence (`../`).
- Rename uploaded files to avoid collisions that may cause existing files to be overwritten.
- Do not upload files to the server's permanent filesystem until they have been fully validated.
- As much as possible, use an established framework for preprocessing file uploads rather than attempting to write your own validation mechanisms.
