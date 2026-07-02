## Stride Threat Model


name: stride-threat-model
description:  Creates a STRIDE threat model of the current project with ASCII diagrams and outputs a threat.md file. Use when analyzing system security, designing architectures, or identifying threats in applications.

When creating a STRIDE threat model, always include:

1. **Start with a system overview**: Briefly describe the system, components, actors, and trust boundaries

2. **Draw an architecture diagram**: Use ASCII art to show components, data flows, and trust boundaries

3. **Apply STRIDE**: Identify threats for each component and data flow:
   - S: Spoofing
   - T: Tampering
   - R: Repudiation
   - I: Information Disclosure
   - D: Denial of Service
   - E: Elevation of Privilege

4. **Draw a threat mapping diagram**: Overlay threats using ASCII labels (S, T, R, I, D, E)

5. **Generate a threat.md file**:

# Threat Model: <System Name>

## System Overview
<summary>

## Architecture Diagram
<ASCII diagram>

## Threat Mapping
<ASCII diagram>

## Threat Table
| ID | STRIDE | Component | Threat | Impact | Likelihood | Mitigation |

## Key Risks
- Top 3-5 risks

## Recommended Controls
- Practical mitigations

Keep it concise, practical, and focused on real-world attack scenarios.