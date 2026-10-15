# CollabriX: Capstone Project Presentation Deck & Speaker Notes

**Project Title:** CollabriX — A Team-First Freelance Collaboration Platform  
**Academic Degree:** Bachelor of Technology in Computer Science & Engineering (Spl. in Artificial Intelligence)  
**Institution:** Parul Institute of Engineering & Technology, Parul University, Vadodara  
**Group Number:** PIET CSE NON ASMP - 8 (October 2026)  
**Project Guide:** Assistant Prof. Barkha Makwana  

**Team Members & Enrollment IDs:**
1. **Jaghatha Uday Prakash** (2303031240447)
2. **Boddu Venkata Sai Kowshik** (2303031241591)
3. **Katreddi Hima Nagendra** (2303031240520)
4. **Immadi Venkata Rama Chaitanya Vardhan** (2303031240436)

**Files Generated:**
- PowerPoint Presentation: [`CollabriX_Presentation.pptx`](file:///Users/uday/CollabriX/CollabriX_Presentation.pptx)
- Backup in Docs: [`docs/CollabriX_Presentation.pptx`](file:///Users/uday/CollabriX/docs/CollabriX_Presentation.pptx)
- Generator Script: [`build_full_deck.py`](file:///Users/uday/CollabriX/build_full_deck.py)

---

## Slide 1: Cover Slide
- **Theme:** Dark Teal Background (`#0B2528`), Teal Accents (`#14B8A6`)
- **Visuals:** CollabriX Logo (left container), Parul University Logo (right container)
- **Header Badge:** B.TECH CAPSTONE PROJECT · GROUP NO. PIET CSE NON ASMP - 8
- **Title:** COLLABRIX
- **Subtitle:** A Team-First Freelance Collaboration Platform
- **Content:** Team Member names & enrollment IDs, Guide name, Department, and Institution.
- **Verbatim Speaker Notes:**
  > *"Good morning respected guide Assistant Professor Barkha Makwana, respected evaluators, and colleagues. Welcome to our final year capstone project presentation on CollabriX: A Team-First Freelance Collaboration Platform. My name is Jaghatha Uday Prakash, presenting alongside my team members Boddu Venkata Sai Kowshik, Katreddi Hima Nagendra, and Immadi Venkata Rama Chaitanya Vardhan from the Department of Computer Science and Engineering with specialization in Artificial Intelligence at Parul University. Over the next 25 slides, we will demonstrate why contemporary freelance marketplaces fail modern cross-functional software development, introduce the CollabriX team-first paradigm, explore our 12-table relational schema and PostgreSQL Row-Level Security architecture, walk through our synergy and leaderboard algorithms, review live application screens, and share our rigorous verification results comprising 104 passing database integrity tests and perfect Lighthouse scores."*

---

## Slide 2: Presentation Roadmap
- **Theme:** Light Content Slide with Teal Highlights
- **Kicker:** EXECUTIVE AGENDA
- **Layout:** 4 Structured Track Cards
  - **Phase 1: Foundation & Motivation (Slides 3–7):** Industry problem, CollabriX solution, objectives, literature survey, competitive comparison with Upwork/Fiverr/Freelancer/Toptal.
  - **Phase 2: Architecture & Data Engineering (Slides 8–11):** Tech stack justification, 4-tier system blueprint, 12-table relational schema, deep-dive into the 5 new extension tables.
  - **Phase 3: Workflows & Core Algorithms (Slides 12–19):** Connections protocol, synergy algorithm, lifecycle state machine, security/RLS, two-way ratings, notification pipeline, leaderboard ranking math.
  - **Phase 4: Demonstration & Verification (Slides 20–25):** Live screenshots (developer, team engine, client, notifications), test suite (104 DB checks, 18 browser tests, Lighthouse), limitations & future work, conclusion.
- **Verbatim Speaker Notes:**
  > *"Here is our presentation roadmap structured into four distinct phases across 25 slides. In Phase 1, we establish the problem space: why individual-only gig platforms fail cross-functional software projects, and benchmark CollabriX against Upwork, Fiverr, Freelancer, and Toptal. In Phase 2, we dive into engineering, detailing our 4-tier architecture and 12-table relational database schema. In Phase 3, we dissect our core mathematical workflows: team synergy calculations, project lifecycle state machines, Row-Level Security policies, and our open leaderboard formula. Finally, in Phase 4, we showcase real application screenshots, review our 104 automated database test cases and Lighthouse performance audits, and discuss future enhancements."*

---

## Slide 3: The Problem: Structural Gaps in Gig Marketplaces
- **Theme:** Light Content Slide
- **Kicker:** INDUSTRY CHALLENGE
- **Key Callout:** Over 68% of commercial software requires 2+ complementary skills, yet 92% of platforms force single-freelancer bids.
- **5 Problem Dimensions:**
  1. *Individual-Only Model:* Isolated solitary bidding; zero native peer teaming.
  2. *Severe Bidding Fatigue:* Freelancers waste hundreds of unpaid hours bidding in crowded queues.
  3. *Weak Rating Integrity:* Decoupled reviews lead to systemic 5-star grade inflation.
  4. *Communication Silos:* Work spills to external apps (WhatsApp/Slack); platform loses context.
  5. *Cold-Start Barrier:* Talented newcomers without review volume remain invisible to ranking algorithms.
- **Verbatim Speaker Notes:**
  > *"Turning to Slide 3, we analyze the structural breakdown in contemporary freelance platforms. The fundamental flaw is the individual-only hiring paradigm. While modern software demands multi-disciplinary teams, platforms like Upwork and Fiverr are architected around a single seller profile. This mismatch causes five severe issues: First, developers cannot officially team up on-platform. Second, clients face proposal fatigue while developers waste countless unpaid hours submitting blind bids. Third, reputation systems suffer from systemic star inflation because reviews are not cryptographically or relationally tied to completed deliverables. Fourth, communication splinters across WhatsApp and Slack, depriving the platform of context. And fifth, early-career and student developers face an impenetrable cold-start barrier because search ranking algorithms heavily favor historical volume over verified skill."*

---

## Slide 4: The Solution: CollabriX Team-First Paradigm
- **Theme:** Light Content Slide
- **Kicker:** CORE INNOVATION
- **Key Proposition:** Enables developers to pool complementary skills, compete for larger contracts, and build an unforgeable verified track record.
- **4 Architectural Pillars:**
  1. *Verified Peer Discovery:* Multi-regional search (Continent → Sub-region → Country) + skill tags with LinkedIn-style connections.
  2. *Algorithmic Team Synergy:* Evaluates combined tech stacks against domain benchmarks, identifying skill gaps.
  3. *Database-Enforced Governance:* PostgreSQL Row-Level Security prevents forged states, bypasses, and fake reviews.
  4. *Zero-Baseline Verified Reputation:* Closed-loop rating system where points come exclusively from verified completed contracts.
- **Verbatim Speaker Notes:**
  > *"On Slide 4, we introduce the CollabriX solution. The name combines 'Collaboration' with 'X'—representing the multiplier effect of team synergy. Instead of treating developers as isolated competitors in a race to the bottom, CollabriX provides a first-class collaborative workspace. Our system is founded on four architectural pillars: First, dynamic team batching with our synergy scoring engine, which evaluates a squad's tech stack against project domains. Second, database-enforced relational governance using PostgreSQL Row-Level Security, guaranteeing that no state or rating can be forged. Third, a transparent zero-baseline leaderboard that rewards verified delivery rather than opaque commercial algorithms. And fourth, sub-second WebSocket communication keeping teams aligned without external tool fragmentation."*

---

## Slide 5: Project Objectives & Design Goals
- **Theme:** Light Content Slide
- **Kicker:** ENGINEERING TARGETS
- **5 Objectives:**
  1. *Dual Role-Based Workspaces:* Clean architectural and UI separation between Developer and Client experiences.
  2. *Automated Synergy Matching:* Algorithm 1 matching team skills against domain stacks with missing gap detection.
  3. *Database-Enforced Lifecycle:* Deterministic 4-state project machine (Open → In Progress → Completed / Cancelled).
  4. *Meritocratic Leaderboard Ranking:* Algorithm 2 implemented in PostgreSQL RPC without arbitrary baseline scores.
  5. *Sub-Second Event-Driven Collaboration:* Instant messaging and trigger notifications via Supabase Realtime WebSockets.
- **Verbatim Speaker Notes:**
  > *"Slide 5 outlines our five primary engineering objectives. First, establish dual role-based workspaces for developers and clients with distinct permissions and interfaces. Second, build an automated team formation engine powered by Algorithm 1 that evaluates skill complementarity and highlights technology gaps. Third, govern project lifecycles at the database layer so that assignments and reviews cannot bypass verified states. Fourth, design a meritocratic leaderboard algorithm implemented directly as a PostgreSQL stored procedure, removing opaque ranking biases. And fifth, integrate sub-second WebSocket synchronization for real-time messaging and trigger-driven notifications."*

---

## Slide 6: Literature Survey: Theoretical Foundations
- **Theme:** Light Content Slide
- **Kicker:** ACADEMIC CONTEXT
- **Academic Studies Reviewed:**
  - *Agrawal et al. (2015):* Spatial & informational frictions in online labor markets $\rightarrow$ CollabriX implemented hierarchical regional filtering.
  - *Filippas et al. (2020):* Systemic 5-star grade inflation in the gig economy $\rightarrow$ CollabriX implemented completion-gated relational reviews.
  - *Retelny et al. (2014) & Valentine et al. (2017):* Flash Teams & Organizations $\rightarrow$ CollabriX adopted dynamic Team Batches with domain role assignment.
  - *Hannák et al. (2017):* Algorithmic bias in freelance marketplaces $\rightarrow$ CollabriX engineered a transparent, deterministic leaderboard formula.
- **Verbatim Speaker Notes:**
  > *"Slide 6 reviews the academic literature informing our engineering decisions, drawn from Chapter 2 of our project report. Studies by Agrawal et al. highlighted that geographic and time-zone frictions heavily degrade solo freelancing; we resolved this with hierarchical region-based discovery. Filippas and colleagues documented the crisis of rating inflation in the gig economy, where almost every worker is rated 5 stars; we mitigated this by locking ratings behind completion-gated relational triggers. Seminal research on Flash Teams from Stanford by Retelny and Valentine demonstrated that online crowd workers succeed on complex software tasks when platforms provide structural role scaffolding—the exact premise of our Team Formation Engine. Finally, Hannák et al. exposed algorithmic ranking biases against newcomers; we solved this with an open, mathematically deterministic ranking formula."*

---

## Slide 7: Comparative Analysis: CollabriX vs. Market Leaders
- **Theme:** Light Content Slide with Full Comparison Table
- **Kicker:** COMPETITIVE BENCHMARK
- **Comparison Dimensions:**
  - *Hiring Model:* Upwork (Job post + proposals), Fiverr (Fixed gigs), Freelancer (Bidding/contests), Toptal (Curated 3%), **CollabriX (Profiles + Open Teams)**
  - *Peer Discovery:* Upwork (Limited), Fiverr (None), Freelancer (Limited), Toptal (None), **CollabriX (Full Search & Connect)**
  - *Team Formation:* Upwork (Agencies only), Fiverr (No), Freelancer (No), Toptal (Manual staff match), **CollabriX (Yes - Team Batches)**
  - *Synergy Scoring:* Upwork (None), Fiverr (None), Freelancer (None), Toptal (Manual), **CollabriX (Algorithmic - Alg. 1)**
  - *Rating Governance:* Upwork (Policy-based), Fiverr (Review-based), Freelancer (Contest feedback), Toptal (Internal), **CollabriX (PostgreSQL RLS Triggers)**
  - *Client Commission:* Upwork (Up to 10%), Fiverr (Up to 20%), Freelancer (10%+), Toptal (High premium), **CollabriX (0% Prototype)**
  - *Ranking Transparency:* Upwork (Opaque JSS), Fiverr (Secret algorithm), Freelancer (Bid priority), Toptal (Discretionary), **CollabriX (Public Math Formula)**
- **Verbatim Speaker Notes:**
  > *"Slide 7 benchmark-tests CollabriX against industry titans Upwork, Fiverr, Freelancer, and Toptal, reproducing Table 2.1 from our report. Notice the structural divergence: on Upwork, teaming is restricted solely to formal legal agencies; on Fiverr and Freelancer, it is nonexistent. Toptal coordinates teams only through high-cost internal recruiters. CollabriX is the only platform that offers dynamic, first-class peer discovery, native Team Batches with algorithmic synergy evaluation, database-level rating integrity enforced by PostgreSQL RLS, and a public, mathematically verifiable leaderboard."*

---

## Slide 8: Technology Stack & Technical Justification
- **Theme:** Light Content Slide
- **Kicker:** ENGINEERING FOUNDATION
- **4 Tiers:**
  - *Frontend:* React 18 (reactive UI), TypeScript 5 (schema-synced static types), Vite (< 2s production Rollup builds).
  - *UI & Styling:* Tailwind CSS (curated design tokens), shadcn/ui & Radix (accessible headless primitives), Lucide React (SVG icons).
  - *Client State:* TanStack Query v5 (server-state caching & optimistic updates), Zod (runtime validation), React Router 6.
  - *Backend & DB:* Supabase (GoTrue auth & WebSockets), PostgreSQL 16 (ACID, ENUMs, triggers, RPCs), Row-Level Security.
- **Verbatim Speaker Notes:**
  > *"Slide 8 outlines the four layers of our technology stack, justified in Table 3.1 of our report. On the client, React 18 and Vite deliver sub-2-second build times and rapid HMR, while TypeScript enforces strict type consistency with our Supabase database schema. Our UI pairs Tailwind CSS with accessible shadcn/ui primitives. For client-side caching and state synchronization, TanStack Query provides optimistic updates and automatic cache invalidation. Crucially, instead of writing a redundant Express.js backend layer that introduces latency and vulnerability surfaces, we leverage Supabase with PostgreSQL 16. Business rules, validation triggers, and access control policies live directly inside the database, broadcasting instant state updates via Supabase Realtime WebSockets."*

---

## Slide 9: System Architecture: 4-Tier Layered Blueprint
- **Theme:** Light Content Slide
- **Visual:** Layered Architecture Diagram (Figure 3.3 from Report)
- **Tiers:** Presentation Layer $\rightarrow$ Client State Layer $\rightarrow$ BaaS Layer $\rightarrow$ PostgreSQL Relational Security Layer.
- **Verbatim Speaker Notes:**
  > *"Slide 9 displays the four-tier architectural blueprint of CollabriX, representing Figure 3.3 from our documentation. At the top is the Presentation Layer, built with responsive mobile-first React components and accessible Radix primitives. Directly below it, the Client State Layer isolates server communication into modular React hooks like useAuth, useProjects, and useNotificationFeed, ensuring clean separation of concerns and eliminating component-level side effects. The third tier is the Backend-as-a-Service layer powered by Supabase, providing authenticated PostgREST queries and WebSocket subscriptions. The foundational tier is PostgreSQL 16. By anchoring authorization, state machines, and notification creation inside the database engine, CollabriX guarantees zero unauthorized operations even if a client attempts to bypass the web frontend."*

---

## Slide 10: Database Architecture: 12 Relational Tables
- **Theme:** Light Content Slide
- **Kicker:** DATA PERSISTENCE
- **7 Core Tables:** `profiles`, `user_roles`, `connections`, `messages`, `projects`, `project_ratings`, `user_ratings`.
- **5 New Extension Tables:** `team_batches`, `notifications`, `project_invitations`, `user_settings`, `support_tickets`.
- **Relational Guarantees:** PK inheritance from `auth.users.id` with `ON DELETE CASCADE`.
- **Verbatim Speaker Notes:**
  > *"Turning to Slide 10, CollabriX is built upon twelve relational tables in the public PostgreSQL schema, detailed in Table 3.10 of our report. The architecture is bifurcated into two groups: The seven core tables manage user profiles, role enforcement, peer connections, realtime messages, project listings, and dual-party ratings. The collaboration extension introduced five new tables: team_batches for squad composition, notifications for trigger-driven alerts, project_invitations for client outreach, user_settings for privacy control, and support_tickets for issue reporting. Every profile primary key links directly to auth.users with ON DELETE CASCADE, allowing Row-Level Security policies to evaluate auth.uid() efficiently."*

---

## Slide 11: Database Design: The 5 New Tables Deep-Dive
- **Theme:** Light Content Slide
- **Kicker:** DATABASE ENGINEERING
- **Deep-Dive Schema & Triggers:**
  - `team_batches`: 1–10 members, connection check trigger, JSONB member storage.
  - `notifications`: 10 enum event types, client insert strictly blocked, trigger-only writes.
  - `project_invitations`: `UNIQUE(project, dev)`, developer acceptance prerequisite.
  - `user_settings`: Privacy toggle (`show_on_leaderboard`), notification preferences.
  - `support_tickets`: Subject length (5–150), description length (20–5000) CHECK constraints.
- **Verbatim Speaker Notes:**
  > *"Slide 11 delves into the precise technical schema and constraints of our five new extension tables. In team_batches, a database BEFORE trigger validates that every member is an accepted connection of the creator and limits size to 10. In notifications, client-side INSERT is completely disabled; records are written solely by database triggers responding to business events. In project_invitations, composite unique constraints prevent invitation spam, and project assignment requires the developer to accept first. In user_settings, developers are granted privacy sovereignty, allowing them to opt out of the public leaderboard. Finally, support_tickets enforces text length CHECK constraints and auto-increments public ticket identifiers."*

---

## Slide 12: Connections & Peer Discovery Protocol
- **Theme:** Light Content Slide
- **Kicker:** NETWORKING WORKFLOW
- **4 Steps:** Discovery $\rightarrow$ Request Dispatch $\rightarrow$ Receiver Evaluation $\rightarrow$ Realtime Unlocked.
- **State Machine:** None $\rightarrow$ Pending (Sent/Received) $\rightarrow$ Accepted / Rejected.
- **RPC Solution:** `mark_messages_read(connection)` security-definer function solves RLS read-flag paradox.
- **Verbatim Speaker Notes:**
  > *"Slide 12 explains our Connections and Peer Discovery protocol. Developers discover peers using our multi-tier regional filter and technical skill tags. The connection follows a four-step request-accept lifecycle similar to LinkedIn. Crucially, messaging and team formation are strictly gated by the 'accepted' status. We also solved a notable database permissions paradox: under strict RLS, users could not update someone else's message row to set is_read=true. To resolve this securely, we built the mark_messages_read security-definer function, which validates that the caller is indeed the recipient and marks messages read, dynamically clearing navigation unread counters in real time."*

---

## Slide 13: Team Formation Engine & Synergy Algorithm
- **Theme:** Light Content Slide
- **Visual:** Synergy Algorithm Flowchart (Figure 3.14)
- **Algorithm 1 Formula:**
  $$\text{Coverage Ratio} = \frac{|Covered\ Skills|}{|Domain\ Benchmark\ Stack|}, \quad \text{Bonus} = \min(10 \times |Members|, 30)$$
  $$\text{Score} = \min(\text{round}(70 \times \text{Coverage Ratio} + \text{Bonus}), 100)$$
- **Worked Example:** 2-member Fullstack Web squad covering 4 of 6 skills scores **67%**; UI highlights missing skills (AWS, UI/UX).
- **Verbatim Speaker Notes:**
  > *"Slide 13 details our proprietary Team Formation Engine and Algorithm 1, illustrated in Figure 3.14. When assembling a team batch, the creator selects a target project domain, such as Fullstack Web App, Mobile Engineering, or Cloud Infrastructure. The engine computes the mathematical union of all members' skills and evaluates it against the domain's recommended technology benchmark. The formula awards up to 70 points for skill coverage and up to 30 bonus points for team capacity, capped at 100%. For example, a two-developer squad covering four of six required stack technologies achieves a 67% synergy score. Crucially, the UI highlights the remaining two missing skills as skill gaps, prompting the squad to recruit a complementary peer before submitting a project proposal."*

---

## Slide 14: Project Lifecycle Management
- **Theme:** Light Content Slide
- **Visual:** Project & Invitation State Diagrams (Figure 3.11)
- **Lifecycle Machine:** Open $\rightarrow$ In Progress $\rightarrow$ Completed / Cancelled.
- **Algorithm 3:** Client issues Invitation $\rightarrow$ Developer accepts $\rightarrow$ Client triggers Assign action.
- **Verbatim Speaker Notes:**
  > *"Slide 14 explains our Project Lifecycle and Algorithm 3, depicted in Figure 3.11. In CollabriX, project progression is governed as a deterministic four-stage finite state machine: Open, In Progress, Completed, and Cancelled. To ensure developer autonomy, a client cannot unilaterally assign a project to a freelancer. Instead, Algorithm 3 enforces an invitation-gated assignment protocol: the client sends an invitation, the developer reviews and accepts it, and only then does the database permit the client to assign the project. Once marked 'Completed' by the client, the project unlocks mutual rating capabilities. If a project is cancelled, ratings are disabled permanently to prevent retaliatory negative reviews."*

---

## Slide 15: Security Model: PostgreSQL Row-Level Security
- **Theme:** Light Content Slide
- **Kicker:** CYBERSECURITY ARCHITECTURE
- **3 Pillars:**
  - *RLS on 12 Tables:* `auth.uid() = user_id` tenant isolation, zero anonymous writes.
  - *Definer RPCs:* Eliminating recursion via `has_role()`, `create_notification()`, `get_leaderboard()`.
  - *Threat Matrix:* Separate `user_roles` prevents privilege escalation; composite connection check prevents eavesdropping.
- **Verbatim Speaker Notes:**
  > *"Slide 15 presents our database security architecture. Rather than relying on frontend checks that can be circumvented via API inspection, CollabriX anchors access control directly inside PostgreSQL using Row-Level Security on all 12 tables. To avoid infinite recursion during complex relational joins—such as checking whether a user is a client while evaluating a project policy—we engineered security-definer helper functions that execute with administrative privileges while strictly validating auth.uid(). Our threat mitigation model, detailed in Table 3.16 of the report, prevents privilege escalation by storing roles in a separate table, blocks eavesdropping on messages, and makes review forgery mathematically impossible."*

---

## Slide 16: Two-Way Ratings & Reputation Integrity
- **Theme:** Light Content Slide
- **Visual:** Rating Submission Flowchart (Figure 3.15)
- **5 Pillars:** Completion-gated check, counterpart validation, idempotency (`UNIQUE(project, rater)`), dual project/peer feedback, immutability.
- **Verbatim Speaker Notes:**
  > *"Slide 16 details our two-way rating system and reputation integrity rules, illustrated in Figure 3.15. To combat the pervasive rating inflation and fake reviews seen on mainstream platforms, CollabriX enforces five non-negotiable database rules. First, reviews are strictly completion-gated: if a project is not marked 'completed', all rating inserts are rejected with a permission error. Second, only the two contractual counterparts can rate each other. Third, composite unique constraints guarantee exactly one rating per participant per contract. Fourth, we separate project feedback from individual peer evaluations. And fifth, ratings are completely immutable once committed, preventing retaliatory score tampering."*

---

## Slide 17: Automated Event-Driven Notification Pipeline
- **Theme:** Light Content Slide
- **Visual:** Notification Pipeline Architecture (Figure 3.16)
- **Mechanics:** 10 event triggers invoke `create_notification()` $\rightarrow$ checks `user_settings` $\rightarrow$ broadcasts via WebSockets $\rightarrow$ zero client-side insertion forgery.
- **Verbatim Speaker Notes:**
  > *"Slide 17 depicts our event-driven notification pipeline from Figure 3.16. Unlike conventional architectures where the frontend or API layer pushes notifications manually, CollabriX generates notifications exclusively via PostgreSQL AFTER triggers on our event tables. Whenever a connection is accepted, a teammate is added to a batch, or a project is assigned, our create_notification function executes. It checks the recipient's notification preferences in user_settings, discards actions caused by the user themselves, and inserts the record. Because direct client insertion is prohibited, every notification is cryptographic proof of a verified database event. The change is broadcast over WebSockets directly to the user's header badge in sub-second time."*

---

## Slide 18: Leaderboard Ranking: Mathematical Model
- **Theme:** Light Content Slide
- **Kicker:** REPUTATION MATHEMATICS
- **Algorithm 2 Formula:**
  $$\text{Score}(d) = 100 \times C(d) + 20 \times \sum_{r \in R(d)} \text{Rating}(r)$$
- **Principles:** Zero-baseline rule (no fake starting 4.5 score), deterministic tie-breaking (Score $\downarrow$, Avg $\downarrow$, Count $\downarrow$, Name $\uparrow$), dynamic time filtering.
- **Verbatim Speaker Notes:**
  > *"Slide 18 details our Leaderboard Ranking Formula, implemented as Algorithm 2 in PostgreSQL. Unlike commercial platforms that employ black-box algorithms prioritizing platform profit or ad spend, CollabriX uses a completely open, meritocratic formula executed inside the database via get_leaderboard. A developer earns 100 points for each verified completed project and 20 points per star awarded by their client. Thus, a flawless 5-star project yields exactly 200 points. We enforce a strict zero-baseline rule: newcomers do not receive arbitrary placeholder scores and only appear on the board after completing real work. Ties are broken deterministically through a multi-tier hierarchy: average rating, review count, and alphabetical name."*

---

## Slide 19: Leaderboard in Action: Worked Example & Tiers
- **Theme:** Light Content Slide
- **Visual:** Worked Example Table (Table 3.19) + Achievement Badges
- **Scores Walkthrough:**
  - *Chen:* 3 Completed, Ratings [2, 2, 2] $\rightarrow 300 + 120 = \mathbf{420}$ (Rank 1 — Volume rewarded)
  - *Asha:* 2 Completed, Ratings [5, 5] $\rightarrow 200 + 200 = \mathbf{400}$ (Rank 2)
  - *Ben:* 2 Completed, Ratings [5, 3] $\rightarrow 200 + 160 = \mathbf{360}$ (Rank 3)
  - *Dina & Eli:* Tied at 180 points $\rightarrow$ Dina ranks 4th, Eli ranks 5th alphabetically.
  - *Farah:* 0 Completed $\rightarrow$ Unranked (no fake baseline).
- **Tiers & Badges:** Bronze (1–200), Silver (201–500), Gold (501–1000), Diamond (1000+); 6 achievement badges.
- **Verbatim Speaker Notes:**
  > *"Slide 19 walks through Table 3.19 from our report, demonstrating the leaderboard formula in action for six sample developers. Notice the deliberate design trade-off: our formula deliberately rewards the volume of verified delivery. Chen, who delivered three projects with 2-star ratings, scores 420 points and ranks first above Asha, who has two 5-star projects totaling 400 points. This reflects commercial reality: delivering verified client work carries high value. Dina and Eli have identical completed work and ratings; the algorithm breaks the tie deterministically by alphabetical name. Farah has zero completed work, so she remains cleanly unranked rather than receiving an unearned synthetic score. On the right, developer scores unlock four tier milestones and six milestone achievement badges."*

---

## Slide 20: Developer Workspace & Realtime Messaging
- **Theme:** Light Content Slide
- **Visual:** Screenshots (Figure 4.4 from Report)
- **Features:** Developer profile with skill pills and star rating calculation; real-time chat between accepted connections via `messages-${connectionId}` WebSocket channel.
- **Verbatim Speaker Notes:**
  > *"Slide 20 showcases live application screenshots from Figure 4.4 of our documentation, captured from our production build. On the left, Screen (a) shows the Developer Profile view, displaying verified skills, level tier, and star ratings computed from database joins. On the right, Screen (b) demonstrates our real-time messaging interface. Chat channels are established exclusively between accepted connections. Messages are delivered instantly via Supabase Realtime WebSocket subscriptions without polling overhead. Opening the conversation automatically invokes mark_messages_read, clearing unread counters across the mobile navigation bar."*

---

## Slide 21: Team Formation Engine & Client Dashboard
- **Theme:** Light Content Slide
- **Visual:** Screenshots (Figure 4.5 from Report)
- **Features:** Interactive squad builder with live 67% synergy score badge and missing skill alerts; client dashboard showing project budget and candidate tracking.
- **Verbatim Speaker Notes:**
  > *"Slide 21 illustrates the Team Formation Engine and Client Dashboard from Figure 4.5. On the left, Screen (a) shows a developer constructing a Team Batch for a Fullstack Web App. As teammates are toggled, the synergy score updates reactively to 67%, and the interface flags missing technologies like AWS and UI/UX. On the right, Screen (b) displays the Client Dashboard, providing project founders with an overview of active projects, budget allocations, candidate invitations, and direct access to project creation modals."*

---

## Slide 22: Notifications & Project Tracking Interface
- **Theme:** Light Content Slide
- **Visual:** Screenshots (Figure 4.6 from Report)
- **Features:** Notifications feed with avatars and unread highlight dots; project details tracking invitation status with disabled 'Assign' button until developer accepts.
- **Verbatim Speaker Notes:**
  > *"Slide 22 presents our Notifications Center and Project Tracking interface from Figure 4.6. On the left, Screen (a) shows the live Notification Feed, displaying event alerts with user avatars and relative timestamps. Clicking any notification marks it as read and navigates directly to the associated project or message thread. On the right, Screen (b) illustrates the Client Project Details view. Notice that a developer has been invited; the invitation status is tracked as 'pending', and the 'Assign' button remains disabled until the invited developer explicitly accepts, visually confirming that our database-enforced lifecycle rules are active."*

---

## Slide 23: Test Results: 104 DB Checks & Quality Metrics
- **Theme:** Light Content Slide
- **Visuals:** Figure 4.10 Database Test Breakdown Chart & Figure 4.9 Lighthouse Category Scores
- **KPI Metrics:**
  - **104 / 104 Database Integrity Checks Passed** (100% Pass Rate across 11 areas).
  - **18 / 18 Puppeteer UI Browser Tests Passed**.
  - **0 TypeScript Compiler Errors** (`npx tsc --noEmit`).
  - **ESLint 49 $\rightarrow$ 2** (14 errors & 35 warnings resolved).
  - **Google Lighthouse:** Performance 76 · Accessibility 84 · Best Practices 100 · SEO 100 (411 KB bundle).
- **Verbatim Speaker Notes:**
  > *"Slide 23 delivers our empirical quality assurance and verification benchmarks, validating the reliability of CollabriX. First, we built an automated Python test suite that executed all 104 database integrity checks against PostgreSQL 16. As shown in Figure 4.10, every single check passed—validating connections, team batch constraints, invitation gating, completion-gated ratings, and anonymous RLS restrictions. Second, 18 automated Puppeteer browser tests verified authentication, form validation, and navigation flows. Third, our codebase compiles with zero TypeScript errors, and we reduced ESLint findings from 49 down to just 2 minor development warnings. Finally, an independent Google Lighthouse mobile audit awarded CollabriX perfect 100/100 scores in Best Practices and SEO, with 84 in Accessibility and 76 in Performance on a 411 KB bundle."*

---

## Slide 24: Limitations & Future Work
- **Theme:** Light Content Slide
- **Current Limitations:** Curated job listings, relational keyword search, text-only chat, simulated financial escrow.
- **Future Roadmap:** AI-powered team recommendations via GitHub vector embeddings, automated OAuth repository verification, WebRTC video calling, Stripe milestone escrow, native React Native mobile app.
- **Verbatim Speaker Notes:**
  > *"Slide 24 provides an honest appraisal of our current prototype limitations alongside our future development roadmap. Presently, job postings are curated, search uses relational filters rather than semantic embeddings, chat is text-only, and payment escrow is simulated through project lifecycle states. In our future roadmap, we plan to implement AI-driven team recommendations using vector similarity over GitHub profiles, integrate automated GitHub repository verification, embed WebRTC for native video standups, implement Stripe escrow payments with milestone disbursements, and build a native React Native application for mobile push notifications."*

---

## Slide 25: Conclusion & Q&A
- **Theme:** Dark Teal Background (`#0B2528`), Teal Accents
- **Key Summary:** Validated team-first collaboration paradigm, database-enforced integrity via PostgreSQL RLS, 104 passing tests, transparent reputation math.
- **Acknowledgements:** Sincere gratitude to Assistant Prof. Barkha Makwana and the Department of Computer Science & Engineering, Parul University.
- **Verbatim Speaker Notes:**
  > *"In conclusion, CollabriX successfully proves that transitioning freelance marketplaces from solitary bidding queues to an architectural team-first paradigm empowers developers to deliver complex software while guaranteeing fair, verified reputation tracking. By enforcing business governance directly in PostgreSQL through Row-Level Security and stored procedures, we have built a platform that is secure by design and verified by 104 passing database tests and top Lighthouse scores. We express our sincere gratitude to our project guide, Assistant Professor Barkha Makwana, and the Department of Computer Science and Engineering at Parul University for their continuous encouragement and technical guidance. Thank you for your attention, and we are now pleased to open the floor to your questions and discussion."*
