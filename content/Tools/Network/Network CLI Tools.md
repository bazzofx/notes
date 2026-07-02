
## bmon
bmon is a monitoring and debugging tool to capture networking related statistics and prepare them visually in a human friendly way.

It features various output methods including an interactive curses user interface and a programmable text output for scripting.

```
apt install bmon
```

![[Pasted image 20260626193144.png]]

## netop
netop is a network topology visualizer that helps you visualize your network topology in the terminal. It is useful for network engineers and system administrators who need to understand the structure of their network.

Requires the pcap library to build if you don't have netop available on your operating system.
```
cargo install netop
```
![[netop.gif]]

## snitch
snitch is a CLI and TUI tool for inspecting TCP and UDP network connections, built as a friendlier `ss` and `netstat` for humans.
```
go install github.com/karol-broda/snitch@latest
```

![[snitch.gif]]