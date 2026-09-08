![[Pasted image 20260908122431.png]]
On this short guide we will look into how to clean up history of our github.
For a full official guide follow the [github link here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository?utm_source=chatgpt.com)

# First Things First
If you have committed a password, JWToken, ApiKey to your github, you should already considered it compromised. In this case `Invalidate the Key` and `Rotate the Password` this is the most secure method you have to guarantee the key is safe.
Now let's look into how to remove the sensitive data from your repo.

## TLDR' Easy Fix
- Invalidate the API Keys, rotate the passwords
- Next, if you want to block access to its history without much fuzz, `simply make the repo private`. This will prevent anybody apart from you to access your repo.
- 
## Clean up the Git History
There are a number of side effects, and things that could go wrong when we are messing with `git history` for a full likt please check [Side effects of rewriting history](## [Side effects of rewriting history](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository?utm_source=chatgpt.com#side-effects-of-rewriting-history))
### Completely Remove the File from All Git History
There are two ways to see this.
One if we want to completely remove the file from our GitHub, this is if you pushed a file that should not exist on your GitHub repo at all, for example you have a `.env` or `.conf` file that you **do not want on any of your commit history**


# Removing File from Git Repo History
To accomplish this, we will use a tool from github, called `git-filter-repo`. This is a tool that will search for the file within all of our commit history and delete it. Obvisouly this action needs to be taken into consideration and an impact assessment needs to be done before its run.
## Installing Windows
```bash
py -m pip install git-filter-repo
```
## Installing Linux
```shell
brew install git-filter-repo
```

# Git Filter-Repo Flow

```
#Download fresh clone of repo
git clone myRepo
       ↓
cd myRepo
       ↓
#Re-write file on local repo
git-filter-repo --sensitive-data-removal --invert-paths --path sensitiveFile.txt
       ↓
#Verity it returns nothing
git log --all -- env.txt
       ↓
#Verify the file does not exist current commit       
git ls-files env.txt      
       ↓
#Re-write remote history on GitHub
git push --force --mirror origin
       ↓
#Optional, search for the sensitive data on the logs
git log -S"YOUR_OLD_PASSWORD" --all
```
## Example
On the example below we want to remove the commit where we `added api file by mistake`. This file contained sensitive information and althought we already rotate the credentials, we do want it visible on our commit history. To avoid our repo from been targeted of tools such as [GitLeaks](https://github.com/gitleaks/gitleaks) or [BetterLeaks](https://github.com/betterleaks/betterleaks) for example.

Our commit history looks like this, to view yours run

```bash
git log --oneline
```

![[Pasted image 20260908110813.png]]
## Objective
The objective is to remove this file completely from our commit history, without changing anything else on our repo. This file contains sensitive data, and we want to delete all its references from our commit history.

![[Pasted image 20260908111538.png]]

![[Pasted image 20260908111657.png]]

![[Pasted image 20260908111609.png]]

## Steps to use Git-Fitler-Repo 
After installing the tool. Run a `git-filter-repo` command to clean up the sensitive data.
1. ```shell
    git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
    ```
    
2. ```shell
    cd YOUR-REPOSITORY
    ```

Run a `git-filter-repo` command to clean up the sensitive data.

If you want to delete a specific file from all branches/tags/refs, run the following command replacing `PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA` with the **git path to the file you want to remove, not just its filename** (e.g. `src/module/phone-numbers.txt`):

3. ```shell
git-filter-repo --sensitive-data-removal --invert-paths --path PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA
```

![[Pasted image 20260908111745.png]]

Based on our example the command will look
### 1st - Running git-filter-repo
```
git-filter-repo --sensitive-data-removal --invert-paths -path .env.txt
```
![[Pasted image 20260908112538.png]]

### 2nd - Verify Clean Local Repo

```bash
git log --all -- env.txt
```
We want the result of the command above to be empty.
If that returns nothing, `env.txt` is no longer present in the rewritten commit history.
![[Pasted image 20260908113047.png]]

Also check whether it exists in the current commit:
That should also return nothing.
```bash
git ls-files env.txt
```
### 3rd - Re-writing History
This is the part where we need to co-ordinage with our fellow developers, because things can go wrong quick! However, as long as there are no pending pulls or anybody working on a clone that could re-introduce our sensitive file again things should go smooth~ Do not be scared.

```bash
git push --force --mirror origin
```
![[Pasted image 20260908113440.png]]
>[NOTE]
The errors here are normal, and expected.
Those are GitHub-managed hidden PR references. GitHub does not allow you to overwrite them directly, even with `--force --mirror`, so it rejects them with `deny updating a hidden ref`
The PR refs are the reason GitHub recommends contacting support in sensitive-data cleanup cases. Old commits may still be reachable through closed/open pull-request references even after you rewrite `main`. If required, contact GitHub through the [GitHub Support portal](https://support.github.com/?utm_source=chatgpt.com)

### 4th - Verity it worked
We can see the commit we had `added api file by mistake` with the password has now been removed, from its history, and the file has been removed from previous commits.
![[Pasted image 20260908114801.png]]



# Deleting Single Commit from History
This is a different scenario, one where we just want to delete `a single commit` from our history.
## Objetive
Remove just a single commit from its history, while preserving future commits. On this commit we have introduce a file called `secret.txt` with plain password.
However, on commit `03aab6c` we have fixed the file with the env variable.
Our objective is to only remove the commit `a4c492d`, while preserve the other commit history.
![[Pasted image 20260908115635.png]]

## 1st - Get the hash of commit to rebase
We need to decided which commit we want to rebase from.
We will pick the current commit with the plain text password to modify.
On this commit 
```bash
git rebase -i a4c492d^
```
Change on the first line from `pick` to `drop` then if using vim `:wq` (to write and quit)
![[Pasted image 20260908120033.png]]

If you check the logs after saving, you will see the commit history has been modified and other commits are now showing. **This is normal and the commits are not gone!** Its because Git stopped partway because it depends on the commit we dropped to show its history.
## 2nd - Git Rebase
Because **we want to keep the file** we need to add to the commit again
```bash
git add secret.txt
git rebase --continue
```
![[Pasted image 20260908121025.png]]
>NOTE
>If another conflict appears, resolve it similarly and run
>git add secret.txt and  git rebase --continue

## 3rd - Verity it worked
Check the git log and verify the commit you wanted to remove its now gone.
```bash
git log --oneline
```
We can see below the commit `a4c492d` has now bee gone from history.
![[Pasted image 20260908121215.png]]

