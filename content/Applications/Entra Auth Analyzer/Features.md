

# Entra Auth Log Analyzer Info
## Technology Stack Overview
The **EntraAuthLogAnalyzer** application is implemented as a modern full-stack JavaScript application built on **Node.js** and **Vite**, combining a high-performance frontend analytics interface with a lightweight backend processing layer.

### Runtime & Build Platform
- **Node.js** — Primary runtime environment used for local execution, backend services, and tooling.
- **Vite** — Modern frontend build tool and development server enabling fast module bundling, hot module replacement (HMR), and optimized production builds.
- **TypeScript** — Provides static typing, improved maintainability, and compile-time validation.
### Frontend Stack
- **React 19** — Component-based UI framework used to build the interactive analysis interface.
- **Tailwind CSS** — Utility-first CSS framework for responsive and consistent UI styling.
- **Motion** — Animation framework used for dynamic UI transitions.
- **Lucide React** — Icon system for interface visualization.
### Data Visualization & Analytics
- **D3.js** — Core visualization engine for advanced data-driven rendering.
- **Recharts** — Charting library for dashboards and statistical visualization.
- **D3 Sankey** — Flow visualization for authentication relationships.
- **React Simple Maps + TopoJSON** — Geographic visualization of authentication activity.

### Backend & Data Processing
- **Express.js** — Lightweight HTTP server used for API endpoints and local processing services.
- **better-sqlite3** — Embedded database providing fast local storage and querying capabilities.
- **PapaParse** — High-performance CSV parsing for authentication log ingestion.
- **date-fns** — Date normalization and time-based analytics utilities.

## App Config
## Exceptions
Exceptions can be controlled by updating the below files
#### Impossible Travel User Exceptions
**/src/config/ExceptionUser.tsx**
```javascript
export const USER_EXCEPTIONS: UserException[] = [
  { user: 'Gita Benayahu', countryCode: 'IL' },
];
```
#### Impossible Travel Locations Exceptions
**/src/config/travelAlerts.tsx**
```javascript
export const TRAVEL_EXCLUSIONS: TravelExclusion[] = [
  { from: 'GB', to: 'IE' },
  { from: 'IE', to: 'GB' },
  { from: 'GB', to: 'IN' },
  { from: 'IN', to: 'GB' },
  { from: 'AU', to: 'GB' },
  { from: 'GB', to: 'AU' },
];
```

## Analysis Engine
### 1. Temporal Analysis
- **Rapid Authentication Sequences**: Detects automated script behavior where users attempt multiple logins within a 60-second window.

- **Brute Force Patterns**: Identifies potential credential stuffing by flagging users with high failure rates in short intervals.
- Password Spray: Monitors for single IP addresses that attempt to authenticate against multiple distinct user accounts (threshold: 5+ unique users).
### 2. Geographical Analysis
- **Impossible Travel Incidents**: Correlates geographic anomalies where a user appears in distant locations faster than physically possible.

- **Country Transitions**: Tracks and flags when a user's session moves between different countries, a key indicator of proxy usage or account sharing.

### 3. Infrastructure Analysis
- **Network Infrastructure**: Visualizes "Shared IPs" where multiple distinct users are authenticating from the same address, helping identify office networks vs. malicious botnets.

- **Client Environment**: Breaks down the distribution of device types and browsers, highlighting rare or suspicious user agents.
- **Suspicious IPs**: Lists top IP addresses with the highest failure counts for immediate blocking.

### 4. Behavioral Analysis
- **Behavioral Clusters**: Groups users based on shared infrastructure (IP clusters) to identify coordinated activity.

- **Privilege Escalation**: Monitors access to sensitive administrative applications (Azure Portal, PIM, Admin Centers) to detect unauthorized lateral movement.