## fatrace

More information: https://manned.org/fatrace.

Monitor an specific use for a command

```
sudo fatrace --command=ls
```

Monitor commands used by an specifc user
```
fatrace -u bob
```

Monitor commands by a user and save it to a file including time stamp
```
fatrace -u bob -t -o /tracer.txt
```