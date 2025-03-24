

## What is InfoStealer
Its a malware family that will steal your cookies and passwords from the browser.
Infostealer can bypass MFA(Multi Factor Authentication) because it steal cookies from the browser.

## How do they infect the users?
>Usually infection will occur throuhg phishing links which will require user action to click on the malicious link.
>Malvertising hosted on websites, these bad adverts are hosted on a CDN(Content Delivery Network) over a not so known web hosting.

## Famous InfoStelaer
RedLiner
InfoStealer

## Information Captured
Location info
Harware ID
Passwords (Edge, Chrome, FireFox etc)
Process
Cookies
Discord
Azure tokens

## Tools: 
- https://beautifier.io/
- [jsnice.org](http:/jsnice.org)
- https://any.run/malware-trends/

## Process
Curl the javascript file
curl -L <website/file.js> -O

## Cyber Chef Recipe
1. JavaScript Beautifier
2. Syntax Highlighter
3. ReGex  **0x{[a-z]|0-9}{3,6}**


### CyberChef Regex
- Lookahead & Lookbehind
- Positive Lookbehind: (?<=foo)(.*)
Extract everything after ‘foo’ without including ‘foo’
- Positive Lookahead: ^.*(?=bar)
Extract everything before ‘bar’ without including ‘bar’
- Lookahead/behind Combo: (?<=')(.*?)(?=')
Extract everything between ‘ and ‘

---
#### CyberChefs Recipe:
```
Find_/_Replace({'option':'Regex','string':'\\\\x'},'',true,false,true,false)
Fork(',',',\\n',false)
From_Hex('Auto')
```

#### Exaple Obfuscated
```
var _0xf17f=["\x28","\x29","\x64\x69\x76","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x64","\x53\x74\x75\x64\x65\x6E\x74\x5F\x6E\x61\x6D\x65","\x73\x74\x75\x64\x65\x6E\x74\x5F\x64\x6F\x62","\x3C\x62\x3E\x49\x44\x3A\x3C\x2F\x62\x3E","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22\x2F\x6C\x65\x61\x72\x6E\x69\x6E\x67\x79\x69\x69\x2F\x69\x6E\x64\x65\x78\x2E\x70\x68\x70\x3F\x72\x3D\x73\x74\x75\x64\x65\x6E\x74\x2F\x76\x69\x65\x77\x26\x61\x6D\x70\x3B\x20\x69\x64\x3D","\x22\x3E","\x3C\x2F\x61\x3E","\x3C\x62\x72\x2F\x3E","\x3C\x62\x3E\x53\x74\x75\x64\x65\x6E\x74\x20\x4E\x61\x6D\x65\x3A\x3C\x2F\x62\x3E","\x3C\x62\x3E\x53\x74\x75\x64\x65\x6E\x74\x20\x44\x4F\x42\x3A\x3C\x2F\x62\x3E","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x63\x6C\x61\x73\x73","\x76\x69\x65\x77","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x70\x72\x65\x70\x65\x6E\x64","\x2E\x69\x74\x65\x6D\x73","\x66\x69\x6E\x64","\x23\x53\x74\x75\x64\x65\x6E\x74\x47\x72\x69\x64\x56\x69\x65\x77\x49\x64"];function call_func(_0x41dcx2){var _0x41dcx3=eval(_0xf17f[0]+_0x41dcx2+_0xf17f[1]);var _0x41dcx4=document[_0xf17f[3]](_0xf17f[2]);var _0x41dcx5=_0x41dcx3[_0xf17f[4]];var _0x41dcx6=_0x41dcx3[_0xf17f[5]];var _0x41dcx7=_0x41dcx3[_0xf17f[6]];var _0x41dcx8=_0xf17f[7];_0x41dcx8+=_0xf17f[8]+_0x41dcx5+_0xf17f[9]+_0x41dcx5+_0xf17f[10];_0x41dcx8+=_0xf17f[11];_0x41dcx8+=_0xf17f[12];_0x41dcx8+=_0x41dcx6;_0x41dcx8+=_0xf17f[11];_0x41dcx8+=_0xf17f[13];_0x41dcx8+=_0x41dcx7;_0x41dcx8+=_0xf17f[11];_0x41dcx4[_0xf17f[14]]=_0x41dcx8;_0x41dcx4[_0xf17f[17]](_0xf17f[15],_0xf17f[16]);$(_0xf17f[21])[_0xf17f[20]](_0xf17f[19])[_0xf17f[18]](_0x41dcx4);} ;
```


#### Example Extract:
```
"\x28","\x29","\x64\x69\x76","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x64","\x53\x74\x75\x64\x65\x6E\x74\x5F\x6E\x61\x6D\x65","\x73\x74\x75\x64\x65\x6E\x74\x5F\x64\x6F\x62","\x3C\x62\x3E\x49\x44\x3A\x3C\x2F\x62\x3E","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22\x2F\x6C\x65\x61\x72\x6E\x69\x6E\x67\x79\x69\x69\x2F\x69\x6E\x64\x65\x78\x2E\x70\x68\x70\x3F\x72\x3D\x73\x74\x75\x64\x65\x6E\x74\x2F\x76\x69\x65\x77\x26\x61\x6D\x70\x3B\x20\x69\x64\x3D","\x22\x3E","\x3C\x2F\x61\x3E","\x3C\x62\x72\x2F\x3E","\x3C\x62\x3E\x53\x74\x75\x64\x65\x6E\x74\x20\x4E\x61\x6D\x65\x3A\x3C\x2F\x62\x3E","\x3C\x62\x3E\x53\x74\x75\x64\x65\x6E\x74\x20\x44\x4F\x42\x3A\x3C\x2F\x62\x3E","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x63\x6C\x61\x73\x73","\x76\x69\x65\x77","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x70\x72\x65\x70\x65\x6E\x64","\x2E\x69\x74\x65\x6D\x73","\x66\x69\x6E\x64","\x23\x53\x74\x75\x64\x65\x6E\x74\x47\x72\x69\x64\x56\x69\x65\x77\x49\x64"
```

ref:

#### CyberChef Training Blog
[.embeeresearch.io](https://www.embeeresearch.io/advanced-cyberchef-techniques-defeating-nanocore-obfuscation-with-math-and-flow-control/)

#### Cyber Chef Recipes 
[benjitrapp.github.io](https://benjitrapp.github.io/defenses/2023-06-18-cyberchef-recipes-cheatsheet/#recipe-31---deobfuscate-encoded-strings-in-.net-binary)

[The Cyber Mentor](https://www.youtube.com/watch?v=ALZhG7Aa5Ec)
[CyberWox](https://www.youtube.com/watch?v=A0r6A7kWD58)
[PCAP InfoStealer Download Link](https://unit42.paloaltonetworks.com/wireshark-quiz-redline-stealer/)