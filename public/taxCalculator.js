export async function calculateNetIncome(grossIncome, municipality, church) {
    const taxBrackets = [
        { limit: 18000, rate: 0.06 },
        { limit: 27000, rate: 0.175 },
        { limit: 45000, rate: 0.215 },
        { limit: 75000, rate: 0.31 },
        { limit: Infinity, rate: 0.34 }
    ];

    // Constants for earned income deduction calculation (example values, adjust to current year's parameters)
    const EARNED_INCOME_DEDUCTION_RATE = 0.12;  // 12% of earned income
    const MAX_EARNED_INCOME_DEDUCTION = 3500;   // Maximum deduction
    const DEDUCTION_DECREASE_RATE = 0.045;      // Decrease rate for high incomes
    const DEDUCTION_DECREASE_THRESHOLD = 35000; // Income threshold for decreasing the deduction

    // Calculate earned income deduction
    let earnedIncomeDeduction = Math.min(EARNED_INCOME_DEDUCTION_RATE * grossIncome, MAX_EARNED_INCOME_DEDUCTION);
    if (grossIncome > DEDUCTION_DECREASE_THRESHOLD) {
        earnedIncomeDeduction -= DEDUCTION_DECREASE_RATE * (grossIncome - DEDUCTION_DECREASE_THRESHOLD);
        earnedIncomeDeduction = Math.max(0, earnedIncomeDeduction); // Ensure the deduction doesn't go below 0
    }

    console.log("Earned Income Deduction:", earnedIncomeDeduction);

    let taxableIncome = grossIncome - earnedIncomeDeduction;
    console.log("Taxable Income after Earned Income Deduction:", taxableIncome);

    let netIncome = taxableIncome;
    let remainingIncome = taxableIncome;

    for (const bracket of taxBrackets) {
        if (remainingIncome <= bracket.limit) {
            netIncome -= remainingIncome * bracket.rate;
            break;
        } else {
            netIncome -= bracket.limit * bracket.rate;
            remainingIncome -= bracket.limit;
        }
    }

    const municipalTaxRates = await fetchJsonFile('./municipalTaxRates.json');
    const municipalityData = municipalTaxRates.find(m => m.Municipality === municipality);
    
    if (!municipalityData) {
        throw new Error('Municipality not found in tax rates data');
    }

    const municipalTaxRate = parseFloat(municipalityData["Income tax percentage"].replace(",", ".")) / 100;
    const churchTaxRate = church === "Ev.lut. Church" ? parseFloat(municipalityData["Ev.lut. church tax percentage"].replace(",", ".")) / 100 :
                         church === "Orthodox Church" ? parseFloat(municipalityData["Orthodox church tax percentage"].replace(",", ".")) / 100 : 0;

    const socialSecurityRate = 0.07;

    netIncome -= taxableIncome * (municipalTaxRate + churchTaxRate + socialSecurityRate);

    return {
        netIncome,
        earnedIncomeDeduction,
        taxableIncome
    };
}

async function fetchJsonFile(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
    }
    return await response.json();
}
