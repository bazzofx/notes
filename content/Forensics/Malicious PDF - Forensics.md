#forensics #MalwareAnalysis #pdf
This is a quick overview on some of the tools that can be used to help identify malicious .pdf files. For a more in-depth view please visit the reference links.
To understand how a .pdf files are composed red [lasb.segura unasmking pdf blog](https://labs.segura.blog/unmasking-the-threat-a-deep-dive-into-the-pdf-malicious-2/)

# Unmasking PDF Tools
## pdfid
This 
```bash
pdfid $pdf
```

Upon discovery the IDS of the pdf, we can use another tool to give an overview of it
## pdf-parser

### Check PDF status
```
pdf-parser.py -a $pdf
```

### Extract stream from pdf ID
```
.\pdf-parser.py -o 3 -f $pdf
```

##### Ref:
[lasb.secura](https://labs.segura.blog/unmasking-the-threat-a-deep-dive-into-the-pdf-malicious-2/)