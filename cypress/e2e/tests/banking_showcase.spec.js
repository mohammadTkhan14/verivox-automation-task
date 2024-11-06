import BankingPage from '../pages/BankingPage';
import SignUpPage from '../pages/SignUpPage';
import { convertLoanAmount } from '../utils/helper';


describe('Banking Showcase Tests', () => {
    const bankingPage = new BankingPage();
    const signUPPage = new SignUpPage();
    let loanAmount;
    let loanDuration;

    beforeEach(() => {
         cy.fixture('loanData').then((data) => {
            loanAmount = data.loanAmount; // Set loan amount from fixture
            loanDuration = data.loanDuration; // Set loan duration from fixture

        expect(loanAmount).to.exist;
        expect(loanDuration).to.exist;
        bankingPage.visit();
        bankingPage.acceptCookies();
        // Step 2: WHEN I choose the Kredit product
        bankingPage.selectKreditProduct();
        // Step 3: AND I enter loan amount of 25000
        const plainLoanAmount = convertLoanAmount(loanAmount);
        bankingPage.enterLoanAmount(plainLoanAmount);
        // Step 4: AND I enter 8 Jahre as my loan duration
        bankingPage.selectLoanDuration(loanDuration); // Use actual duration value in dropdown
        // Step 5: AND I go forward, by accessing the JETZT VERGLEICHEN button
        bankingPage.clickCompareButton();
    });
     });

    it('Verify the Banking showcase result list', () => {
        // Verification 1: Check if there are at least 10 bank products displayed
        bankingPage.verifyResultItems();
        // Verification 2: Check if there’s at least 1 product with Sofortauszahlung feature
        bankingPage.verifySofortauszahlungItems();
        // For mobile screen execution
        cy.viewport('iphone-x');
        // Re-verify for mobile view
        bankingPage.verifyResultItems();
        // Re-verify for mobile view
        bankingPage.verifySofortauszahlungItems();
    });

    it('Verify the Signup funnel', () => {
        // Step 1: GIVEN I access www.verivox.de
        bankingPage.clickAngebot();
        // Now verify the URL
        cy.wait(3000)
        cy.url().then((url) => {
            expect(url).to.match(/^https:\/\/www\.verivox\.de\/ratenkredit\/vergleich\//);
            expect(url).to.match(/\/signup10$/);
        });
        signUPPage.returnAmount().should('contain', loanAmount); // Replace with actual selector
        signUPPage.returnMonth().should('contain', loanDuration); // Replace with actual selector
    });

});

