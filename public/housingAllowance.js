export function calculateHousingAllowance(maxRents, categoryName, householdSize, grossIncome, rent, adults, children) {
    const maxRent = maxRents[categoryName];
    const acceptableRent = Math.min(rent, maxRent[`${householdSize}_person`]);

    // Calculate the base threshold and additional amounts
    const baseThreshold = 300; // Hypothetical value, adjust as needed
    const additionalAdults = adults > 1 ? (adults - 1) * 100 : 0; // Hypothetical value, adjust as needed
    const additionalChildren = children * 50; // Hypothetical value, adjust as needed

    const deductibleIncome = grossIncome - (baseThreshold + additionalAdults + additionalChildren);
    const basicDeductible = deductibleIncome * 0.42;
    const housingAllowance = 0.80 * (acceptableRent - basicDeductible);

    return {
        acceptableRent: acceptableRent,
        deductibleIncome: deductibleIncome,
        basicDeductible: basicDeductible,
        housingAllowance: housingAllowance,
        baseThreshold: baseThreshold,
        additionalAdults: additionalAdults,
        additionalChildren: additionalChildren,
        daysInCurrentMonth: 31 // Adjust as needed
    };
}
