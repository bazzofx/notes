
**Step 1 - Install custom apps and burn into an ISO again –** [follow guide here](https://www.youtube.com/watch?v=7tzE07TP1D4)

## **Preparing the Machine with sysprep**

1. Make another partition named Data (E:) and a folder inside named Scratch
2. Sysprep the device
```
 %windir%\system32\sysprep\sysprep.exe /audit /reboot 
```
1. Delete all users except local Adminstrator account
2. To Start Disk Cleanup  run à Cleanmgr (reboot your system)
3. System Preparation Tool (Generalize , shutdown)

**Now turn the machine back on and now start installing your applications**

## **Getting the install.wim file**

—boot the system from the PE recovery media .( press **Shift + F10 (fn) to open cmd)**  
  
To check drive letter while booting through bootable media (cmd: diskpart list vol)

Create the custom .WIM file (capturedir is where windows is installed)  
To Create install.wim
![[Pasted image 20251026212314.png]]
```
# E: is the Data Disk
# F: is the Windows Installl disk

dism /capture-image /imagefile:D:\install.wim /capturedir:C:\ /ScratchDir:D:\Scratch /name:"WIN11_DFIR" /compress:maximum /checkintegrity /verify /bootable
```

Once complete reboot the system

## **Getting the original Win.iso and adding our install.wim to it**

6- Replacing the original .wim file  
Navigate where you have exported the .wim file (E:/) create a folder named MyFiles  
copy the contents from inside the original Win-10.iso (DVD) and paste inside MyFiles  
now move the newly created .wim file inside the MyFiles/Sources/ and replace the original

## **Creating a bootable ISO**

7- Download Windows ADK (Assessment Deployment Kit) [click here](https://docs.microsoft.com/en-us/windows-hardware/get-started/adk-install)  
Install Windows ADK only is enough  
Search for “Deployment and Imaging Tools” and run the following command :

8--To Create Bootable ISO  
```
oscdimg.exe -m -o -u2 -udfver102 -bootdata:2[#p0](https://www.youtube.com/hashtag/p0),e,bd:\my_files\boot\etfsboot.com[#pEF](https://www.youtube.com/hashtag/pef),e,bd:\my_files\efi\microsoft\boot\efisys.bin d:\my_files d:\Windows10Prox64.iso
```

9- Testing the new ISO  
Because the users were pre-recorded you **don’t need the unattended.xml** file