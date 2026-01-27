## 1 Method - Recover acccount Linux
```
First, I rebooted and at the GRUB menu, I pressed e to edit the boot options.  
  
Then I looked for the line that started with linux and replaced “ro quiet splash” with “rw init=/bin/bash”.  
  
That booted me straight into a root shell. At the prompt root@(none):/#, I ran  
mount -o remount,rw /  
so I could make changes.  
  
Next, I used the passwd command to set a new password for my user.  
  
After that, I rebooted using exec /sbin/init and I was back in.
```
## 2 Recover account Linux
```
Here’s another method that works on various distros.  
  
1. Reboot and press e at GRUB menu.  
2. Find the linux line and append: rd.break  
3. Press Ctrl + X to boot.  
4. Run: mount -o remount,rw /sysroot  
5. Run: chroot /sysroot  
6. Run: passwd root and set new password.  
7. Run: touch /.autorelabel  
8. Run: exit  
9. Run: exit (again to reboot
```