# Aim: Build a Stock Compliance tool

-----

## 1 Industry Benchmarking: The 4 Critical UK Pillars

To verify if the tool is "industry-ready" for a UK investment company, it must account for these four current regulatory frameworks:

### A. The Anti-Greenwashing Rule (In effect since May 31, 2024)

This is the biggest "noise" filter. Any UK investment firm making sustainability claims must ensure they are **substantiated, clear, and complete**.

  * **Verification:** Does the tool have a module to flag "vague" terms? The FCA now mandates that terms like "green" or "ethical" cannot be used unless they meet specific sustainability labels.

### B. SDR & Investment Labels (Phased in through Dec 2026)

As of late 2024, the UK has four official labels: **Sustainability Focus, Sustainability Improvers, Sustainability Impact,** and **Sustainability Mixed Goals**.

  * **Industry Standard:** A professional tool must verify that at least **70%** of the fund's assets align with its stated sustainability objective. If the tool doesn't have a "70% check," it is not up to date.

### C. The Consumer Duty (Annual Assessments starting July 2024)

This requires firms to prove "good outcomes" for retail customers.

  * **The Check:** An industry-grade tool must track **Price and Value** assessments. It’s no longer just "is this trade legal?" but "is this trade in the best interest of the end client's value?"

### D. Operational Resilience (Mandatory by March 31, 2025)

UK regulators now explicitly monitor how firms handle "important business services" during disruptions.

  * **The Check:** If this tool is meant to be a "gatekeeper," it needs to show it has **incident reporting** and **tolerance levels** built-in.

-----

## 2 How to Verify The Flowchart

**"Stress Test"**:

1.  **Jurisdiction Gap:** Does the flow chart distinguish between **Professional** and **Retail** clients? In the UK, the rules for a "Retail" investor (under Consumer Duty) are vastly stricter than for a "Sophisticated" investor.
2.  **The "Manual Override" Log:** In real UK firms, compliance isn't just a "Yes/No." It requires a **Senior Manager** to sign off on high-risk breaches (part of the **SM\&CR**—Senior Managers and Certification Regime). If the tool doesn't have an "Escalation Path," it’s too simple for a real fund.
3.  **Data Substantiation:** Where is the "source of truth"? A UK fund manager would ask: *"Which API are you using to verify the ESG rating? Is it MSCI? Sustainalytics?"* Using a "base" scraper isn't enough for UK compliance; it must be a recognized data provider.

-----

### Summary

To make this tool "general enough" for the UK ecosystem, ensure the focus on **FCA Naming and Marketing Rules**. If the tool can reliably flag when an analyst uses a "restricted term" (like *Impact*) without the correct data to back it up, you have a product that real UK compliance officers would actually use.


To make this "lightweight but essential," we will frame it as a **"Pre-Flight Compliance Check."**

Think of it like a "Linter" for code—it’s the tool a Junior or Mid-level Analyst runs *before* they present to the Investment Committee.

## **10-Point Checklist**, for **2024–2026 UK Standards**.

### The "Pre-Flight" UK Compliance Checklist

To ensure this tool is ready for the UK ecosystem, must implement logic for these 10 items.

#### 1. The "Anti-Greenwashing" Filter (FCA FG24/3)
* **The Check:** Scan the "Investment Thesis" text for restricted terms (e.g., *Green, Sustainable, Impact, Ethical*).
* **The Action:** If these terms are used, the tool must trigger a popup asking: *"Can this claim be substantiated with a specific data point or SDR label?"*
* **Significance:** Mandatory in the UK as of May 2024.

#### 2. The 10% Concentration Guardrail
* **The Check:** `(Current Holding + Proposed Trade) / Total Fund AUM`.
* **The Action:** Hard-block any trade that puts a single ticker above 10% of the total fund value.
* **Significance:** Standard risk management to prevent "single-point-of-failure" in a portfolio.

#### 3. Liquidity "Exit" Analysis
* **The Check:** `Trade Size / 30-Day Average Daily Volume (ADV)`.
* **The Action:** Warning flag if the trade is >2% of the ADV. 
* **Significance:** In a real fund, a large trade "moves the market." This ensures the analyst isn't proposing a trade we can't actually execute without slippage.

#### 4. The Consumer Duty "Retail vs. Pro" Toggle
* **The Check:** A simple dropdown: *Is this fund for Retail or Professional investors?*
* **The Action:** If "Retail," apply stricter risk warnings and a "Fair Value" justification box.
* **Significance:** Aligns with the **FCA Consumer Duty (Principle 12)** which requires "good outcomes" for retail customers.

#### 5. Sector Exposure Cap (The 25% Rule)
* **The Check:** Sum of all tickers in a specific GICS Sector (e.g., "Information Technology").
* **The Action:** Warning if total sector exposure exceeds 25%.
* **Significance:** Prevents "Hidden Correlation" where an analyst thinks they are diversified but is actually 50% in Tech.

#### 6. The "SM&CR" Audit Trail
* **The Check:** Every "Approved" or "Rejected" trade must be logged with a timestamp and a User ID.
* **The Action:** Create an "Audit Log" view for the Software Admin.
* **Significance:** Under the **Senior Managers and Certification Regime**, firms must be able to prove *who* approved *what* and *why*.

#### 7. Volatility Check (Portfolio Beta)
* **The Check:** Calculate the Ticker's $\beta$ (Beta) relative to the FTSE 100.
* **The Action:** Warning if $\beta > 1.4$.
* **Significance:** High-beta stocks can dramatically change the fund's risk profile overnight.

#### 8. Sanctions & Restricted List Check
* **The Check:** A simple JSON array (the "Blacklist") that the Admin can update.
* **The Action:** Immediate block if the ticker is on the list (e.g., "No Russian energy stocks").
* **Significance:** Fundamental legal compliance for UK firms.

#### 9. The "Golden Source" Verification
* **The Check:** Does the ticker exist on a primary UK exchange?
* **The Action:** Verify ticker via `yfinance` or a similar API.
* **Significance:** Prevents errors like "fat-fingering" a ticker or trying to buy a de-listed stock.

#### 10. The "Executive Summary" PDF Export
* **The Check:** A button to export the result.
* **The Action:** Generate a 1-page PDF showing the trade details and the "Pass/Fail" results of the checks above.
* **Significance:** This is the "Artifact" the analyst brings to their meeting. It’s the "Value" that keeps them coming back.

---

Capitalize on "laziness" (User Experience). The user provides one identifier, and the system does the heavy lifting to generate a professional output.

This design aligns with the **FCA’s operational efficiency guidelines** and the **Consumer Duty’s** requirement for clear, actionable information without "unreasonable barriers".

---

## 1. The Inputs

Split inputs into **Automated** and **Manual**. The user only touches the Manual items.

### A. Manual User Inputs (The "60-Second" Form)
* **Ticker/ISIN:** (e.g., `AZN.L` or `BP.L`). *This is the "1-Key" that triggers the rest of the data pull.*
* **Proposed Position Size:** Entered in GBP (£).
* **Investment Horizon:** A simple dropdown (e.g., <1yr, 1-3yrs, 5yrs+).
* **Sustainability Label:** A dropdown of the 4 UK SDR Labels (Focus, Improver, Impact, Mixed) or "None."
* **Thesis "Snapshot":** A 280-character text box (Think "Twitter for Finance").

### B. Automated Inputs (BTS)
The tool pulls these via `yfinance` or a UK-specific API to save the user time:
* **Current Market Price:** To calculate the number of shares.
* **Average Daily Volume (30D):** To calculate liquidity.
* **Sector/Industry Classification:** To check concentration.
* **Beta:** To measure volatility relative to the FTSE 100.
* **Sanctions Check:** Cross-reference the ticker against the [UK Office of Financial Sanctions Implementation (OFSI) list]

---

## 2. The Output (The "Pre-Flight" Report)

The output should be a single-page, high-contrast dashboard (or PDF) that an analyst can screenshot and send to their Lead. In the UK, this serves as a **Record of Suitability**.

### Section 1: The "Traffic Light" Status
A large visual indicator based on the 10-point checklist:
* **PASS:** Trade is within all fund mandates and FCA guidelines.
* **WARNING:** Trade is legal but exceeds a "Soft Limit" (e.g., high volatility).
* **REJECTED:** Trade violates a "Hard Limit" (e.g., Sanctions or 10% Concentration).

### Section 2: Key Metrics Table
| Metric | Result | Benchmark | Status |
| :--- | :--- | :--- | :--- |
| **Fund Concentration** | 6.2% | Max 10.0% | PASS |
| **Days to Liquidate** | 0.8 Days | Max 2.0 Days | PASS |
| **Portfolio Beta Shift**| +0.05 | Max +0.20 | PASS |
| **SDR Alignment** | "Improver" | SDR Validated | PASS |

### Section 3: The "FCA Compliance Memo"
A generated paragraph that uses professional terminology:
> *"This trade proposal for [Ticker] has been screened against the UK SDR Anti-Greenwashing rule and current OFSI Sanctions lists. As of [Date], the trade represents a 'Fair Value' outcome for a [Professional/Retail] client profile under Consumer Duty guidelines."*
