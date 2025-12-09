[Video Link](https://www.youtube.com/watch?v=DmWFCtwuOIs)


Converting VHDX to VDI

### Error
```
VirtualBox > .\VBoxManage.exe clonemedium disk "C:\VMs\kali-linux-2024.3-hyperv-amd64\kali-linux-2024.3-hyperv-amd64.vhdx" 
"C:\VMs\KaliJoker.vdi" 

VBoxManage.exe: error: Could not open the medium 'C:\VMs\kali-linux-2024.3-hyperv-amd64\kali-linux-2024.3-hyperv-amd64.vhdx'. VBoxManage.exe: error: VHDX: BAT region not marked as required in image 'C:\VMs\kali-linux-2024.3-hyperv-amd64\kali-linux-2024.3-hyperv-amd64.vhdx' (VERR_VD_GEN_INVALID_HEADER). VBoxManage.exe: error: VHDX: BAT region in image 'C:\VMs\kali-linux-2024.3-hyperv-amd64\kali-linux-2024.3-hyperv-amd64.vhdx' is missing (VERR_VD_GEN_INVALID_HEADER). VBoxManage.exe: error: VD: error VERR_VD_GEN_INVALID_HEADER opening image file 'C:\VMs\kali-linux-2024.3-hyperv-amd64\kali-linux-2024.3-hyperv-amd64.vhdx' (VERR_VD_GEN_INVALID_HEADER) VBoxManage.exe: error: Details: code E_FAIL (0x80004005), component MediumWrap, interface IMedium, callee IUnknown VBoxManage.exe: error: Context: "OpenMedium(Bstr(pszFilenameOrUuid).raw(), enmDevType, enmAccessMode, fForceNewUuidOnOpen, pMedium.asOutParam())" at line 201 of file VBoxManageDisk.cpp
```

### Fix
The error you’re hitting is related to **VirtualBox not fully supporting certain VHDX formats**. Let’s break it down carefully.

Option 1: Convert VHDX → VHD → VDI

- VHDX --> VHD
```
Convert-VHD -Path "C:\VMs\kali-linux-2024.3-hyperv-amd64\kali-linux-2024.3-hyperv-amd64.vhdx" -DestinationPath "C:\VMs\KaliJoker.vhd" -VHDType Dynamic
  ```

- VHD --> VDI
```
cd "C:\Program Files\Oracle\VirtualBox"
.\VBoxManage.exe clonemedium disk "C:\VMs\KaliJoker.vhd" "C:\VMs\KaliJoker.vdi" --format VDI
```