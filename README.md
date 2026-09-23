# Emirates Fleet Intelligence

> **An independent aviation fleet retrofit analytics prototype**  
> *Developed as a portfolio project for the Emirates Group Elevate Internship (Strategy, Data & Technology track).*


### Check the link to View
https://emirateselevateproject.vercel.app/ 

---

### ⚠️ Important Notice & Disclaimer

> "This is an independent portfolio project inspired by publicly available information about Emirates' fleet transformation initiatives. It is not affiliated with, endorsed by, or developed for Emirates. The prototype does not use proprietary Emirates data. Where aircraft-level or operational data is unavailable publicly, synthetic data is used for demonstration."

---

## 1. Overview

**Emirates Fleet Intelligence** is an executive-level analytics dashboard designed to explore and visualize large-scale commercial widebody aircraft retrofit programmes. Inspired by Emirates' publicly announced multi-billion-dollar fleet modernisation initiative, this interactive prototype models conversion velocities across Airbus A380 and Boeing 777 airframes, tracks cabin modernisation milestones (such as the introduction of 4-Class configurations and Premium Economy), and provides strategic scenario simulation for aviation operations analysts.

---

## 2. Problem

Commercial aviation fleet retrofits are among the most capital-intensive and logistically complex endeavours in the airline industry:
- **Capital & Asset Allocation:** Refitting nearly 200 widebody aircraft involves billions in seat hardware, inflight entertainment (IFE) suites, avionics, and engineering labor.
- **Operational Downtime vs. Commercial Yield:** Grounding aircraft for heavy maintenance reduces active seat capacity, which must be carefully balanced against future yield premiums from modernized cabins.
- **Product Homogeneity across Network:** The phased rollout of next-generation cabins (e.g., 1-2-1 direct-aisle Business Class and Premium Economy) creates a dual-standard fleet that requires transparent tracking to match customer expectations and route demands.

---

## 3. Why This Project

This prototype was created to demonstrate cross-functional capabilities for the **Emirates Group Elevate Internship (Strategy, Data & Technology track)**:
1. **Strategic Perspective:** Framing engineering retrofit programmes through commercial lenses—evaluating product consistency, premium seat density, and network deployment.
2. **Data Modeling & Analytics:** Structuring multi-tiered aircraft registries, modeling learning-curve turnaround acceleration, and building interactive scenario simulators.
3. **Enterprise UI/UX Engineering:** Delivering a performant, type-safe, and visually polished intelligence portal inspired by aviation telemetry and executive command centers.

---

## 4. Inspiration from Publicly Documented Emirates Initiatives

The data structure and business logic are inspired by official Emirates press releases and published aviation reporting:
- **Expanded Scope:** Emirates' commitment to modernize **191 aircraft** (110 Airbus A380s and 81 Boeing 777s).
- **Flagship Pilot Airframes:** `A6-EVM` (the first retrofitted A380 entering commercial service to London Heathrow in Jan 2023) and `A6-EQH` (the first modernized Boeing 777-300ER debuting to Geneva in Aug 2024).
- **Cabin Architecture:** 56 Premium Economy seats on A380s, 24 on Boeing 777s, and the transition from 2-3-2 to 1-2-1 direct-aisle access in Boeing 777 Business Class.
- **Dedicated DXB Engineering:** In-house refit operations managed at the Emirates Engineering Centre in Dubai.

---

## 5. Features

### 🎛️ Executive Overview
- **Macro KPIs:** Real-time tracking of modernized fleet count, target completion percentage, total Premium Economy seats installed, and active hangar throughput.
- **Provenance Modals (`ⓘ`):** Direct transparency showing whether each key metric is verified from public reports or derived from synthetic models.
- **Retrofit Trajectory Runway:** Recharts visualization mapping cumulative deliveries against the planned S-curve target and quarterly airframe output.
- **Fleet Breakdown:** Interactive donut charts categorizing airframe subtypes (A380-800, B777-300ER, B777-200LR, A350-900).
- **Milestone Timeline:** Chronological record of major programme benchmarks with citations.

### ✈️ Fleet Explorer
- **Multi-Dimensional Filters:** Filter by Aircraft Family, Subtype, Retrofit Status, Cabin Product, Connectivity, and Data Provenance.
- **Dual View Modes:** Instant toggle between visual **Cards Grid View** and high-density **Table View**.
- **Interactive Tail Details Modal:**
  - Visual deck configuration map (Upper Deck / Main Deck seating layout).
  - Modernization checklist (Refreshed interior, Premium Economy, 1-2-1 Business, 4K ice, Broadband Wi-Fi).
  - Operational turnaround statistics, days in hangar, and assigned route corridors.

### 📈 Retrofit Progress & Strategic Decision Support
- **Family Conversion Comparison:** Conversion benchmarks for Airbus A380 vs. Boeing 777.
- **Product Rollout Penetration:** Fleet-wide adoption percentages for Premium Economy, 1-2-1 Business, and Gen-3 ice systems.
- **Hypothetical Rollout Simulator:** Test the strategic impact of `+5`, `+10`, or `+25` completed retrofits on overall target completion and remaining queue.
- **"What the Data Suggests":** Analytical takeaways formatted with neutral, non-prescriptive language (*"Observed pattern"*, *"Potential opportunity"*, *"Area to investigate"*).

### 💺 Product & Cabin Architecture
- **4-Class Specification Matrix:** Detailed breakdown of First Class, 1-2-1 Business Class, Premium Economy, and Economy Class seat pitch, width, recline, and hardware.
- **Route Deployment Matrix:** Global destination grid categorizing where 4-Class retrofitted aircraft are deployed.

---

## 6. Technology Stack

| Layer | Technology | Key Capabilities |
| :--- | :--- | :--- |
| **Framework** | **React 18** | Modular component architecture with fast client-side state management |
| **Build Tool** | **Vite 6** | Instant Hot Module Replacement (HMR) and optimized production bundling |
| **Language** | **TypeScript 5** | Strict type safety across all fleet models, cabin configs, and metadata |
| **Styling** | **Tailwind CSS 3.4** | Bespoke aviation dark mode (`#0B0D14`, `#111522`, `#C8102E` accent) |
| **Visualizations** | **Recharts 2.x** | Trajectory S-curves, composed area/bar charts, and responsive donut gauges |
| **Icons** | **Lucide React** | Clean, minimalist aviation and UI iconography |

---

## 7. Data Methodology

The application structures fleet information into a unified, type-safe schema with explicit metadata fields:

```typescript
export interface Aircraft {
  id: string;                    // Aircraft Registration (e.g., A6-EVM)
  family: AircraftFamily;        // A380, B777, A350
  type: string;                  // e.g., A380-800 4-Class
  status: RetrofitStatus;        // Completed, In Progress, Scheduled, Factory Fresh
  retrofitDate?: string;         // Entry into commercial service date
  configuration: CabinConfig;    // 4-Class, 3-Class, 2-Class
  premiumEconomy: boolean;       // Premium Economy availability
  has121Business: boolean;       // Direct aisle access Business Class
  wifiType: string;              // Inflight broadband connectivity
  dataSource: string;            // Exact citation or synthetic designation
  isSimulated: boolean;          // Strict provenance boolean flag
}
```

---

## 8. Public vs. Synthetic Data Distinction

To prevent misrepresentation, every data point in the system is classified under a strict provenance framework:

| Data Type | Public Emirates Information | Synthetic Demonstration Data |
| :--- | :--- | :--- |
| **Scope** | Global programme metrics (191 target, 110 A380 / 81 B777 split, PE seat densities, official milestone dates). | Individual airframe maintenance turnaround days, hypothetical simulation runs, unannounced tail schedules. |
| **UI Badge** | `Public Verified` (Teal badge with citation tooltip) | `Demo / Simulated` (Slate/Indigo badge) |
| **Integrity Rule** | Sourced exclusively from official press releases and verified media. | Generated for structural demonstration and UI/filter interactivity. |

---

## 9. Screenshots Section

### 🎛️ Executive Overview & Trajectory Runway
*(Executive KPI cards, S-curve delivery trajectory, and subtype breakdown)*

```
+-------------------------------------------------------------------------------+
| EMIRATES FLEET INTELLIGENCE                [DXB 09:36 UTC+4] [Search Tail...] |
+-------------------------------------------------------------------------------+
| [Hero: Fleet Modernization Programme - 191 Target Widebodies]                  |
| [68 Retrofitted] [35.6% Complete] [191 Tracked Aircraft] [3,248 PE Seats]     |
| [Trajectory Runway S-Curve Chart]         [Fleet Composition Donut Chart]    |
| [Programme Milestones]                    [Strategic Observations]           |
+-------------------------------------------------------------------------------+
```

### ✈️ Interactive Fleet Explorer & Tail Modal
*(Multi-filtered aircraft registry with Card/Table views and deck configuration sheet)*

```
+-------------------------------------------------------------------------------+
| Filters: [All Families] [Status: Completed] [PE: Enabled] [Sort: Completion]  |
| ----------------------------------------------------------------------------- |
| [ A6-EVM | A380-800 4-Class | Completed | 56 PE Seats | Public Verified ]     |
| [ A6-EQH | B777-300ER 4-Class | Completed | 1-2-1 J  | Public Verified ]     |
| [ A6-EUA | A380-800 4-Class | In Hangar | Day 14/22  | Demo / Simulated ]     |
+-------------------------------------------------------------------------------+
```

### 📈 Retrofit Progress & Scenario Simulator
*(A380 vs B777 conversion benchmarks, product penetration, and "+10 Aircraft" simulation)*

```
+-------------------------------------------------------------------------------+
| Conversion: A380 (43.6%) | B777 (29.6%)                                       |
| Product Rollout: Premium Economy (35.6%) | 1-2-1 Business (12.6%)             |
| Hypothetical Simulator: [+5 Units]  [+10 Units]  [+25 Units]                  |
| -> Projected Fleet Complete: 40.8% | Remaining Queue: 113 Aircraft            |
+-------------------------------------------------------------------------------+
```

---

## 10. Architecture

```
ar/
├── public/
│   └── favicon.svg                    # Custom aviation intelligence SVG favicon
├── src/
│   ├── components/
│   │   ├── about/
│   │   │   └── AboutView.tsx          # Internship context & methodology
│   │   ├── cabin/
│   │   │   └── ProductCabinView.tsx   # 4-Class spec matrix & route network
│   │   ├── fleet/
│   │   │   ├── AircraftModal.tsx      # Tail detail sheet with deck map & checklist
│   │   │   ├── CabinLayoutVisualizer.tsx # Visual deck seating representation
│   │   │   └── FleetExplorer.tsx      # Filterable tail registry (Cards/Table)
│   │   ├── layout/
│   │   │   ├── Header.tsx             # Brand header, DXB UTC+4 clock & search
│   │   │   └── Sidebar.tsx            # Navigation drawer & progress gauge
│   │   ├── overview/
│   │   │   ├── DataMethodologyCard.tsx# Data provenance framework summary
│   │   │   ├── ExecutiveInsight.tsx   # Strategic takeaways & observations
│   │   │   ├── FleetCompositionCard.tsx # Donut chart & family breakdown
│   │   │   ├── HeroBanner.tsx         # Executive hero banner
│   │   │   ├── MilestoneTimeline.tsx  # Chronological milestone tracker
│   │   │   ├── OverviewView.tsx       # Main executive overview container
│   │   │   └── RetrofitTrajectoryChart.tsx # Recharts S-curve runway chart
│   │   ├── progress/
│   │   │   └── RetrofitProgressView.tsx # Strategic decision support & scenario tool
│   │   └── ui/
│   │       ├── Badge.tsx              # Status & provenance badges
│   │       └── StatCard.tsx           # KPI card with provenance tooltip
│   ├── data/
│   │   ├── analyticsData.ts          # Trajectory series & route deployments
│   │   ├── cabinSpecs.ts             # 4-Class dimensions & materials
│   │   ├── fleetData.ts              # Central airframe dataset & provenance metadata
│   │   └── milestonesData.ts         # Historical programme benchmarks
│   ├── types/
│   │   └── index.ts                  # TypeScript types & interface definitions
│   ├── App.tsx                       # Client-side router & title manager
│   ├── index.css                     # Tailwind tokens & scrollbar styling
│   └── main.tsx                      # Vite React root mount
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 11. How to Run Locally

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Setup & Run
```bash
# 1. Clone the repository or navigate to the project directory
cd ar

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev
```

Open your browser and navigate to **`http://localhost:5173/`**.

### Production Build
```bash
# Compile TypeScript and generate production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 12. Limitations

- **Simulated Maintenance Turnaround:** Individual aircraft hangar entry/exit timestamps and days in hangar are calibrated synthetic demonstrations, as live engineering logs are proprietary.
- **Client-Side Prototype:** The application runs entirely client-side without a persistent backend database or live flight tracking APIs.
- **Scope Focus:** Analysis is focused strictly on widebody passenger aircraft (A380, B777, A350) involved in the modernization programme.

---

## 13. Future Improvements

1. **Route Yield & Revenue Uplift Estimator:** Add interactive revenue modeling to project yield improvements per route based on Premium Economy cabin configuration.
2. **Predictive Maintenance Turnaround Modeling:** Implement Monte Carlo simulations to model supply-chain and seat-track installation turnaround distributions.
3. **Executive Export Suite:** Support one-click PDF briefing deck and CSV data export for strategic reporting.

---

## 📄 Author

**Kavyasree Nunna**  
*Portfolio project developed for the Emirates Group Elevate Internship (Strategy, Data & Technology track).*
