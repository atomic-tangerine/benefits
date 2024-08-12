// resultsRenderer.js

export function renderResults({
    housingAllowance,
    basicUnemploymentAllowance,
    childBenefit,
    netIncomeResult,
    totalBenefits
}) {
    const { netIncome, earnedIncomeDeduction, taxableIncome, municipalTaxRate, churchTaxRate } = netIncomeResult;
    
    const template = document.getElementById('result-template').content.cloneNode(true);

    // Housing Allowance
    template.querySelector('#acceptableRent').textContent = housingAllowance.acceptableRent.toFixed(2);
    template.querySelector('#deductibleIncome').textContent = housingAllowance.deductibleIncome.toFixed(2);
    template.querySelector('#basicDeductible').textContent = housingAllowance.basicDeductible.toFixed(2);
    template.querySelector('#housingAllowance').textContent = housingAllowance.housingAllowance.toFixed(2);

    // Basic Unemployment Allowance
    template.querySelector('#basicUnemploymentAllowance').textContent = basicUnemploymentAllowance.toFixed(2);

    // Child Benefit
    template.querySelector('#childBenefit').textContent = childBenefit.toFixed(2);

    // Total Benefits
    template.querySelector('#totalBenefits').textContent = totalBenefits.toFixed(2);

    // Net Income
    template.querySelector('#netIncome').textContent = netIncome.toFixed(2);
    template.querySelector('#grossIncome').textContent = (housingAllowance.grossIncome + basicUnemploymentAllowance).toFixed(2);
    template.querySelector('#earnedIncomeDeduction').textContent = earnedIncomeDeduction.toFixed(2);
    template.querySelector('#taxableIncome').textContent = taxableIncome.toFixed(2);
    template.querySelector('#municipalTaxRate').textContent = municipalTaxRate.toFixed(2);
    template.querySelector('#churchTaxRate').textContent = churchTaxRate ? churchTaxRate.toFixed(2) : "N/A";
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.appendChild(template);
}
