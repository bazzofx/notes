
After installing ProxMox one of the first things we want to do is to create some file shares so we can work efficient across our local network. Let's jump straight to it.

[ref youtube Pt1](https://www.youtube.com/watch?v=zLFB6ulC0Fg&t=270s)
## Steps  
-  [[#1 Create a ZFS Pools]] - Proxmox > ZFS (ie: RAIDZ, compression lz4)
-  [[#2 Create the Storage Link]] Datacenter > Storage > Add
- [[#3 Download Ubuntu Image]] ProXmoX>Local>CT Deploy Ubuntu Container
- [[#4 Deploy Container]] > Resources > Add mount point of the pool we created
- [[#5 Installing Cockpit]]
- [[#Installing Cockpit add-ons]]
- [[#Configuring Cockpit]]
- [[#Create the SMB Share]]
- 
2. Cockpit configure filesharing ('Path:\data' same as ProxMox)
3. Create an SMB password 
4. Testing Raid redundancy
##  Tools
- Cockpit

## 1 Create a ZFS Pools
The first step is to create a ZFS pool 
Proxmox > ZFS Create ZFS
Choose RAID Type and compression, a popular choice is lz4
Create the pools one with HDD(vault) | one pool with SSD (flash)

![[Pasted image 20250615190459.png]]

## 2 Create the Storage Link
Go to Datacenter > Storage > Add
![[Pasted image 20250615195150.png]]
![[Pasted image 20250615195725.png]]
## 3 Download Ubuntu Image
Proxmox > Local > CT Templates > Templates
Search for tempalte you need, in this case download Ubuntu
![[Pasted image 20250615195922.png]]

## 4 Deploy Container
Click Create CT (top right page), deploy container
Follow the guide and pay close attention to the **Disk**  and **Network** section.
If you are planning to use DHCP, make sure to toggle the DHCP option.
![[Pasted image 20250615200128.png]]

After deploying the container we want to add the mouting point for the directory shares we have created on proxmox.
This is the section where we can assign how much space we want to allocate for each directory we have created on the previous step.
![[Pasted image 20250615200918.png]]
Once we login into the server, we can see the mounting points are visible from the root directory of the server.
![[Pasted image 20250615202423.png]]
## 5 Installing Cockpit
Login into the container we deployed and let's install what we need.
```
apt update -y && apt upgrade -y
sudo apt install --no-install-recommends cockpit -y
```

**obs:** we are using the `--no-install-recommends` because a lot of the config like hostname, is already managed by our ProxMox server

After installation check open the web server and check the IP of your container
`ip a`
The cockpit will be hosted on ==YOUR_IP:9090==
## 6 Installing Cockpit add-ons
The below is to give us a better experience with the tool allowing us to perform some actions straight from the web interface.
- [Cockpit File Share](https://github.com/45Drives/cockpit-file-sharing/releases)
- [Cockpit Navigator](https://github.com/45Drives/cockpit-navigator/releases)
- [Cockpit Identities](https://github.com/45Drives/cockpit-identities/releases)
### Downloading add-ons
Use `wget` on each of the .deb files (If using Ubuntu)
```
#File Share
wget https://github.com/45Drives/cockpit-file-sharing/releases/download/v4.2.12/cockpit-file-sharing_4.2.12-1bookworm_all.deb

#Cockpit Navigator
wget https://github.com/45Drives/cockpit-navigator/releases/download/v0.5.10/cockpit-navigator_0.5.10-1focal_all.deb

#Cockpit Identities
wget https://github.com/45Drives/cockpit-identities/releases/download/v0.1.12/cockpit-identities_0.1.12-1focal_all.deb
```
### Installing add-ons
```
apt install ./*.deb
```

After installing, we will get additional options on our Cockpit web browser

## 7 Installing WSDD
[WSDD](https://github.com/christgau/wsdd)
implements a Web Service Discovery host daemon. This enables (Samba) hosts, like your local NAS device, to be found by Web Service Discovery Clients like Windows.

It also implements the client side of the discovery protocol which allows to search for Windows machines and other devices implementing WSD. This mode of operation is called discovery mode.

```
apt install wsdd
```

Check if server is running with
```
systemctl status wsdd
```
## Configuring Cockpit
After installing take note of the IP, the cockpit will be running on the server you installed it under port 9090 
Go to the web console and type ==SERVER_IP:9090==

#### Fix SMB
![[Pasted image 20250615193812.png]]

#### Create new user/groups
First create a group called data-share which we will use to help manage our initial share. If a user is part of this group he can access the file share.
Also create another root account, we can do this from the web console, on this case I will create a user called joker and add him to the sudo group.
#### Create the SMB Share
On the cockpit website we will create the SMB share
![[Pasted image 20250615201345.png]]
After this step we should be able to start using the SMB share from a Windows machine.

### Add SMB Share from network
The last step is to make the share available so you can use it.
We can add the share using `net use` command  like the below

```
net use Z: \\server_IP\$SHARE_NAME $password /user:$user
```

![[Pasted image 20250615202826.png]]

Or alternatively we can add the share from the Computer Management window.
![[Pasted image 20250616012352.png]]


## Testing RAID redundancy
Testing RAID-Z redundancy is smart before you actually have a disk failure. Here’s a safe and effective way to **simulate disk failure and verify redundancy** on your Proxmox setup with ZFS RAID-Z.

```
zpool status
zpool offline $storageName $disk_name
zpool online $storageName $disk_name
```

![[Pasted image 20250615114237.png]]