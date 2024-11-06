// All elements of the main page.

class showcaseResultList {

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

export default showcaseResultList;
