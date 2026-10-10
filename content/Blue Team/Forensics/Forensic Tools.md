
## AmcacheParse

C:\Windows\appcompat\Programs\
`-Shimcache`
Evidence of execution of programs
Includes applications and other executables ran on computer
By default, AmcacheParse only export ‘uncommon’ file entries
Can dump associate and programs using **-i**
Whitelist/Blacklist based on SHA-1 to filter the output when running the command

Save the hashes into a file and use together with Amcache
youtube.com/watch?v=iTchBtRr6TA

## AppCompactCacheParser

Pulls data from all available controlSets
Can extract from live or offline hive
date is not last time it was ran, but it was last time it was modified
Just because the record is on CompactCache does not mean it was ran

## PECmd

`-Prefetch`

Win10 prefetch is compressed, PECmd need to run on Win8+ or better
Automatically highlights Temp and tmp, but add more via **-k**
For full details, export as json
CSV export generates fully detailed file and mini timeline(2 files)

## Bstrings
```
--lr ‘regular expression match’

--ls ‘regular string’


bstrings.exe -f <file> --lr ‘regex pattern’

bstrings -p = check regex patterns
```

I can create my own pattern and pass as a file using -fr
Find what machines a user has interacted with

`bstrings .\NTUSER.DAT --lr unc`

Some strings we find might be ROT13 encoded

# Document Creation and opening tools

## LECmd

Lnk parsing tool
Full decoding of target list , similar to ShellBags Explorer
Does additional things like MAC vendor lookup
**Link File Structure (.lnk)**
Header
Data sections(1 or more) defined in data flags in header

**Data Sections**

Target ID list,Name, Relative path,Argument,IsUnicode

## JLECmd
Jump list parsting tool
Custom destination - Concatenated collection of .lnk blobs
Automatic - OLECF container which contains .lnk blobs