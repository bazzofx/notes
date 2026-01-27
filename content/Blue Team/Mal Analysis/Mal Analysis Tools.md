#MalwareAnalysis #tools #activity #monitor

Below is a small list of tools that can be used for malware analysis to understand what they are doing in the system.
## ProcessActivity
[Download link from Nirsoft](https://www.nirsoft.net/utils/process_activity_view.html)
ProcessActivityView creates a summary of all files and folders that the selected process tries to access. For each file that the process access, the following information is displayed: Number of times that the file was opened and closed, number of read/write calls, total number of read/write bytes, the dll that made the last open-file call, and more..
![[Pasted image 20250320022547.png]]

|   |   |
|---|---|
|/RunProcess <exe filename>|Run the specified process|
|/ProcessParams <parameters>|Specify parameters for the process that you run with /RunProcess.|
|/StartImmediately <0 \| 1>|Specify the "Start Immediately" value (0 or 1).|
```
ProcessActivty.exe /RunProcess mal.exe
```


## OpenedFilesView
[Download link from Nirsoft](https://www.nirsoft.net/utils/opened_files_view.html)
Display open files on the system, information on handle, read/write/delete access/process that opened it

![[Pasted image 20250320022117.png]]

|                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /filefilter FileName     | Start OpenedFilesView with file/folder filter. If you specify a file, only the opened handles for the specified file will be displayed. If you specify a folder, all the opened files under the specified folder will be displayed.<br><br>For example, if you want to view all opened files under c:\Program Files :  <br>OpenedFilesView.exe /filefilter "C:\Program Files"  <br>If you want to view all opened files with 'index.dat' filename:  <br>OpenedFilesView.exe /filefilter "index.dat" |
| /wildcardfilter FileName | Start OpenedFilesView with the specified wildcard filter.<br><br>For example, if you want to view only .txt files:  <br>OpenedFilesView.exe /wildcardfilter *.txt                                                                                                                                                                                                                                                                                                                                   |
| /processfilter FileName  | Start OpenedFilesView with process filter. When you use this filter, only the files opened by the specified process will be displayed. You can specify the full path of the process file, or only the filename without path.<br><br>For example:  <br>OpenedFilesView.exe /processfilter "F:\Program Files\Mozilla Firefox\firefox.exe"  <br>OpenedFilesView.exe /processfilter myapp.exe                                                                                                           |
```
OpenedActivityView /processfilter mal.exe
```