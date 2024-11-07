import homePage from '../pages/homePage';
import signUpPage from '../pages/signUpPage';
import showcaseResultList from '../pages/showcaseResultList';
import { convertLoanAmount } from '../utils/helper';

// Test steps for the banking showcase scenario
describe('Banking Ratenkredit Calculator - Tariff Selection Tests', () => {
    const homePageInstance = new homePage(); // All elements of the banking page
    const signUpPageInstance = new signUpPage(); // All elements of the signup page
    const showcaseResultListInstance = new showcaseResultList(); // All elements of product search result
    let loanAmount; // Loan amount to be used for filtering and verification
    let loanDuration; // Loan duration to be used for filtering and verification

    beforeEach(() => {
        cy.fixture('loanData').then((data) => { // cypress/fixtures/loanData
            loanAmount = data.loanAmount; // Loan amount read from fixture as 25.000,00
            loanDuration = data.loanDuration; // Loan duration read from fixture in months, 96 here

            expect(loanAmount).to.exist; // Fail the test if loan amount is missing
            expect(loanDuration).to.exist; // Fail the test if loan duration is missing

            // Common steps needed in both scenarios
            homePageInstance.visit(); // GIVEN I access www.verivox.de
            homePageInstance.acceptCookies(); // Accept cookies

            // WHEN I choose the Kredit product
            homePageInstance.selectKreditProduct();

            // AND I enter loan amount of 25000
            const plainLoanAmount = convertLoanAmount(loanAmount); // Convert loan amount to 25000
            homePageInstance.enterLoanAmount(plainLoanAmount);

            // AND I enter 8 Jahre as my loan duration
            homePageInstance.selectLoanDuration(loanDuration); // Use actual duration value in dropdown

            // AND I go forward, by accessing the JETZT VERGLEICHEN button
            homePageInstance.clickCompareButton();
        });
    });

    it('Verify the banking showcase result list', () => {
        // Verification 1: Check if there are at least 10 bank products displayed
        showcaseResultListInstance.verifyResultItems();

        // Verification 2: Check if there’s at least 1 product with Sofortauszahlung feature
        showcaseResultListInstance.verifySofortauszahlungItems();

        // Bonus task for mobile screen execution
        cy.viewport('iphone-x'); // Set viewport for mobile view

        // Re-verify for mobile view
        showcaseResultListInstance.verifyResultItems();
        showcaseResultListInstance.verifySofortauszahlungItems();
    });

    it('Verify the Signup funnel', () => {
        // Step 3: (Click ALLE BANKEN VERGLEICHEN OR IN 7 MINUTEN ZUM ANGEBOT)
        showcaseResultListInstance.clickAngebot();

        // Verify the URL
        // Load URL patterns from the fixture
        cy.fixture('signupUrls').then((urls) => {
            // Retry logic for verifying the URL with data from the fixture
            cy.url()
              .should('match', new RegExp(urls.baseUrl)) // Match the base URL from the fixture
              .should('match', new RegExp(urls.signupPattern)); // Match the signup pattern from the fixture
        });

        // Bonus task: Validate loan amount and duration in signup page
        signUpPageInstance.returnAmount().should('contain', loanAmount); // Replace with actual selector
        signUpPageInstance.returnMonth().should('contain', loanDuration); // Replace with actual selector
    });
});
