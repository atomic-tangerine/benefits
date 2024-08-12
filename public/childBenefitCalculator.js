// childBenefit.js

export function calculateChildBenefit(numChildren, isSingleParent) {
    let childBenefit = 0;

    // Example logic for calculating child benefits
    if (numChildren > 0) {
        childBenefit = 94.88 * numChildren; // Base benefit for each child
        if (isSingleParent) {
            childBenefit += 53.30; // Additional benefit for single parents
        }
    }

    return childBenefit;
}
