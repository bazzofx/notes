# Increase Disk Space Ubuntu
After VM is created we can increase the disk of the image by following the below process.

Within Unraid, open a terminal and go to the directory where the IMG is being run
On my case is located on /mnt/cache/domains/

## Check information about the virtual disk
```
qeum-img info /mnt/cache/domains/Ubuntu/vdisk.img
```

## Increase VirtualDisk Size
```
qemu-img resize /mnt/cache/domains/Ubuntu/vdisk.img +50G
```

## Decrease VirtualDisk Size
Becareful when decreasing virtual disk as this may make the VM unusable.

# Increasing Available space to VM
Now we need to allocate the space into our VM.
We will need to boot up into safe mode from within the Installation disk, the below does not work when running from the live install.
![[Pasted image 20251012143425.png]]


## Boot up Ubuntu using OS Disc
After openning the terminal on safe mode, run the command below

```
apt update
apt install cloud-guest-utils -y

```

### Expand the partition to fill the disk
On our case we want to modify the vda 2
![[Pasted image 20251012142421.png]]
Now run:
`growpart /dev/vda 2`
✅ Expected output:
`CHANGED: partition=2 start=1953792 old: size=39989248 end=41943039 new: size=671068159 end=673021951`
That means the partition now uses the rest of the disk.
Check again:
`lsblk`
Now `/dev/vda2` should show around `320G`.

# Decreasing Available Space on VM
### 1️⃣ Boot into recovery or live Ubuntu (so root isn’t mounted)

Boot up into recovery mode, open a shell

---
### 2️⃣ Check your current layout

Run:
`sudo fdisk -l /dev/vda`
Example:
`Device     Start      End  Sectors  Size Type /dev/vda1   2048   1953791  1951744  953M EFI System /dev/vda2 1953792 67108863 65155072   31G Linux filesystem`
Note the **Start** sector of `/dev/vda2` — in this example it’s **1953792**.  
You’ll need that number to recreate the partition exactly at the same start point.

---

### 3️⃣ Shrink the filesystem (only if shrinking)
If you’re **reducing** the disk size:
`sudo e2fsck -f /dev/vda2 sudo resize2fs /dev/vda2 120G   # pick a safe smaller size`
If you’re only expanding, skip this step.

---

### 4️⃣ Delete and recreate the partition
Now use `fdisk` (since parted no longer supports resize directly):
```
`sudo fdisk /dev/vda`
```

Inside `fdisk`

Command (m for help): p     ← print current layout (double-check start sector) Command (m for help): d     ← delete partition 2 
Partition number (1,2,...): 2 
Command (m for help): n     ← create new partition 
Partition type: primary (default) 
Partition number: 2 
First sector: *enter the original start* (e.g. 1953792) 
Last sector: *press Enter for full size* OR enter specific smaller sector 
Do you want to remove the signature? n
Command (m for help): w     ← write and exit


Don’t worry — deleting and recreating the partition **does not delete data**, as long as:

- You use **the same start sector**, and
- You don’t format the partition.
    
## 5️⃣ Verify

```
sudo fdisk -l /dev/vda
```

# Calculating Sectors to help with shrink
## 🧮 Step 1: Understand how sectors map to size

Most modern disks (including Unraid vdisks) use **512-byte sectors**.

So:

`1 GiB = 1024 MiB = 1024 × 1024 KiB = 1024 × 1024 × 1024 bytes         = 1 073 741 824 bytes 1 GiB / 512 bytes per sector ≈ 2 097 152 sectors per GiB`

That’s the conversion rate we’ll use.

---

## 🧭 Step 2: Get your current start sector

Run:

`sudo fdisk -l /dev/vda`

Example output (yours will be similar):

`Device     Start      End  Sectors  Size Type /dev/vda1   2048   1953791  1951744  953M EFI System /dev/vda2 1953792 67108863 65155072   31G Linux filesystem`

Here, `/dev/vda2` starts at **1953792**.  
Your number may differ — note it down exactly.

---

## 🧮 Step 3: Calculate the new “end sector” for 180 GB

You want `/dev/vda2` to span roughly 180 GiB.

Formula:

`new_end = start_sector + (desired_size_GiB × 2,097,152) - 1`

Example:

`start_sector = 1953792 desired_size = 180 GiB  new_end = 1953792 + (180 × 2,097,152) - 1          = 1953792 + 377,487,360 - 1          = 379,441,151`

So the **last sector should be 379441151**.