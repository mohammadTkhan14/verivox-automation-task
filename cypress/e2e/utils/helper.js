export function convertLoanAmount(formattedAmount) {
    // Remove the thousands separator (.) and replace the decimal separator (,) with a dot
    const normalizedAmount = formattedAmount
        .replace(/\./g, '')   // Remove thousands separator
        .replace(',', '.');   // Replace decimal separator with a dot

    // Convert to a float and return as an integer
    return Math.floor(parseFloat(normalizedAmount)); // Get the integer part
}