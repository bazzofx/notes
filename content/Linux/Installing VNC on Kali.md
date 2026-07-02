
#vnc #remote
# Install VNC Server
```bash
sudo apt update
sudo apt install tigervnc-standalone-server xfce4 xfce4-goodies
```
# Set VNCPassword
```bash
vncpasswd
```

# Configure Desktop Startup
nano ~/.vnc/xstartup
```
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS
exec startxfce4
```
Make the script executable
```bash
chmod +x ~/.vnc/xstartup
```

# Start VNC Server
```bash
vncserver :1 -geometry 1920x1080 -depth 24
```
# Check if its running
It runs on port 5901 and 6001 by default
```bash
ss -tulpn | grep LISTEN
```

![[Pasted image 20260702222206.png]]

# VNC Client
Now that you have your VNC Server running, we can install the client on your other machine and connect.
I am testing the Ultra VNC Client, but there are countless options you can find online.
The Ultra VNC can be downloaded from this page [Download UltraVNC](https://forum.uvnc.com/viewtopic.php?t=38158#goog_fullscreen_ad)

