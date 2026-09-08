When running an Azure Cloud Shell, if we get a message saying the resource does not exist within the subscription. It might be you are logged in with the wrong subscription on the Cloud Shell, run the below to fix it
```bash

#Check Subscription
for sub in $(az account list --query "[].id" -o tsv); do
  echo "Checking $sub"
  az group show \
    --name RG-V2-SENTINEL \
    --subscription "$sub" \
    --query "{Subscription:'$sub',Name:name,Location:location}" \
    -o table 2>/dev/null
done

#Set up the subscription-ID you need
az account set --subscription <CORRECT-SUBSCRIPTION-ID>
```