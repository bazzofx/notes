```powerhshell
#SubFunction------------------------
# Define a helper function to check if "Do not require Kerberos preauthentication" is enabled
function IsKerberosPreAuthDisabled {
    param (
        [int]$UserAccountControl
    )
    # The flag for "Do not require Kerberos preauthentication" is 4194304 (0x400000 in hex)
    return ($UserAccountControl -band 4194304) -ne 0
}
#---------------------------------------------


$allUsers = Get-ADUser -Filter * -Properties EmailAddress, UserAccountControl

# Process each user and output the required properties
$users = $allUsers | ForEach-Object {
    [PSCustomObject]@{
        Name                       = $_.Name
        Email                      = $_.EmailAddress
        KerberosPreAuthentication    = IsKerberosPreAuthDisabled -UserAccountControl $_.UserAccountControl
    }
}

Write-Host "==== HIGH RISK USERS ====" -ForegroundColor Black -BackgroundColor Yellow
forEach($user in $users){
    $check = $user.KerberosPreAuthentication
    $name  = $user.Name
    if($check -eq "True"){
       Write-Host "$name" -ForegroundColor Yellow
        }

    }


Write-Host "Exporting to .csv file" -ForegroundColor Gray
$users | Export-Csv -Path "ADUsersWithProperties.csv" -NoTypeInformation -Encoding UTF8



```