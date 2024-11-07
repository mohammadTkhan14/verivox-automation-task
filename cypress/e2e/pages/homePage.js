// All elements of the main page.

class homePage {
    visit() {
        cy.visit('https://www.verivox.de');
        cy.get('header', { timeout: 10000 }).should('be.visible');
    }

    acceptCookies() {
        // Selecting the accept cookies button by its ID
        cy.get('#uc-btn-accept-banner', { timeout: 10000 })
          .should('be.enabled') // Ensure the button is visible
          .wait(3000) // Using wait before clicking the Accept cookie
          .click(); // Click the button
    }

    selectKreditProduct() {
        cy.contains('Kredit', { timeout: 10000 }) // Increasing the default timeout to make sure the element is present
          .should('be.visible')                   // Ensure it's visible
          .click({force: true});
    }

    enterLoanAmount(amount) {
        // Locate the input field for loan amount and enter the provided amount
        cy.get('input[name="kreditbetrag"]')
          .first() // Select the first element if there are multiple
          .should('be.visible') // Ensure the input field is visible
          .clear() // Clear any existing value
          .type(amount.toString()); // Enter the loan amount
    }

    selectLoanDuration(duration) {
        // Locate the loan duration select dropdown and choose the provided duration
        cy.get('select[name="kreditlaufzeit"]')
          .first() // Select the first dropdown element
          .should('be.visible') // Ensure the dropdown is visible
          .select(duration.toString()); // Select the loan duration
    }

    clickCompareButton() {
        // Click on the 'Jetzt vergleichen' button to initiate the comparison
        cy.contains('Jetzt vergleichen')
          .should('be.visible') // Ensure the button is visible
          .click(); // Click the button
    }

}

export default homePage;
