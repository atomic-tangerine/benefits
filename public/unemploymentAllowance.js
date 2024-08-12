export function calculateUnemploymentAllowance() {
    const daysInCurrentMonth = getDaysInCurrentMonth();
    console.log("Days in Current Month:", daysInCurrentMonth);

    const basicUnemploymentAllowance = daysInCurrentMonth * 33.78;
    console.log("Basic Unemployment Allowance:", basicUnemploymentAllowance);

    return basicUnemploymentAllowance;
}

function getDaysInCurrentMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}
