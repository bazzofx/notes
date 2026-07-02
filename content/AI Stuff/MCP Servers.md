
# Hermes MCP Servers
The below are some of the MCP servers I am using on my Hermes set up.
## File Server MCP
Follow the [link for video reference](https://www.youtube.com/watch?v=-NEzssNrL8c&t=3s)
```bash
mcp_servers:
project_fs:
command: "npx"
args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/YOUR_USERNAME/hermes-mcp-demo"]
tools:
resources: false
prompts: false
```

## HexStrike MCP Server
Tool for Hacking & Red Team activity, follow [the link to find out more](https://github.com/0x4m4/hexstrike-ai)
```bash
mcp_servers:
hexstrike - ai:
command: "/home/joker/Brain/Project/Hexstrike-redteam/hexstrike_env/bin/python3"
args:
 -  "/home/joker/Brain/Project/Hexstrike-redteam/hexstrike_mcp.py"
 -  "--server"
 -  "http://localhost:8888"
timeout: 300
connect_timeout: 60
```