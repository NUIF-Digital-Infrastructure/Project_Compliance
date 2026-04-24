# Aim: Build a Stock Compliance tool

-----

## Background Info

A stock from a restricted sector typically refers to a company operating in an industry that is excluded from certain investment portfolios due to regulatory, ethical, or mandate-specific constraints (e.g., gambling, tobacco, or weapons). To "check growth" and verify if it is "below 10% of group revenue" means assessing whether a specific, potentially controversial business segment contributes a small enough portion of the overall company’s income to still qualify for investment.

---

## 1. Restricted Sectors

In finance, sectors are restricted based on specific criteria:

* **SRI/ESG Mandates:** Many funds "restrict" sectors like fossil fuels, weapons, or adult entertainment to align with Socially Responsible Investing (SRI) goals.
* **Regulatory Compliance:** In some jurisdictions, institutional investors are prohibited from owning companies in sectors deemed high-risk or politically sensitive.
* **Internal Bank Lists:** Financial institutions maintain "Restricted Lists" for stocks where they have material non-public information, preventing employees from trading them to avoid insider trading.

---

## 2. Checking Growth

Checking growth involves evaluating the trajectory of the restricted segment versus the parent company:

* **Revenue Growth:** Is the "restricted" part of the business growing faster than the core business? If so, it might soon exceed the 10% threshold.
* **Earnings Growth:** Investors look at the PEG ratio (Price-to-Earnings Growth) to see if they are paying a fair price for the expected expansion of that segment.

---

## 3. The "10% of Group Revenue" Rule

This is a common "de minimis" threshold used to determine if a company's involvement in a restricted activity is negligible enough to ignore.

* **How to Check:** Divide the Segment Revenue by the Total Group Revenue.
* **Formula:**


  $(Restricted\ Segment\ Revenue / Total\ Company\ Revenue) \times 100$

* **Reporting Requirements:** Under accounting standards like IFRS 8 or ASC 280, companies must disclose segments that contribute 10% or more to total revenue, assets, or profits.
* **Investment Implications:** If a company generates only 5% of its revenue from a restricted sector (like a supermarket selling a small amount of tobacco), it may still be included in an "ethical" fund that has a 10% tolerance limit.

---

## 4. Check for Sustainability Goals

This is the Inclusionary Step. Before looking for reasons to reject a stock, you first verify if it contributes positively to at least one established sustainability framework, such as the [UN Sustainable Development Goals (SDGs)].

* **The Goal:** To identify companies whose core business (like renewable energy or accessible healthcare) actively advances a sustainable future.

---

## 5. Monitoring Flags Concern

This is the Risk Detection Step. You use data from ESG providers (like MSCI or Sustainalytics) to see if there are any "red flags" or "controversies" attached to the company.

* **Common Flags:** Ongoing lawsuits, environmental spills, labor strikes, or allegations of bribery.
* **The Goal:** To trigger a deeper manual review if the automated "flag" suggests the company's behavior might contradict its sustainability claims.

---

## 6. Check 10% Exclusion Violation

This is the Threshold Test. Many funds use a "de minimis" rule—they will tolerate a small amount of "restricted" activity, but only up to a certain limit (usually 10% of total revenue).

* **Example:** A massive tech conglomerate that earns 2% of its revenue from a defense contract might be allowed, whereas a dedicated weapons manufacturer would be excluded.
* **The Goal:** To determine if the "bad" part of the business is small enough to be considered incidental rather than core.

---

## 7. Unethical with Substantiated Evidence

This is the Final Veto Step. Even if a company passes the 10% revenue test, it can still be excluded if there is substantiated evidence of severe unethical behavior that cannot be quantified by revenue alone.

* **Substantiated Evidence:** Verifiable proof from third-party audits, court rulings, or investigative journalism (e.g., proof of forced labor in a supply chain).
* **The Goal:** To provide a moral backstop. If the company is technically compliant with the 10% rule but is fundamentally "unethical" based on proven facts, it is disqualified entirely.

---

## 8. "Is it corrected?" – Verification of Remediation

The compliance officer or fund manager checks if the specific "unethical" behavior or "red flag" is a thing of the past.

* **Substantiated Fix:** Has the company fired the responsible executives, paid the fines, or changed its supply chain policies?
* **Audit Evidence:** Is there [independent verification]

---

# Division of Tasks

* **Sarah & Shalom:** Build the core of the Flow chart - use Mock Values/Dummy data to test out the flow
* **Ryan:** Search for API Keys to extract core information and data points from ticker inputs. Can get as creative in terms of data extraction

---

# Decision Flow

## Step 1: Check if Stock is from Restricted Sector

* If Yes - proceed to next check
* No - Invest

### Restricted Sectors (17 Mandatory Notification Sectors)

Under the NSI Act, 17 sectors are designated as requiring mandatory notification for investments:

* Advanced Materials
* Advanced Robotics
* Artificial Intelligence
* Civil Nuclear
* Communications
* Computing Hardware
* Critical Suppliers to Government
* Cryptographic Authentication
* Data Infrastructure
* Defence
* Energy
* Military and Dual-Use
* Quantum Technologies
* Satellite and Space Technologies
* Suppliers to the Emergency Services
* Synthetic Biology
* Transport

---

## Step 2: Check Restricted Sector Growth

Check if it is below 10% of group revenue:

* If Yes - proceed to next check
* No - Do not Invest

---

## Step 3: Check Sustainability Goals

* If Yes - Invest But - proceed to next check
* No - Do not invest

---

## Step 4: Monitoring Flags Concern

* Yes - proceed to next check
* No - No action

---

## Step 5: Check 10% Exclusion Violation

* Yes - Disinvest
* No - Proceed to next check

---

## Step 6: Unethical with Substantiated Evidence

* Yes - proceed to next check
* No - No action

---

## Step 7: Engage – Is it Corrected?

* If Yes - no further action
* If No - disinvest

---

At the end user should be able to view the entire report of the compliance checks done and their result.
