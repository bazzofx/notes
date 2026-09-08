### Guardrails for Resource Creation on Azure
- **DeployIfNotExists effect**
DeployIfNotExists automatically deploys a configuration (like enabling Defender, diagnostic settings) when a new resource is created without it — this is the primary guardrail mechanism.
- **Modify effect**
Modify automatically changes resource properties at creation/update time to enforce compliance. Both take automated action unlike Audit or Deny.

### CEF Log Ingestion
CEF (Common Event Format) log ingestion requires a Linux syslog forwarder running AMA to receive CEF messages from network devices (which can't run AMA directly) and forward them to Sentinel.

### Monitor Password Hash Synchronization anomalies in a hybrid Azure AD
AD AuditLogs typically show `Sync_servername@domain` — monitor alongside Microsoft Defender for Identity.

### Monitor Logs from onPrem Server
AMA with a DCR is the modern recommended method for ingesting Windows events from on-premises servers. The **Security Events via AMA** connector specifically handles Windows Security Events. MMA (option B) is legacy but still functional.

### NRT Analytic
Near Real Time Analytics Tables have specific limitations: single-table queries, no joins, and a 5-minute maximum lookback window.

### Monitor Credential Access via Azure Instance Metadata Service (IMDS)
- **DeviceNetworkEvents** captures connections to `169.254.169.254` from all processes including unexpected ones (malware).
- **DeviceProcessEvents** identifies which process made the IMDS query — if `cmd.exe` or PowerShell is querying IMDS, it's highly suspicious.
Together they provide process-level attribution for IMDS abuse.

### Data Collection Rules (DCRs)
Sentinel and Log Analytics workspace region selection determines where data physically resides in Azure infrastructure. DCRs explicitly specify the destination workspace, ensuring logs from on-premises or multi-region sources are routed to the compliant regional workspace. Both enforce data residency by design.

### Fusion ML
Fusion ML correlates alerts across Microsoft security products when they share entities (same user, same IP) and occur within a relevant timeframe, creating high-confidence multi-stage attack incidents. The combined signal has higher fidelity than individual alerts. Fusion supports all integrated Microsoft security products, not just MDE.

### Entity Mapping Limit
Up to **500 entities collectively** can be identified in a single alert, divided equally across all entity mappings defined in the rule. With five entity mappings, each mapping can identify up to 100 entities. [](https://learn.microsoft.com/en-us/azure/sentinel/map-data-fields-to-entities?tabs=azure)

### Attack Disruption Function
Attack disruption is linked with Defender for **Identity**. For AD, it's synced with Entra and triggered by the sensor installed on the server. [](https://learn.microsoft.com/en-us/defender-xdr/automatic-attack-disruption)

### Azure Log Analytics Restore Limitation
- Maximum concurrent restore processes per workspace: **2**
- Third restore job will fail until an active restore completes or is deleted
[Azure Monitor Logs Restore Documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/restore)

### Search Jobs vs. KQL Jobs in Azure Sentinel
- **Search Jobs** — Used for data that exists in the **archive tier**, or data that **predates** the data lake onboarding date. Search jobs hydrate data from the archive tier into a new custom table in the analytics tier.
- **KQL Jobs** — Operate on data stored in the Microsoft Sentinel data lake **from the onboarding date onward**. For data ingested before the onboarding date, search jobs must be used instead.