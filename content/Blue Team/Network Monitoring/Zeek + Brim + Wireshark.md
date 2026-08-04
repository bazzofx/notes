Traffic analysis using open source tools
- [Zeek](https://zeek.org/) + [BZAR](https://github.com/mitre-attack/bzar)
- [Zui or Brim)](https://www.brimdata.io/download/)
- [LogTap Blog](https://shinkensec.com/2025/05/28/log-analysis-made-easy-the-swiss-army-knife-for-logs-logtap/)
- Wireshark
- Hayabusa
- ChainSaw
- [TCPReplay](https://tcpreplay.appneta.com/guides/)
- [NetCap](https://try.netcap.io/)
- [EtherApe CLI ](https://manpages.debian.org/unstable/etherape/etherape.1.en.html)
- [Security Onion](https://gitnux.org/best/network-spy-software/#review-7)

## Useful Links
- [Seek Presentation Slides](https://docs.google.com/presentation/d/14p99FdWe-o8Le-K9f4OV-dYwYF4v4sr59vpI8WWfDeI/edit?slide=id.g12925a13aa0_1_70#slide=id.g12925a13aa0_1_70)
- [Try Zeek .Org](https://try.zeek.org/#/?example=hello)
- [Zeek BZAR - Helps with SMB Traffic](https://github.com/mitre-attack/bzar)
- [Malware Analysis PCAP Downloads](https://malware-traffic-analysis.net/)
## What is Zeek
Zeek is an Open Source network packet analysis. It analyse captures using Suricata rules + Zeek engine.
>NOTE
 Zeek now factors in VLAN tags into the connection tracking. To switch to VLAN-aware connection tracking: [@load](https://github.com/load) frameworks/conn_key/vlan_fivetuple

## Zeek Pipeline
![[Pasted image 20260724220536.png]]
## Installing Zeek
```
# Grab the latest Zeek LTS image from https://hub.docker.com/u/zeek

docker pull zeek/zeek:lts
docker run -it zeek/zeek:lts /bin/bash

# Inside the container, set up resources used during this training:  

git clone https://github.com/zeek/zeek-training.git
cd zeek-training/Intro-to-Zeek/training-res
./setup.sh

#To run additional shells in the container:

docker exec -it <container name> /bin/bash

#Verify its working
zeek --version

```

## Best Place to Place the Zeek Sensor
We want to put the sensor before NAT is applied, so we can have visibility of the true IP Src/Dst
[Reference Video](https://www.youtube.com/watch?v=t-RlOSGsxhs)
![[Pasted image 20260725134722.png]]

---

# ZUI

### Default Queries.JSON
Import the below using the "Big Blue Button" inside ZUI
more info about ZUI queries [can be found on its github](https://github.com/brimdata/brimcap#brimcap-queries)

>NOTE
>ZUI works with `SUPERSQL` behind the scenes which is also developed by team behind ZUI
>Syntax for search [can be found on this link](https://superdb.org/super-sql/expressions/logic.html)
![[Pasted image 20260724231856.png]]
```json
{
  "name": "Brimcap",
  "items": [
    {
      "name": "Activity Overview",
      "value": "count() by _path | sort -r",
      "description": "Shows a list of all Zeek streams in the data set, with a count of associated records"
    },
    {
      "name": "Unique DNS Queries",
      "value": "_path==\"dns\" | count() by query | sort -r",
      "description": "Shows all unique DNS queries in the data set with count"
    },
    {
      "name": "Top Domains",
      "value": "_path==\"dns\" | count() by domain:=join(split(query,\".\")[-2:],\".\") | sort -r",
      "description": "Displays the domains appearing most frequently in DNS queries"
    },
    {
      "name": "Windows Networking Activity",
      "value": "grep(smb*,_path) OR _path==\"dce_rpc\"",
      "description": "Filters and displays smb_files, smb_mapping and DCE_RPC activity"
    },
    {
      "name": "HTTP Requests",
      "value": "_path==\"http\" | cut id.orig_h, id.resp_h, id.resp_p, method, host, uri | uniq -c",
      "description": "Displays a list of the count of unique HTTP requests including source and destination"
    },
    {
      "name": "Unique Network Connections",
      "value": "_path==\"conn\" | cut id.orig_h, id.resp_p, id.resp_h | sort | uniq",
      "description": "Displays a table showing all unique source:port:destination connections pairings"
    },
    {
      "name": "Connection Received Data",
      "value": "_path==\"conn\" | put total_bytes := orig_bytes + resp_bytes | sort -r total_bytes | cut uid, id, orig_bytes, resp_bytes, total_bytes",
      "description": "Shows the connections between hosts, sorted by data received"
    },
    {
      "name": "File Activity",
      "value": "filename!=null | cut _path, tx_hosts, rx_hosts, conn_uids, mime_type, filename, md5, sha1",
      "description": "Displays a curated view of file data including md5 and sha1 for complete file transfers"
    },
    {
      "name": "HTTP Post Requests",
      "value": "method==\"POST\" | cut ts, uid, id, method, uri, status_code",
      "description": "Displays all HTTP Post requests including the URI and HTTP status code"
    },
    {
      "name": "Show IP Subnets",
      "value": "_path==\"conn\" | put classnet := network_of(id.resp_h) | cut classnet | count() by classnet | sort -r",
      "description": "Enumerates the classful networks for all destination IP addresses including count of connections"
    },
    {
      "name": "Suricata Alerts by Severity and Category",
      "value": "event_type==\"alert\" | count() by alert.severity,alert.category | sort count",
      "description": "Shows all Suricata alert counts, grouped by category and severity"
    },
    {
      "name": "Suricata Alerts by Signature",
      "value": "event_type==\"alert\" | count() by alert.signature | sort count",
      "description": "Shows all Suricata alert counts, grouped by signature"
    },
    {
      "name": "Suricata Alert Categories by Source and Destination",
      "value": "event_type==\"alert\" | alerts := union(alert.category) by src_ip, dest_ip",
      "description": "Shows a list of Suricata alert categories, grouped by unique source and destination IP addresses"
    },
    {
      "name": "Suricata Alert Signatures by Source and Destination",
      "value": "event_type==\"alert\" | alerts := union(alert.signature) by src_ip, dest_ip",
      "description": "Shows a list of Suricata alert signatures, grouped by unique source and destination IP addresses"
    },
    {
      "name": "Suricata Alert Categories by Subnet",
      "value": "event_type==\"alert\" | alerts := union(alert.category) by network_of(dest_ip)",
      "description": "Shows a list of Suricata alert categories, grouped by CIDR network"
    },
    {
      "name": "Suricata Alert Signatures by Subnet",
      "value": "event_type==\"alert\" | alerts := union(alert.signature) by network_of(dest_ip)",
      "description": "Shows a list of Suricata alert signatures, grouped by CIDR network"
    }
  ]
}
```