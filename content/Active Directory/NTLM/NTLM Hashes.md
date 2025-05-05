
### 🔍 Key Differences

| Feature                  | NTLMv1                  | NTLMv2                            |
| ------------------------ | ----------------------- | --------------------------------- |
| Introduced               | Windows NT 4.0          | Windows NT 4.0 SP4                |
| Cryptographic Algorithm  | DES                     | HMAC-MD5                          |
| Replay Protection        | ❌ No                    | ✅ Yes (timestamp + client nonce)  |
| Session Security         | ❌ Limited               | ✅ Extended session security       |
| Hash Cracking Difficulty | Easy (fast brute force) | Harder (more complex blob)        |
| Recommended Today?       | ❌ Never                 | ⚠️ Only if Kerberos not available |


# NTLM Flow 
```mermaid
sequenceDiagram

    participant Client

    participant Server

    participant Attacker

  

    Note over Client,Server: NTLMv1 Authentication Flow

    Server->>Client: NTLM Challenge (8-byte nonce)

    Client->>Client: NT Hash = MD4(Unicode(PASSWORD))

    Client->>Client: Response = DES(Challenge, NT Hash)

    Client->>Server: Sends Username + Challenge Response

    Server->>Server: Server computes expected response using stored NT Hash

    Server-->>Client: Authentication Success/Failure

  

    Note over Client,Server: NTLMv2 Authentication Flow

    Server->>Client: NTLM Challenge (8-byte nonce)

    Client->>Client: NT Hash = MD4(Unicode(PASSWORD))

    Client->>Client: Create blob = Timestamp + Client Nonce + Domain + other metadata

    Client->>Client: NTLMv2 Hash = HMAC-MD5(NT Hash, Username + Domain)

    Client->>Client: NTLMv2 Response = HMAC-MD5(NTLMv2 Hash, ServerChallenge + Blob) + Blob

    Client->>Server: Sends Username + NTLMv2 Response

    Server->>Server: Recomputes NTLMv2 Response using stored NT Hash

    Server-->>Client: Authentication Success/Failure

  

    Note over Attacker: NTLMv2 is stronger, but still vulnerable to relay unless mitigated (e.g., SMB signing)

```