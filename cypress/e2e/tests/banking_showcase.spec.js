import BankingPage from '../pages/BankingPage';
import SignUpPage from '../pages/SignUpPage';
import { convertLoanAmount } from '../utils/helper';

// Test steps for the banking showcase scenario
describe('Banking Showcase Tests', () => {
    const bankingPage = new BankingPage(); // All elements of the banking page
    const signUpPage = new SignUpPage(); // All elements of the signup page
    let loanAmount; // Loan amount to be used for filtering and verification
    let loanDuration; // Loan duration to be used for filtering and verification

    beforeEach(() => {
        cy.fixture('loanData').then((data) => { // cypress/fixtures/loanData
            loanAmount = data.loanAmount; // Loan amount read from fixture as 25.000,00
            loanDuration = data.loanDuration; // Loan duration read from fixture in months, 96 here

            expect(loanAmount).to.exist; // Fail the test if loan amount is missing
            expect(loanDuration).to.exist; // Fail the test if loan duration is missing

            // Common steps needed in both scenarios
            bankingPage.visit(); // GIVEN I access www.verivox.de
            bankingPage.acceptCookies(); // Accept cookies

            // WHEN I choose the Kredit product
            bankingPage.selectKreditProduct();

            // AND I enter loan amount of 25000
            const plainLoanAmount = convertLoanAmount(loanAmount); // Convert loan amount to 25000
            bankingPage.enterLoanAmount(plainLoanAmount);

            // AND I enter 8 Jahre as my loan duration
            bankingPage.selectLoanDuration(loanDuration); // Use actual duration value in dropdown

            // AND I go forward, by accessing the JETZT VERGLEICHEN button
            bankingPage.clickCompareButton();
        });
    });

    it('Verify the Banking showcase result list', () => {
        // Verification 1: Check if there are at least 10 bank products displayed
        bankingPage.verifyResultItems();

        // Verification 2: Check if there’s at least 1 product with Sofortauszahlung feature
        bankingPage.verifySofortauszahlungItems();

        // Bonus task for mobile screen execution
        cy.viewport('iphone-x'); // Set viewport for mobile view

        // Re-verify for mobile view
        bankingPage.verifyResultItems();
        bankingPage.verifySofortauszahlungItems();
    });

    it('Verify the Signup funnel', () => {
        // Step 3: (Click ALLE BANKEN VERGLEICHEN OR IN 7 MINUTEN ZUM ANGEBOT)
        bankingPage.clickAngebot();

        // Verify the URL
        cy.wait(3000); // Optionally replace with retry logic
        cy.url().then((url) => {
            expect(url).to.match(/^https:\/\/www\.verivox\.de\/ratenkredit\/vergleich\//);
            expect(url).to.match(/\/signup10$/);
        });

        // Bonus task: Validate loan amount and duration in signup page
        signUpPage.returnAmount().should('contain', loanAmount); // Replace with actual selector
        signUpPage.returnMonth().should('contain', loanDuration); // Replace with actual selector
    });
});
