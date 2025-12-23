
# Step 1: Format the partition
```bash
sudo mkfs.ext4 /dev/sdb1
```
## Add a label for easier mounting:
```bash
sudo e2label /dev/sdb1 kali_build
```
# Step 2: Mount the partition
```bash
sudo mkdir -p /mnt/kali_build
sudo mount /dev/sdb1 /mnt/kali_build
```
Verify its mounted
Check with `df -h` or `lsblk` to make sure it’s mounted