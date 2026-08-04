# SuperSQL/Zui Query Cheat Sheet

A quick reference guide for the most common operators and expressions in Zui/BRIM.

---

## 🔍 Filtering Operators

|Operator|Description|Example|
|---|---|---|
|**`where`**|Filters data based on a Boolean condition (optional keyword)|`where alert.severity == 1` or just `alert.severity == 1`|
|**`==`**|Equals (case-sensitive)|`event_type == "alert"`|
|**`!=`**|Not equal to|`alert.signature_id != 2021434`|
|**`>`**|Greater than (numbers)|`src_port > 443`|
|**`<`**|Less than (numbers)|`alert.severity < 3`|
|**`>=`**|Greater than or equal|`orig_bytes >= 100000`|
|**`<=`**|Less than or equal|`resp_bytes <= 50000`|
|**`AND`**|Logical AND|`alert.severity == 1 AND proto == "TCP"`|
|**`OR`**|Logical OR|`proto == "TCP" OR proto == "UDP"`|
|**`in`**|Checks if value exists in a list|`alert.severity in [1, 2, 3]`|
|**`!`**|Negation (NOT)|`!(alert.severity in [1, 2])`|
|**`has()`**|Checks if a field exists|`has(alert.metadata)`|
|**`contains`**|Checks if a string contains a substring|`alert.signature contains "Trojan"`|
|**`like`**|Pattern matching with wildcards|`alert.signature like "ET %"`|

---

## 🛠️ Data Transformation Operators

|Operator|Description|Example|
|---|---|---|
|**`:=`**|Creates or assigns a new field (used with `put`)|`put severity_label := "High"`|
|**`as`**|Renames a field in output|`cut severity_level := alert.severity`|
|**`=`**|Assignment within expressions|`put total_bytes := orig_bytes + resp_bytes`|
|**`\|`**|Pipeline operator (chains operations)|`filter event_type=="alert" \| count() by src_ip`|

---

## 📊 Aggregation & Sorting Operators

|Operator|Description|Example|
|---|---|---|
|**`count()`**|Counts occurrences|`count() by alert.category`|
|**`sum()`**|Sums numeric values|`sum(orig_bytes) by src_ip`|
|**`avg()`**|Calculates average|`avg(orig_bytes) by proto`|
|**`min()`**|Finds minimum value|`min(ts) by src_ip`|
|**`max()`**|Finds maximum value|`max(ts) by src_ip`|
|**`union()`**|Combines unique values into a set|`union(alert.category) by src_ip`|
|**`collect()`**|Gathers values into an array|`collect(alert.signature) by src_ip`|
|**`sort`**|Sorts results (ascending)|`sort ts`|
|**`sort -r`**|Sorts results in reverse (descending)|`sort -r total_bytes`|
|**`uniq`**|Removes duplicate entries|`cut src_ip \| uniq`|
|**`uniq -c`**|Counts unique entries|`cut src_ip \| uniq -c`|

---

## ✂️ Field Selection & Manipulation

|Operator|Description|Example|
|---|---|---|
|**`cut`**|Selects specific fields to display|`cut ts, src_ip, dest_ip, alert.signature`|
|**`put`**|Creates or modifies fields|`put total_bytes := orig_bytes + resp_bytes`|
|**`drop`**|Removes fields from output|`drop vlan`|
|**`rename`**|Changes a field name|`rename dest_ip = dst_ip`|

---

## 🧩 Common Query Patterns (Using Your JSON Example)

### 1. Filter for specific alerts

super-sql

event_type == "alert" AND alert.category == "A Network Trojan was detected"

### 2. Find alerts by severity level

super-sql

alert.severity == 1

### 3. Check for specific signature IDs

super-sql

alert.signature_id in [2021434, 2021435, 2021436]

### 4. Create a new field for analysis

super-sql

put severity_label := "High" where alert.severity == 1

### 5. Count alerts by category

super-sql

event_type == "alert" | count() by alert.category | sort -r count

### 6. View specific fields from alerts

super-sql

event_type == "alert" | cut ts, src_ip, dest_ip, alert.signature, alert.severity

### 7. Find large data transfers

super-sql

put total_bytes := orig_bytes + resp_bytes | sort -r total_bytes | cut ts, src_ip, dest_ip, total_bytes

### 8. Check if a field exists

super-sql

has(alert.metadata)

---

## 📧 Email Analysis Queries

|Purpose|Query|
|---|---|
|Find all email traffic|`_path == "smtp" OR _path == "pop3" OR _path == "imap"`|
|Find emails with attachments|`_path == "smtp" AND filename != null`|
|View email metadata|`_path == "smtp" \| cut ts, mail_from, rcpt_to, subject, filename`|
|Find suspicious attachments|`filename like "%.exe" OR filename like "%.js"`|

---

## 🌐 HTTP Analysis Queries

|Purpose|Query|
|---|---|
|View all HTTP requests|`_path == "http" \| cut ts, method, host, uri, status_code`|
|Find POST requests|`method == "POST" \| cut ts, src_ip, dest_ip, uri`|
|Count visits by domain|`_path == "http" \| count() by host \| sort -r count`|
|Find file downloads|`filename != null \| cut ts, src_ip, dest_ip, filename, mime_type`|

---

## 🔗 Connection Analysis Queries

|Purpose|Query|
|---|---|
|View all connections|`_path == "conn" \| cut ts, src_ip, dest_ip, dest_port, proto`|
|Find connections by size|`put total_bytes := orig_bytes + resp_bytes \| sort -r total_bytes`|
|Unique connection pairs|`_path == "conn" \| cut src_ip, dest_ip \| uniq`|
|Count connections by destination|`_path == "conn" \| count() by dest_ip \| sort -r count`|

---

## 📝 Quick Reference Tips

- **`where` is optional** - You can write `alert.severity == 1` instead of `where alert.severity == 1`
    
- **Pipes (`|`)** chain operations together: `filter | count | sort`
    
- **Fields are case-sensitive** - `alert.category` vs `alert.Category`
    
- **Strings need quotes** - Use double quotes: `"alert"`
    
- **Numbers don't need quotes** - `2021434` not `"2021434"`
    
- **`null`** checks for empty values: `field == null` or `field != null`
    

---

## 🚀 Quick Start Examples

super-sql

# Find all malware alerts
alert.category contains "Trojan"
# Show top 10 most active source IPs
event_type == "alert" | count() by src_ip | sort -r count | head 10
# Show alerts with severity 1 (major)
alert.severity == 1 | cut ts, src_ip, dest_ip, alert.signature
# Find all email attachments
filename != null | cut ts, src_ip, dest_ip, filename, mime_type
# Show connections with file transfers > 1MB
put total_bytes := orig_bytes + resp_bytes | where total_bytes > 1000000 | cut ts, src_ip, dest_ip, total_bytes