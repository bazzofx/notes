
# Proxy Headers
We can send custom headers when curling using a proxy, this can be useful when troubleshooting or performing tasks where we have to examine the proxy logs itself.
```
curl --proxy-header "User-Agent: magic/3000" -x proxy https://example.com/
```
[Proxy Headers](https://everything.curl.dev/usingcurl/proxies/env.html )

# HTTP Proxy Tunnelling
```
curl -p -x http://proxy.example.com:80 ftp://ftp.example.com/file.txt
```

# Envinronment Variable

curl checks for the existence of specially named environment variables before it runs to see if a proxy is requested to get used. 
If you want to tell curl to use a proxy when access an HTTP server, you set the `http_proxy` environment variable. Like this:
```
http_proxy=http://proxy.example.com:80 curl -v www.example.com
```
We can also use the option
-  `ftp_proxy`, 
- `https_prox`
- `all_proxy` 
As an alternative to the `NO_PROXY` variable, there is also a `--noproxy`

# Multiple Download Streams
We can also download in parallel, this might be more useful to a developer, maybe you want speed up the download of files within your server or the client, try `--parallel`

```
curl --parallel --parallel-max 3 \
  -O https://example.com/file1.jpg \
  -O https://example.com/file2.jpg \
  -O https://example.com/file3.jpg \
  -O https://example.com/file4.jpg \
  -O https://example.com/file5.jpg
```

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

# # [SSLKEYLOGFILE](https://everything.curl.dev/usingcurl/tls/sslkeylogfile.html#sslkeylogfile)


# --path-as-is
The path part of the URL is the part that starts with the first slash after the hostname and ends either at the end of the URL or at a '?' or '#' (roughly speaking).

If you include substrings including `/../` or `/./` in the path, curl automatically squashes them before the path is sent to the server, as is dictated by standards and how such strings tend to work in local file systems. The `/../` sequence removes the previous section so that `/hello/sir/../` ends up just `/hello/` and `/./` is simply removed so that `/hello/./sir/` becomes `/hello/sir/`.

To _prevent_ curl from squashing those magic sequences before they are sent to the server and thus allow them through, the `--path-as-is` option exists.

Lame attempt to trick the server to deliver its `/etc/passwd` file:

`curl --path-as-is https://example.com/../../etc/passwd`

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