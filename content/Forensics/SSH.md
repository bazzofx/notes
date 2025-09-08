### ssh
![[Pasted image 20250831005822.png]]

### ssh-add
[ref OpenSSH agent.pdf](https://www.mirkomariotti.it/downloads/compsec13/OpenSSHArticle.pdf)

Goal: let a remote host use your **local** keys to authenticate to other hosts, **without copying private keys**.
```bash
# Start agent + add key (local or remote depending on where you run this)
eval "$(ssh-agent -s)"; ssh-add ~/.ssh/id_ed25519

# List keys
ssh-add -l      # fingerprints
ssh-add -L      # public keys

# Forward local agent to a server
ssh -A user@server

# Safer forwarding
ssh-add -t 1h -c ~/.ssh/id_ed25519
```
### ssh-add Troubleshoot
```bash
# Do I have an agent?
ps -ef | grep ssh-agent
env | grep -i ssh

# Is the socket set and reachable?
echo "$SSH_AUTH_SOCK"
ls -l "$SSH_AUTH_SOCK"

# See if forwarding is happening during login
ssh -vvv -A user@server 2>&1 | grep -i 'agent'
```

![[Pasted image 20250830201211.png]]