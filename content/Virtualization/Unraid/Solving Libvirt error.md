Libvirt is linked to VM Manager

error: unraid Libvirt Service failed to start
Fix:
/etc/rc.d/rc.libvirt restart
/etc/rc.d/rc.qemu restart

lsof <path_to_failed_img>
kill -9 <Process_ID>
