
# Issue
The agent is unable to connect to agent-comm.workload.de-1.cloudone.trendmicro.com  

```
 agent-comm.workload.de-1.cloudone.trendmicro.com  
```

# Objective
Test connectivity to url
Find Root Cause of failure

# Investigating CRL

First thing is to identify if the server is connected to the internet.
This server is isolated from the internet and looks to be using a proxy to connect out. 

This server connects using a proxy, while attempting to connect to the url using the proxy we can see the error

```bash
curl -x $proxy:$port -IL trendmicro.com
```

![[Pasted image 20260710235141.png]]

## Explaining Errror

>[ERROR]
>CRYPT_E_REVOCATION_OFFLINE (0x80092013)
The revocation function was unable to check revocation because the revocation server was offline 



Windows `curl` uses **SChannel** (the Windows TLS stack). Before completing the SSL handshake, SChannel attempts to check whether any certificate in the chain has been revoked by contacting the CA's:

- CRL (Certificate Revocation List) endpoint
- OCSP responder
- 
So the proxy is working for the target site.

However, SChannel may be trying to retrieve CRLs from URLs embedded in the certificate chain, such as:
```bash
http://crl3.digicert.com/...
http://crl4.digicert.com/...
http://ocsp.digicert.com/...
```
If the server cannot reach those URLs, revocation checking fails.

## How to confirm
We can use `certutil` tool to verify the chain of a certificate. 
First we will need to download the certificate itself, so we will need to visit the url on a machine where the connection is working and download the certificate.
![[Pasted image 20260711000822.png]]

Once we have the certificate bring to the server and lets run the command below to test

We are also outputing the result into a file so we can save the result for later.
This will show exactly which CRL or OCSP URLs are failing.

```bash
certutil -urlcache * delete # To remove any stale records
certutil -verify -urlfetch <certificate.cer> > file.txt
```
You can also view the server certificate:
```bash
openssl s_client -connect agent-comm.workload.de-1.cloudone.trendmicro.com:443
```

The result of our certutil command show the below urls are not accessible
![[Pasted image 20260711001226.png]]
```
http://crt.rootca1.amazontrust.com/rootca1.cer
http://crl.rootca1.amazontrust.com/rootca1.crl
http://ocsp.rootca1.amazontrust.com
```

In Contrast output the same command on a working server shows
```
[redacted]..
  ----------------  Certificate AIA  ----------------
  Verified "Certificate (0)" Time: 0 06b25927c42a721631c1efd9431e648fa62e1e39
    [0.0] http://crt.rootca1.amazontrust.com/rootca1.cer

  ----------------  Certificate CDP  ----------------
  Verified "Base CRL (1f)" Time: 0 d088c6cba4fb0ba76dd092b240de9150250e33e1
    [0.0] http://crl.rootca1.amazontrust.com/rootca1.crl

  ----------------  Base CRL CDP  ----------------
  No URLs "None" Time: 0 (null)
  ----------------  Certificate OCSP  ----------------
  Verified "OCSP" Time: 0 b01c1c1943c8b0588d6336897af06770149bba2c
    [0.0] http://ocsp.rootca1.amazontrust.com

  --------------------------------
  [redacted]
```

## Quick Curl Test
```bash
curl --ssl-no-revoke -v https://agent-comm.workload.de-1.cloudone.trendmicro.com
```

## Testing 2nd Method
```bash
certutil -URL https://agent-comm.workload.de-1.cloudone.trendmicro.com
```
Here we will get a new dialog box that we can use to test connection to individual servers.
We will need to add the `url.cer` we downloaded from the previous step in order to verify it.

The example below it shows a Failed response
![[Pasted image 20260711002140.png]]

The example B shows a successful response.
The Failed within the first request is expected
![[Pasted image 20260711002301.png]]

I

## Possible Issue SSL Inspection
SSL inspection is common on work environment and is been done to help decrypt traffic to monitor traffic for suspicious signs of malicious activity. However, sometimes this inspection breaks things like if a server is expected one CA but instead the traffic got re-encrypted with the AntiVirus CA.

### Troubleshooting SSL Inspection 
We can use some of the commands above, but the below also works to view the text content of a certificate run

```bash
certutil -dump $url.cer
```

For this lets inspect the 
```
Subject:
Issuer:
```

If we see `Issuer: DigiCert ...` then SSL inspection is not intercepting this traffic.
However, if we see.
```bash
Issuer:
    CN=Trend Micro Web Security Cloud Default CA
    OU=TMWS
    O=Trend Micro
    S=CA
    C=US
```
Then the proxy is intercepting it and the revocation failure is likely against your internal PKI and we need to bypass the website.
### Results Confirming if url is been SSL Inspected
![[Pasted image 20260711005000.png]]


## Bypassing SSL Inspection | Interesting findings

Even though we have a .PAC file explicit configuring our browser settings.
Powershell `TcpClient` completely bypass Windows proxy settings by default.
So when we craft a command like the below we will bypass the SSL Inspection from our .PAC file


```powershell
function checkBypass($url){$t=[Net.Sockets.TcpClient]::new($url,443); $s=[Net.Security.SslStream]::new($t.GetStream()); $s.AuthenticateAsClient($url); Write-Host "ISSUER: "
$s.RemoteCertificate.Issuer; 
$s.RemoteCertificate.Subject; 
$t.Close()}
#Running the function with
checkBypass -url bbc.co.uk
```

### Explaining in detail Net.Socket and Test-NetConnection
Under the hood, `Test-NetConnection` and `System.Net.Sockets.TcpClient` both use the same core .NET socket classes to perform a Layer 4 TCP three-way handshake (SYN, SYN-ACK, ACK). However, they handle network routing and corporate proxies entirely differently.

`Test-NetConnection` automatically resolves system proxy settings, meaning it works seamlessly with **PAC (Proxy Auto-Config) files** and explicit proxies. When you test port 443, it connects to your proxy server instead of the actual destination, resulting in `TcpTestSucceeded : True`. Because it drops the connection the millisecond the TCP handshake completes, it never initiates the TLS handshake and cannot see SSL certificates.

Conversely, a raw `TcpClient` bypasses Windows proxy settings entirely. It attempts a direct outbound socket connection to the target IP, failing to read PAC files or system proxies unless you manually code proxy logic into the socket

#### Invoke-WebRequest and Curl

By default, native Windows tools like `Invoke-RestMethod` and `Test-NetConnection` read proxy configurations from the **WinINet** layer (the settings configured via Internet Options / Windows Settings, including PAC files).

`curl` on Windows behaves differently:

- By default, it ignores standard WinINet PAC file configurations unless you explicitly pass the `--proxy` or `--pac` flags.
    
- It _can_ automatically pick up proxies defined in environment variables (like `http_proxy` or `https_proxy`).
    
- It does **not** use the `netsh winhttp` configuration by default either (WinHTTP is primarily used by Windows Services and system-level applications, which your output confirmed is set to direct access anyway).

### Windows Network Tools Comparison

|**Tool / Method**|**Automatically Uses Windows PAC Files / Proxies?**|**Completes TLS Handshake?**|**Can Display SSL Issuer?**|**Primary Use Case**|
|---|---|---|---|---|
|**`Test-NetConnection`**|**Yes** (Via WinINet)|No|No|Network path and port connectivity diagnostics.|
|**`Invoke-RestMethod`**|**Yes** (Via WinINet)|Yes|Yes|API interactions and proxy-aware web automation.|
|**`curl`**|**No** (Requires explicit flags or env vars)|Yes|Yes|Quick CLI web requests and verbose SSL handshake inspection.|
|**`TcpClient` (Raw Socket)**|**No** (Direct connection only)|No (Unless wrapped in `SslStream`)|No (Unless wrapped in `SslStream`)|

### Setting up PAC on curl

To verify if our curl environment has a proxy set up run the below
```DOS
netsh winhttp show proxy

...
Current WinHTTP proxy settings:

    Direct access (no proxy server).

```



To set up our `curl` for the session with proxy we can create to `.env variables`
`HTTP_PROXY` and `HTTPS_PROXY` and point it to our .PAC file
However, this will not be persistent, this method will apply the proxy to the shell only.
#### Example Curl Bypassing PAC
![[Pasted image 20260711011647.png]]
![[Pasted image 20260711012841.png]]

# Commands

