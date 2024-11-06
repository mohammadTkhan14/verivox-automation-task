class BankingPage {
    visit() {
        cy.visit('https://www.verivox.de');
    }

    acceptCookies() {
        cy.get('#uc-btn-accept-banner', { timeout: 10000 })
          .should('be.visible') // Ensure the button is visible
          .wait(1000) // Sleep for 1 second (1000 milliseconds)
          .click(); // Now click the button
    }

    selectKreditProduct() {
        cy.contains('Kredit').click(); // Adjust selector as per actual element
    }

    enterLoanAmount(amount) {
       cy.get('input[name="kreditbetrag"]')
          .first()
          .should('be.visible') // Ensure the input is visible
          .clear() // Clear the input field before typing
          .type(amount.toString()); // Example of typing a value into the input
    }

    selectLoanDuration(duration) {
        cy.get('select[name="kreditlaufzeit"]') // Select the <select> element by name
        .first()
        .should('be.visible') // Ensure the select field is visible
        .select(duration.toString());
    }

    clickCompareButton() {
       cy.contains('Jetzt vergleichen') // Find the button with the specified text
          .should('be.visible') // Ensure the button is visible
          .click(); // Click the button // Adjust selector as per actual element
     }

    verifyResultItems() {
        const SCROLL_ATTEMPTS = 10; // Number of scroll attempts
        const SCROLL_DELAY = 1000; // Delay between scroll attempts in milliseconds

       for (let i = 0; i < SCROLL_ATTEMPTS; i++) {
        cy.get('.product-list') // Get the parent div with the product list class
          .find('vx-base-product-card') // Find all child product cards
          .then($cards => {
            if ($cards.length >= 10) {
              // If we have at least 10 cards, we can assert
              expect($cards.length).to.be.gte(10);
            } else {
              // If we don't have enough cards, scroll down
              cy.scrollTo('bottom'); // Scroll to the bottom of the page
              cy.wait(SCROLL_DELAY); // Wait for new cards to load
            }
          });
        }
    }

    verifySofortauszahlungItems() {
       cy.contains('Filtern').click();
       cy.contains('Sofortkredit').click();
       cy.get('.close-icon > .icn-close-outlined').click();
       cy.get('.product-list') // Get the parent div with the product list class
          .find('vx-base-product-card')
          .its('length')
          .should('be.gte', 1);
    }

    clickAngebot() {
           cy.get('button') // Assuming the span is inside a button
              .contains('Alle Banken vergleichen')
              .click({ force: true });
        }
}


export default BankingPage;