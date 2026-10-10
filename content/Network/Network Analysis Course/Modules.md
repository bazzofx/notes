### What is Network Analysis
Network Analysis is the process of analyse connections, or packets that are malicious and could be Dimed as suspicious.

### Where to download sample data
- [Malware Traffic Analysis](https://www.malware-traffic-analysis.net/)
- [Malpedia](https://malpedia.caad.fkie.fraunhofer.de/details/win.valley_rat)
### Tools used for Network Analysis
For this method we will be using tool call ZUI (From Zeek UI) and Wireshark
- [Download ZUI](https://zui.brimdata.io/docs/Installation) (ZUI is a combination of Zeek and Suricata Signatures)
- [Download Wireshark](https://www.wireshark.org/)

### Network Tools Information
#### ZUI - Zed User Interface
**TLD'R**:
While **Zeek** acts as the generator of network data, **Zed** acts as the engine used to query, search, and analyse that data 
##### ZED
Data Analysis / Query Engine & Data Model Ingests, archives, and provides a powerful pipeline query language to search through large datasets like Zeek logs. CLI tool (`zq`) and natively powers the **Zui** (formerly Brim) desktop analytics GUI.
##### Zeek
[Zeek](https://zeek.org/get-zeek/)  is not an active defence mechanism. Instead, it operates quietly on a sensor—whether hardware, software, virtual, or cloud-based—analysing network traffic in real-time.
Zeek captures high-fidelity transaction logs, file contents, and customizable data outputs, which are ideal for manual review or integration into SIEM systems for security analysts. 
Command Line Interface (CLI) or integrated into SIEMs/platforms like [Security Onion](https://zeek.org/2026/01/3-ways-to-integrate-zeek-with-your-security-stack/).
##### ZUI
Powered by [Zed language](https://zui.brimdata.io/) a system for managing, storing, and processing data. It's a **superset** of both schema-defined **tables**, and **unstructured documents**; an emerging concept we call [super-structured data](https://zed.brimdata.io/docs/formats#2-zed-a-super-structured-pattern). 

The [storage layer](https://zed.brimdata.io/docs/formats), [type system](https://zed.brimdata.io/docs/formats/zed), [query language](https://zed.brimdata.io/docs/language/overview), and [zq](https://zed.brimdata.io/docs/commands/zq) command-line utility are just a few of the tools Zed offers to the data community.
>[!Note]
>To search on ZUI we will use the `zq` language reference 
>https://zed.brimdata.io/docs/commands/zq

### How to Identify malicious traffic
- Check for `uid` as it links all protocol activity under one connection
- When examining the logs, check if the `filename` match the `mime_type`. example below we see .gif images but mime_type show executables, suspicious!
	- ![[Pasted image 20261005220718.png]]
- Check for `client_headers`, `user_agent` and `uri`
- pivot to responding fileUI `resp_fuids` when necessary
### Videos Rerefence for Zeek
- [Suricata + Zeek: How it works](https://www.youtube.com/watch?v=aqTHGRUEYgM)
- [ZUI Package Captures](https://www.youtube.com/watch?v=eMzljqxASVA)
- [ZUI Brim Demo](https://www.youtube.com/watch?v=InT-7WZ5Y2Y)
- [Is Wird really weird?](https://www.youtube.com/watch?v=XeJcBBZjaVA)

### Wireshark Training
[SharkFest Windows Malware Traffic Analysis](https://www.malware-traffic-analysis.net/2019/sharkfest/index.html)

### TShark Cheat Sheet
```bash
tshark -r <pcap> -E separator="," -T fields -e ip.src -e http.request.full_uri -e http.user_agent
```
