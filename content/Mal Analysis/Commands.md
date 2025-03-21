#### Show List Executables and paths
```
wmic process get Name,ProcessID,CommandLine,ExecutablePath /FORMAT:List
```