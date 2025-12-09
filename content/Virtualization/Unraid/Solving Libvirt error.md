Libvirt is linked to VM Manager

```bash
# Restart the libvirt service
/etc/rc.d/rc.libvirt stop
sleep 2
/etc/rc.d/rc.libvirt start

# Quick sanity checks
pgrep libvirtd && echo "libvirt is running"
virsh version
virsh list --all
```

Method 2
```bash
error: unraid Libvirt Service failed to start
/etc/rc.d/rc.libvirt restart
/etc/rc.d/rc.qemu restart

lsof <path_to_failed_img>
kill -9 <Process_ID>
```