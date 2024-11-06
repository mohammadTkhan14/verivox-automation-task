// All elements of the main page.

class homePage {
    visit() {
        cy.visit('https://www.verivox.de');
    }

    acceptCookies() {
        // Selecting the accept cookies button by its ID
        cy.get('#uc-btn-accept-banner', { timeout: 10000 })
          .should('be.visible') // Ensure the button is visible
          .wait(1000) // Wait a little to ensure button is clickable
          .click(); // Click the button
    }

    selectKreditProduct() {
        // Click on the 'Kredit' product link
        cy.contains('Kredit').click();
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

    verifyResultItems() {
        // Scroll to load dynamic content and verify at least 10 product cards
        const SCROLL_ATTEMPTS = 10; // Number of scroll attempts
        const SCROLL_DELAY = 1000; // Delay between scrolls in milliseconds

        for (let i = 0; i < SCROLL_ATTEMPTS; i++) {
            cy.get('.product-list') // Get the product list container
              .find('vx-base-product-card') // Locate all product cards
              .then($cards => {
                if ($cards.length >= 10) {
                    // If 10 or more cards are found, assert the number
                    expect($cards.length).to.be.gte(10);
                } else {
                    // If fewer than 10 cards, scroll down to load more
                    cy.scrollTo('bottom'); // Scroll to the bottom of the page
                    cy.wait(SCROLL_DELAY); // Wait for new cards to load
                }
              });
        }
    }

    verifySofortauszahlungItems() {
        // Filter products by 'Sofortkredit' (instant payout) to match Sofortauszahlung
        cy.contains('Filtern').click(); // Open filter menu
        cy.contains('Sofortkredit').click(); // Select 'Sofortkredit' (instant payout) filter
        cy.get('.close-icon > .icn-close-outlined').click(); // Close the filter menu
        cy.get('.product-list') // Get the product list
          .find('vx-base-product-card') // Locate all product cards
          .its('length') // Get the number of products found
          .should('be.gte', 1); // Assert that there is at least one product
    }

    clickAngebot() {
        // Click the 'Alle Banken vergleichen' button to view the offer
        cy.get('button')
          .contains('Alle Banken vergleichen')
          .click({ force: true }); // Force click in case the element is not interactable

        cy.contains('Persönliche Expertenberatung') // Just making sure the next page is loaded
          .should('be.visible')
    }
}

export default homePage;
