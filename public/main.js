import { calculateHousingAllowance } from './housingAllowance.js';
import { calculateUnemploymentAllowance } from './unemploymentAllowance.js';
import { calculateNetIncome } from './taxCalculator.js';
import { calculateChildBenefit } from './childBenefitCalculator.js';
import { renderResults } from './resultsRenderer.js';

async function calculateBenefits() {
    try {
        // Fetch necessary data
        const maxRents = await fetchJsonFile('./maxRentsHousingAllowance.json');

        // Get input values
        const incomeSalary = parseFloat(document.getElementById('incomeSalary').value);
        const incomeOther = parseFloat(document.getElementById('incomeOther').value);
        const rent = parseFloat(document.getElementById('rent').value);
        const adults = parseInt(document.getElementById('adults').value, 10);
        const children = parseInt(document.getElementById('children').value, 10);
        const municipality = document.getElementById('municipality').value;
        const church = document.getElementById('church').value;
        const isSingleParent = document.getElementById('isSingleParent').checked;

        // Validate inputs
        if (isNaN(incomeSalary) || isNaN(incomeOther) || isNaN(rent) || isNaN(adults) || isNaN(children)) {
            alert('Please enter valid numeric values for all fields.');
            return;
        }

        // Calculate individual benefits
        const basicUnemploymentAllowance = calculateUnemploymentAllowance();
        const grossIncome = incomeSalary + incomeOther + basicUnemploymentAllowance;
        const netIncomeResult = await calculateNetIncome(grossIncome, municipality, church);
        const householdSize = adults + children;

        const housingAllowance = calculateHousingAllowance(maxRents, "Category1", householdSize, grossIncome, rent, adults, children);

        // Calculate child benefit
        const childBenefit = calculateChildBenefit(children, isSingleParent);

        // Total benefits
        const totalBenefits = housingAllowance.housingAllowance + basicUnemploymentAllowance + childBenefit;

        // Render results
        renderResults({
            housingAllowance,
            basicUnemploymentAllowance,
            childBenefit,
            netIncomeResult,
            totalBenefits
        });

    } catch (error) {
        console.error('Error calculating benefits:', error);
        alert('Error calculating benefits. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateMunicipalities();
    document.querySelector('button').addEventListener('click', calculateBenefits);
});
