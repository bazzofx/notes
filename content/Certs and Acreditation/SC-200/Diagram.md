## AWS Cloudtrail to Sentinel
You need to configure Microsoft Sentinel to ingest AWS CloudTrail logs for a multi-cloud security monitoring strategy. 
![[Pasted image 20260805225028.png]]
The AWS S3 data connector in Sentinel reads CloudTrail logs from S3. The recommended architecture uses SQS to notify Sentinel when new log files arrive in S3, enabling near-real-time ingestion. Azure Data Factory and direct agent installation are not the supported methods

## Microsoft ZAP
![[Pasted image 20260805225457.png]]
