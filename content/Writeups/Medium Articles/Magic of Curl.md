I am sure you have heard of the command `curl` easy to use yet powerful. Pretty much the whole internet runs it on the background, including container runtimes, CI/CD systems, service-discovery tools, config managers, telemetry agents, load balancers, and even Kubernetes. Whenever software needs to make an HTTP request, handle TLS, follow redirects, stream data, or talk to an API, it’s often powered by **libcurl**, the engine behind **curl**

Today let's dive in into a few flags on curl that you might not be aware of and might help you whether you are a Developer or a Security Engineer
# Proxy Headers
We can send custom headers when curling using a proxy, this can be useful when troubleshooting or performing tasks where we have to examine the proxy logs itself.
```
curl --proxy-header "User-Agent: magic/3000" -x proxy https://example.com/
```
[Proxy Headers](https://everything.curl.dev/usingcurl/proxies/env.html )

# --list-only
Have you ever come across an FTP server exposing a file, or open to anonymous authentication but unable to perform any other commands?
Using **curl --list-only** you will be able to list the contents of the directory and be able to move around the FTP connection much easier. 

```
curl --list-only ftp://ftp.server.com/services/
```
![[Pasted image 20251222103315.png]]

# HTTP Proxy and Proxy Tunnelling
You probably have used the below command in the past, this usually done when you have an air-gapped server but you still need it to connect to the internet, either download updates, or install an EPS ie: Trend Micro, CrowdStrike,SolarWinds where it constantly sends telemetry for continuous monitoring.

The command below will reach out to example.com, however it will use the proxyServer.com to send the request. Now, have you used Proxy tunnel before?
```
curl -x proxyServer.com:80 https://example.com/
```
# HTTP Proxy Tunnelling
Most HTTP proxies let you create a tunnel to a server on the other side. This is exactly what happens when you use HTTPS through an HTTP proxy. 

With `curl`, you create this tunnel using `-p` or `--proxytunnel`.

When doing HTTPS through a proxy, the proxy usually only allows tunneling to port **443** (and maybe a few other approved ports). They often block connections to random ports for security or policy reasons.

But if the proxy _does_ allow it, you can tunnel to any port you want and use other protocols through the tunnel. For example, you can even tunnel FTP traffic this way.
```
curl -p -x http://proxy.example.com:80 ftp://ftp.example.com/file.txt
```

|Type| Used|
|----------|--------|
|Proxy| Will connect to port **80** and **443**|
|Proxy Tunnel| Can re-direct connection to other ports like ,**SFTP, FTP, SSH, or custom services**, as long as the proxy administrator permits those ports.|
[Documentation link](https://everything.curl.dev/usingcurl/proxies/http.html#http-proxy-tunneling)
# Environment Variable

If you are having issues troubleshooting a server reaching out to a proxy check if the environment variables have been set correctly.

**curl** checks for the existence of specially named environment variables before it runs to see if a proxy is requested to get used. 
If you want to tell curl to use a proxy when access an HTTP server, you set the `http_proxy` environment variable. Like this:
```
http_proxy=http://proxy.example.com:80
curl -v www.example.com
```
We can also use the option
-  `ftp_proxy`, 
- `https_proxy`
- `all_proxy` 
As an alternative to the `NO_PROXY` variable,  and also a `--noproxy` flag that can be used

```bash
curl -v www.example.com --noproxy
```
[Documentation link](https://everything.curl.dev/usingcurl/proxies/env.html)
# Multiple Download Streams
Using the flag **--parallel** or **-z** we can perform downloads in parallel, this might be more useful to a developer, but I can think of a few scenarios where this would be useful during an engagement.

**--parallel-immediate** curl normally tries to reuse existing connections during parallel transfers, which reduces resource usage but can slow the initial start. Using --parallel-immediate tells curl to open new connections right away instead of waiting to see if reuse or multiplexing is possible

```
curl --parallel --parallel-max 3 \
  -O https://example.com/file1.jpg \
  -O https://example.com/file2.jpg \
  -O https://example.com/file3.jpg \
  -O https://example.com/file4.jpg \
  -O https://example.com/file5.jpg
```
[Documentation guide](https://everything.curl.dev/cmdline/urls/parallel.html?highlight=parallel#parallel-transfers)
# Enabling TLS
With curl, if you explicitly specify the TLS version of the protocol (the one that has a name that ends with an 'S' character) in the URL, curl tries to connect with TLS from start, while if you specify the non-TLS version in the URL you can _usually_ upgrade the connection to TLS-based with the `--ssl` option.

| Clear | TLS version | --ssl   |
| ----- | ----------- | ------- |
| HTTP  | HTTPS       | no      |
| LDAP  | LDAPS       | no      |
| FTP   | FTPS        | **yes** |
| POP3  | POP3S       | **yes** |
| IMAP  | IMAPS       | **yes** |
| SMTP  | SMTPS       | **yes** |
Connecting directly with TLS (to `HTTPS://`, `LDAPS://`, `FTPS://` etc) means that TLS is mandatory and curl returns an error if TLS is not negotiated.

Require TLS security for your FTP transfer:
`curl --ssl-reqd ftp://ftp.example.com/file.txt`
Suggest TLS to be used for your FTP transfer:
`curl --ssl ftp://ftp.example.com/file.txt`
Connecting directly with TLS (to `HTTPS://`, `LDAPS://`, `FTPS://` etc) means that TLS is mandatory and curl returns an error if TLS is not negotiated.
Get a file over HTTPS:
`curl https://www.example.com/`

[Documentation link](https://everything.curl.dev/usingcurl/tls/enable.html?highlight=enabling%20tls#enable-tls)
# SSL KEY LOGFILE
Just like Wireshark can decrypt TLS traffic from Firefox or Chrome, it can do the same with `curl`.

The idea is simple: make the browser or `curl` share their TLS session keys with Wireshark so it can decrypt the traffic. To do that:

1. Set the environment variable **SSLKEYLOGFILE** to a file path before starting the browser or running `curl`.
    
2. In Wireshark, open **Preferences → Protocols → TLS** and set the **Master-secret** file path to that same file.
    ![[Pasted image 20251222102641.png]]
That’s it—Wireshark will use those keys to decrypt the TLS traffic.
[Documentation link](https://everything.curl.dev/usingcurl/tls/sslkeylogfile.html#sslkeylogfile)

# --path-as-is
The path part of the URL is the part that starts with the first slash after the hostname and ends either at the end of the URL or at a '?' or '#' (roughly speaking).

If you include substrings including `/../` or `/./` in the path, curl automatically squashes them before the path is sent to the server, as is dictated by standards and how such strings tend to work in local file systems. The `/../` sequence removes the previous section so that `/hello/sir/../` ends up just `/hello/` and `/./` is simply removed so that `/hello/./sir/` becomes `/hello/sir/`.

To _prevent_ curl from squashing those magic sequences before they are sent to the server and thus allow them through, the `--path-as-is` option exists.

Lame attempt to trick the server to deliver its `/etc/passwd` file:

`curl --path-as-is https://example.com/../../etc/passwd`
[Documentation link](https://everything.curl.dev/http/modify/target.html?highlight=path-as-is#--path-as-is)
# Save the Cookies
Its also possible to download the cookies from a URL and save them into a file.
This function could be useful for developers as well as Security Engineer investigating potential malicious websites. 

The file format curl uses for cookies is called the Netscape cookie format because it was once the file format used by browsers, and then you could easily tell curl to use the browser's cookies.

As a convenience, curl also supports a cookie file being a set of HTTP headers that set cookies. It is an inferior format but may be the only thing you have.

Tell curl which file to read the initial cookies from:
[Reading Cookies](https://everything.curl.dev/http/cookies/reading.html)
```
curl -L -b cookies.txt http://example.com
```

[Writing Cookies to a file](https://everything.curl.dev/http/cookies/writing.html)
```
curl -c cookie-jar.txt http://example.com
```
# Curl Flags Table

Here is a summary of the flags we have looked into this article

| Flag                       | Description                                                                  | Example                                                                 |
| -------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **`-x` / `--proxy`**       | Uses an HTTP proxy for the request.                                          | `curl -x proxyServer.com:80 https://example.com/`                       |
|**--list-only**             | Use when trying to list directories on open anonymous FTP servers            | `curl --list-only fpt://ftp.server.com/directory/`
| **`-p` / `--proxytunnel`** | Creates a TCP tunnel through the proxy using the `CONNECT` method.           | `curl -p -x http://proxy.example.com:80 ftp://ftp.example.com/file.txt` |
| **`--noproxy`**            | Specifies hosts that should bypass the proxy.                                | `curl www.example.com --noproxy`                                        |
| **`--parallel` / -z**      | Enables parallel/ concurrent downloads.                                      | `curl --parallel -O https://example.com/file1.jpg`                      |
| **`--parallel-max`**       | Sets the maximum number of parallel transfers.                               | `curl --parallel --parallel-max 3 -O file1 -O file2`                    |
| **`--ssl`**                | Suggests upgrading a non-TLS protocol to TLS (FTP, SMTP, etc.).              | `curl --ssl ftp://ftp.example.com/file.txt`                             |
| **`--ssl-reqd`**           | Requires TLS for the transfer; fail if TLS isn’t available.                  | `curl --ssl-reqd ftp://ftp.example.com/file.txt`                        |
| **`--path-as-is`**         | Sends the URL path exactly as provided, without normalizing `/../` or `/./`. | `curl --path-as-is https://example.com/../../etc/passwd`                |
| **`-b` / `--cookie`**      | Loads cookies from a file and sends them with the request.                   | `curl -L -b cookies.txt http://example.com`                             |
| **`-c` / `--cookie-jar`**  | Saves received cookies to a file.                                            | `curl -c cookie-jar.txt http://example.com`                             |

# Summary
 That is it, hopefully you learn some new flags to used with curl, comment below how else have you used curl on your workflow or any other flags that you find useful.
