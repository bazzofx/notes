
- join 
A 'join' between AuditLogs (creation) and SigninLogs (login) on UPN correlates the two events for the same user. A time-based join condition (datetime_diff or between) ensures the login happened within 10 minutes of creation. These are the core KQL techniques for time-correlated cross-table event detection.
- union 
 search across both tables simultaneously when investigating device activity. [](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-query-language)
  

- Entitiy Mapping
Entity mapping in the Analytics rule configuration maps KQL output columns to entity types. The KQL query must produce a column with the IP value (via project or extend) that can be mapped.


### Review PowerShell activities after receipt of emails from known malicious sender [link](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-query-emails-devices?view=o365-worldwide#check-if-files-from-a-known-malicious-sender-are-on-your-devices)


```sql
//Define new table for emails from specific sender
let EmailsFromBadSender=EmailEvents
| where SenderFromAddress =~ "MaliciousSender@example.com"
| project TimeEmail = Timestamp, Subject, SenderFromAddress, AccountName = tostring(split(RecipientEmailAddress, "@")[0]);
//Merge emails from sender with process-related events on devices
EmailsFromBadSender
| join (
DeviceProcessEvents
//Look for PowerShell activity
| where FileName =~ "powershell.exe"
//Add line below to check only events initiated by Outlook
//| where InitiatingProcessParentFileName =~ "outlook.exe"
| project TimeProc = Timestamp, AccountName, DeviceName, InitiatingProcessParentFileName, InitiatingProcessFileName, FileName, ProcessCommandLine
) on AccountName
//Check only PowerShell activities within 30 minutes of receipt of an email
| where (TimeProc - TimeEmail) between (0min.. 30min)
```