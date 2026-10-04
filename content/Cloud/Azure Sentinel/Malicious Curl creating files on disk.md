# Objective:

1. Use KQL to find the log where UK1-OMG-01 has requested to cybersamurai.co.uk and downloaded virus.txt
2. Create a Detection to capture this in the future
3. Create an automation process that can help speed up this investigation
4. Make notes of findings, discoveries, and process

## KQL Search for file downloaded from a website within those 3 databases.

Interestly, different from **Trend Micro** MS Agent does not easily provide the exactly command which was used on this attack.

  On this example the endpoint used
`curl cybersamurai.co.uk > C:\temp\virus.txt`
![[Pasted image 20260913203255.png]]
However, the re-direct to file is hidden from the normal processCommand field, and it is not shown by default.
`curl cybersamurai.co.uk`. **Nothing** regarding the exact command.
## Generic KQL Query Wildcard
The below query is a generic search within the select databases, this is to be used before we refine our main KQL query down below.

```kql
search in (DeviceProcessEvents, DeviceNetworkEvents, DeviceFileEvents)
    "cybersamurai.co.uk" or "virus.exe"
| where Timestamp > ago(2h)
| order by Timestamp desc
| project InitiatingProcessFileName,
InitiatingProcessCommandLine,
ActionType,
InitiatingProcessVersionInfoOriginalFileName,
InitiatingProcessId,
InitiatingProcessFolderPath,
ProcessCommandLine,
AccountDomain,
AccountName
```

However, the above query does not give any indication that the `curl` command created a file when it was run. To obtain that information we need to combine the results of two tables and corelated the data between them.
![[Pasted image 20260913204305.png]]

## KQL Query Identify Curl that creates a file
The below is the Winning query that will show if a file has been created using curl with the same process ID and within the 30 seconds.
```kql
DeviceProcessEvents
| where Timestamp > ago(1h)
| where FileName =~ "curl.exe"
| project
    CurlTime = Timestamp,
    DeviceId,
    DeviceName,
    CurlPID = ProcessId,
    ParentPID = InitiatingProcessId,
    CurlCommand = ProcessCommandLine
    | join kind=leftouter (
    DeviceFileEvents
    | where Timestamp > ago(1h)
    | project
        DeviceId,
        FileTime = Timestamp,
        FilePID = InitiatingProcessId,
        FileProcess = InitiatingProcessFileName,
        ActionType,
        FileName,
        FolderPath
) on DeviceId
| where FileTime between (CurlTime - 2s .. CurlTime + 30s)
```

With the KQL query searching both tables we can get a better visibility of what happened on that curl command. The next step is to **Create a Detection Rule** so future incidents are automatically captured and raised as an alert.
 ![[Pasted image 20260913204713.png]]
  
## Creating Detection Rule
Small detail/issue that we need to get around.
We cannot create a **Near Real Time** detection because we are corelating information from more than one data.
### Restrictions on NRT Detection Rule
Microsoft currently requires an NRT custom detection query to:
- reference **only one table**
- use only supported KQL operators
- **not use `join`, `union`, or `externaldata`**
### Solution
1. **NRT detection:** suspicious `curl.exe` execution using only `DeviceProcessEvents`.
2. **Scheduled correlation detection:** `DeviceProcessEvents` joined with `DeviceFileEvents` to determine whether curl subsequently wrote a file.

That gives you fast notification of the curl execution, followed by richer correlation. Also, if your query includes **Microsoft Sentinel data**, Microsoft notes that NRT may not be available in that scenario either.
  