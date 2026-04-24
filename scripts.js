// Mock data for different stocks and sectors
const mockData = {
    'AAPL': {
        name: 'Apple Inc.',
        sector: 'Technology',
        restricted: false,
        info: 'Market Cap: $3.2T | Revenue: $394B | Primary: Consumer Electronics'
    },
    'RTX': {
        name: 'Raytheon Technologies',
        sector: 'Defense',
        restricted: true,
        info: 'Market Cap: $210B | Revenue: $67B | Primary: Defense & Aerospace'
    },
    'BAC': {
        name: 'Bank of America',
        sector: 'Finance',
        restricted: false,
        info: 'Market Cap: $320B | Revenue: $88B | Primary: Banking Services'
    },
    'PM': {
        name: 'Philip Morris International',
        sector: 'Consumer Staples',
        restricted: true,
        info: 'Market Cap: $140B | Revenue: $35B | Primary: Tobacco & Alternatives'
    },
    'MSFT': {
        name: 'Microsoft Corporation',
        sector: 'Technology',
        restricted: true,
        info: 'Market Cap: $3.1T | Revenue: $245B | Primary: Cloud & Software (with Defense contracts 8%)'
    }
};

// Restricted sectors list
const restrictedSectors = [
    'Advanced Materials',
    'Advanced Robotics',
    'Artificial Intelligence',
    'Civil Nuclear',
    'Communications',
    'Computing Hardware',
    'Critical Suppliers to Government',
    'Cryptographic Authentication',
    'Data Infrastructure',
    'Defence',
    'Energy',
    'Military and Dual-Use',
    'Quantum Technologies',
    'Satellite and Space Technologies',
    'Suppliers to the Emergency Services',
    'Synthetic Biology',
    'Transport'
];

// Application state
let state = {
    currentStep: 0,
    ticker: '',
    mockDataForTicker: null,
    answers: {}, // Store answers for each step
    completed: false
};

// DOM Elements
const inputSection = document.getElementById('inputSection');
const progressSection = document.getElementById('progressSection');
const stockInfoSection = document.getElementById('stockInfoSection');
const checklistSection = document.getElementById('checklistSection');
const resultsSection = document.getElementById('resultsSection');
const submitBtn = document.getElementById('submitBtn');
const ticker = document.getElementById('ticker');
const inputError = document.getElementById('inputError');
const progressFill = document.getElementById('progressFill');
const stepCounter = document.getElementById('stepCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const companyName = document.getElementById('companyName');
const companyInfo = document.getElementById('companyInfo');
const resultContent = document.getElementById('resultContent');

// Event Listeners
submitBtn.addEventListener('click', startCompliance);
ticker.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startCompliance();
});
prevBtn.addEventListener('click', () => goToStep(state.currentStep - 1));
nextBtn.addEventListener('click', () => goToStep(state.currentStep + 1));
resetBtn.addEventListener('click', resetForm);

// Answer buttons event delegation
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('yes-btn') || e.target.classList.contains('no-btn')) {
        handleAnswer(e.target);
    }
});

// Main functions
function startCompliance() {
    const tickerValue = ticker.value.toUpperCase().trim();
    inputError.textContent = '';

    if (!tickerValue) {
        inputError.textContent = 'Please enter a stock ticker.';
        return;
    }

    // Check if we have mock data or create generic data
    state.ticker = tickerValue;
    state.mockDataForTicker = mockData[tickerValue] || {
        name: `${tickerValue} Corporation`,
        sector: 'Technology',
        restricted: Math.random() > 0.6,
        info: `Market Cap: $${Math.floor(Math.random() * 1000)}B | Revenue: $${Math.floor(Math.random() * 100)}B | Primary: General Operations`
    };

    state.currentStep = 0;
    state.answers = {};
    state.completed = false;

    // Show relevant sections
    inputSection.classList.add('hidden');
    progressSection.classList.remove('hidden');
    stockInfoSection.classList.remove('hidden');
    checklistSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');

    // Display company info
    displayStockInfo();

    // Show first step
    goToStep(0);
}

function displayStockInfo() {
    const data = state.mockDataForTicker;
    companyName.textContent = data.name;
    companyInfo.textContent = data.info;
}

function generateMockDataForStep(step) {
    const data = state.mockDataForTicker;
    const mockResponses = {
        0: `${data.name} is classified in the ${data.sector} sector.${data.restricted ? ' This sector is in the restricted list.' : ' This sector is NOT restricted.'}`,
        1: `Restricted segment revenue: ${Math.floor(Math.random() * 15)}% of total group revenue. Data source: SEC Filings`,
        2: `SDG Alignment: ${['Clean Energy Initiative', 'Healthcare Innovation', 'Education Programs', 'Carbon Neutrality Goal 2030', 'No alignment detected'][Math.floor(Math.random() * 5)]}. Source: ESG Report 2025`,
        3: `ESG Risk Score: ${Math.floor(Math.random() * 100)}/100 | Flags: ${Math.random() > 0.5 ? 'None detected' : 'Pending litigation, Environmental concerns'}`,
        4: `De Minimis Threshold Check: ${Math.floor(Math.random() * 12)}% vs 10% limit. ${Math.random() > 0.5 ? 'COMPLIANT' : 'NON-COMPLIANT'}`,
        5: `Evidence review status: ${['Verified remediation', 'Under investigation', 'No incidents found', 'Pending audit'][Math.floor(Math.random() * 4)]}`,
        6: `Remediation status: ${['Completed 2024', 'In progress', 'Not started', 'Verified by third party'][Math.floor(Math.random() * 4)]}`
    };
    return mockResponses[step] || 'No additional data available.';
}

function goToStep(stepIndex) {
    if (stepIndex < 0 || stepIndex > 6) return;

    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.add('hidden');
    });

    // Show current step
    state.currentStep = stepIndex;
    const currentStep = document.getElementById(`step${stepIndex + 1}`);
    currentStep.classList.remove('hidden');

    // Update progress
    updateProgress();

    // Generate and display mock data
    const mockText = generateMockDataForStep(stepIndex);
    const mockDataElement = document.getElementById(`step${stepIndex + 1}Result`);
    if (mockDataElement) {
        mockDataElement.textContent = mockText;
    }

    // Update navigation buttons
    updateNavigationButtons();

    // Restore previous answer if exists
    restorePreviousAnswer(stepIndex);

    // Scroll to step
    currentStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateProgress() {
    const totalSteps = 7;
    const progress = ((state.currentStep + 1) / totalSteps) * 100;
    progressFill.style.width = `${progress}%`;
    stepCounter.textContent = `Step ${state.currentStep + 1} of ${totalSteps}`;
}

function updateNavigationButtons() {
    prevBtn.classList.toggle('hidden', state.currentStep === 0);
    nextBtn.classList.toggle('hidden', state.currentStep === 6);
}

function handleAnswer(button) {
    const step = button.dataset.step;
    const result = button.dataset.result;

    // Store answer
    state.answers[step] = result;

    // Update button states
    button.parentElement.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');

    // Check for auto-progression rules
    const shouldAutoProgress = checkAutoProgression(step, result);

    if (shouldAutoProgress) {
        setTimeout(() => {
            if (state.currentStep < 6) {
                goToStep(state.currentStep + 1);
            } else {
                showResults();
            }
        }, 500);
    }
}

function checkAutoProgression(step, result) {
    // Auto-progress based on decision tree logic
    const stepNum = parseInt(step);

    // If "Not Restricted" at step 1, show result immediately
    if (stepNum === 0 && result === 'no') {
        return true;
    }

    // If "Above 10%" at step 2, show result immediately
    if (stepNum === 1 && result === 'no') {
        return true;
    }

    // If "No contribution" at step 3, show result immediately
    if (stepNum === 2 && result === 'no') {
        return true;
    }

    // If "No flags" at step 4, skip to step 5 (already moves to next)
    if (stepNum === 3 && result === 'no') {
        return true;
    }

    // If "Violates" at step 5, show result immediately
    if (stepNum === 4 && result === 'yes') {
        return true;
    }

    // Continue to final step for normal flow
    if (stepNum >= 6) {
        return true;
    }

    return false;
}

function restorePreviousAnswer(stepIndex) {
    const stepNum = stepIndex + 1;
    const previousAnswer = state.answers[stepNum];

    if (previousAnswer) {
        const buttons = document.querySelectorAll(`[data-step="${stepNum}"]`);
        buttons.forEach(btn => {
            if (btn.dataset.result === previousAnswer) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
    }
}

function showResults() {
    // Hide other sections
    progressSection.classList.add('hidden');
    stockInfoSection.classList.add('hidden');
    checklistSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    // Generate final recommendation
    const recommendation = generateRecommendation();
    resultContent.innerHTML = recommendation;

    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generateRecommendation() {
    const answers = state.answers;
    const data = state.mockDataForTicker;

    let html = '<div class="result-details">';
    html += '<h3>Assessment Summary</h3>';
    html += `<p><strong>Stock:</strong> ${data.name} (${state.ticker})</p>`;
    html += `<p><strong>Sector:</strong> ${data.sector}</p>`;

    // Decision logic based on flow chart
    let recommendation = '';
    let reasoning = '';

    // Step 1: Check if restricted
    if (answers[1] === 'no') {
        recommendation = 'INVEST';
        reasoning = '✓ Company is not from a restricted sector. Compliance check cleared.';
    }
    // Step 2: Check growth
    else if (answers[2] === 'no') {
        recommendation = 'DO NOT INVEST';
        reasoning = '✗ Restricted segment exceeds 10% of group revenue. Investment criteria not met.';
    }
    // Step 3: Check sustainability
    else if (answers[3] === 'no') {
        recommendation = 'DO NOT INVEST';
        reasoning = '✗ No contribution to UN Sustainable Development Goals. Investment criteria not met.';
    }
    // Step 4: Check flags
    else if (answers[4] === 'yes') {
        reasoning += '⚠ ESG red flags detected. ';
        // Step 5: Check 10% violation
        if (answers[5] === 'yes') {
            recommendation = 'DISINVEST';
            reasoning += 'Company violates 10% de minimis rule. Recommend divestment.';
        } else {
            // Continue to step 6
            // Step 6: Check unethical evidence
            if (answers[6] === 'yes') {
                // Step 7: Check if corrected
                if (answers[7] === 'yes') {
                    recommendation = 'INVEST BUT MONITOR';
                    reasoning += 'Issues detected but remediated. Proceed with caution and monitoring.';
                } else {
                    recommendation = 'DISINVEST';
                    reasoning += 'Unethical issues not corrected. Recommend divestment.';
                }
            } else {
                recommendation = 'INVEST BUT MONITOR';
                reasoning += 'No substantiated unethical evidence found. Proceed with regular monitoring.';
            }
        }
    } else {
        // No flags detected
        if (answers[6] === 'yes') {
            if (answers[7] === 'yes') {
                recommendation = 'INVEST BUT MONITOR';
                reasoning = '✓ Issues detected and corrected. Investment approved with monitoring.';
            } else {
                recommendation = 'DISINVEST';
                reasoning = '✗ Unethical issues not addressed. Investment not recommended.';
            }
        } else {
            recommendation = 'INVEST BUT MONITOR';
            reasoning = '✓ Passes all compliance criteria. Investment approved. Continue monitoring.';
        }
    }

    html += '</div>';

    html += `<div class="result-recommendation recommendation-${recommendation.toLowerCase().replace(/\s+/g, '-')}">`;
    html += `<h3>Final Recommendation: ${recommendation}</h3>`;
    html += `<p>${reasoning}</p>`;
    html += '</div>';

    html += '<div class="result-details">';
    html += '<h3>Response Summary</h3>';
    html += '<ul style="margin-left: 20px;">';
    html += `<li><strong>Step 1 - Restricted Sector:</strong> ${answers[1] === 'yes' ? 'YES - In Restricted List' : 'NO - Not Restricted'}</li>`;
    if (answers[1] === 'yes') {
        html += `<li><strong>Step 2 - Growth Check:</strong> ${answers[2] === 'yes' ? 'YES - Below 10%' : 'NO - Above 10%'}</li>`;
    }
    if (answers[2] === 'yes' || answers[3]) {
        html += `<li><strong>Step 3 - Sustainability Goals:</strong> ${answers[3] === 'yes' ? 'YES - Contributes to SDGs' : 'NO - No Contribution'}</li>`;
    }
    if (answers[4]) {
        html += `<li><strong>Step 4 - ESG Flags:</strong> ${answers[4] === 'yes' ? 'YES - Flags Present' : 'NO - No Flags'}</li>`;
    }
    if (answers[5]) {
        html += `<li><strong>Step 5 - 10% Exclusion:</strong> ${answers[5] === 'yes' ? 'YES - Violates Rule' : 'NO - Complies'}</li>`;
    }
    if (answers[6]) {
        html += `<li><strong>Step 6 - Unethical Evidence:</strong> ${answers[6] === 'yes' ? 'YES - Evidence Found' : 'NO - No Evidence'}</li>`;
    }
    if (answers[7]) {
        html += `<li><strong>Step 7 - Remediation:</strong> ${answers[7] === 'yes' ? 'YES - Corrected' : 'NO - Not Corrected'}</li>`;
    }
    html += '</ul>';
    html += '</div>';

    return html;
}

function resetForm() {
    // Reset state
    state = {
        currentStep: 0,
        ticker: '',
        mockDataForTicker: null,
        answers: {},
        completed: false
    };

    // Reset DOM
    ticker.value = '';
    inputError.textContent = '';
    inputSection.classList.remove('hidden');
    progressSection.classList.add('hidden');
    stockInfoSection.classList.add('hidden');
    checklistSection.classList.add('hidden');
    resultsSection.classList.add('hidden');

    // Clear all selections
    document.querySelectorAll('.yes-btn, .no-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Scroll to top
    inputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
