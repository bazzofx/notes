
## Useful Links
- [Install Claude](https://claude.ai/code/disabled)
- [Claude Getting Started](https://claude.com/docs/connectors/getting-started)

- Install Claude Terminal
```bash
npm install -g @anthropic/claude-cli
```

## Useful Commands

- /context  --> Check how is your tokens usage
![[Pasted image 20260525102333.png]]
/status --> To view tokens usage daily/weekly
![[Pasted image 20260525111530.png]]
- /model --> To change models
- /skills  --> To view currently skills
- /hooks --> To view currently hooks


## Anatomy of Claude

### Claude.md
Something that Claude should always do, like a format in a certain way, project structure, never do X rules.
- This can be set to **global** or **local(project)** settings
- Claude.me is also know as the Security Policy set for the environment
>[NOTE]
>Best practices is to set up a global claude.md and have all developers who are  using Claude to have the security policy of their agent to follow the global claude.md policy.
#### Creating a Claude.md file
- Simply prompt Claude with : Create a Claude.md file based on "paste_claude.md_content"
- Alternatively run the command **/init**


### Skills
Re-usable capabilities that Claude activates when needed.
Persistent, modular and compostable. Everything a prompt is not
/code-review
/security-audity
- This can be set to **global** or **local(project)** settings
- The skills must be saved as a  .md file under .claude/commands/skillName.md
- ![[Pasted image 20260525081910.png]]


### MCP Servers
MCP (Model Context Protocol) - it connects Claude to real life application, like tools on your machine, or browse the internet, call APIs
- It allows Claude to connect to external tools, APIs, and data sources
- MCP extends Claude code from an isolated code assistant to a connected security operations platform
- Add MCP capabilities to cloud using official link [Claude MCP](https://claude.com/docs/en/mcp)
>[NOTE]
>MCP Servers can run locally, as well as externally. The most secure MCP is one that is running locally, or within your network control.


### Sub-Agents
Sub-agents are one of Claude Code's most powerful features for security workflows
When you assign Claude a complex task with multiple independent parts, it automatically spawns specialised sub-agents to handle the task in parallel
- You don't need to configure this, Claude decides when its best to use
- It is possible to manually assign agents per task, this is done directly on the prompt command

### Hooks
Hooks are automation triggers that execute actions before or after specific events in Claude Code
They transform Claude from a reactive assistant into a proactive security enforcement engine.
With hooks, security policies enforced automatically.
**Example:**
- Scan a code every time a file changes
- Scan dependencies every time a new one is added

#### View Available Hooks
To view the available hooks type **/hooks**
![[Pasted image 20260525095146.png]]

#### Configuring Hooks
We can create hooks using normal language, and pass to Claude

---
## Claude CLI

### Edit Mode & Plan Mode

inside the Terminal we can cycle between Edit Mode and Plan Mode by typing **Shift + Tab**

| Plan Mode                                                                                                  | Edit Mode                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Claude is restricted to read-only actions and must write an implementation plan before making any changes. | The normal mode, Claude can freely read files, run commands, edit/write files and take actions as needed to complete a task |

### Claude Commands

Type / to list the available skills, these can be added manually later.

- /model  | Will show what model we are using
- /context | Shows how many tokes we are using

## Skills

Skills (invokable via /skill-name)


>[NOTE]
>Ask code in plain language "what tools do you have access to?" for him to show you what tools are available.

## Features
After installing Claude CLI(Terminal) I am able to perform the below actions

It is different than chatGPT, its  an Agentic AI system.
Claude can read files, write files execute commands start processes. It operates inside our development environment not in a separate window. 

- Ask Claude to read any files on my system
