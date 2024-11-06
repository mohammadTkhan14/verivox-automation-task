describe('Backend API for Address Checks', () => {
    // Declare the testCases variable here
    let testCases;

    // Load the fixture data before the tests
    beforeEach(() => {
        cy.fixture('addressData').then((data) => {
            testCases = data.testCases; // Assign the fixture data to the testCases variable
        });
    });

    it('should return the correct cities for each postcode', () => {
        // Ensure testCases is populated before continuing
        expect(testCases).to.not.be.undefined;

        // Iterate over testCases once the fixture is loaded
        testCases.forEach(({ postcode, expectedCities }) => {
            cy.request(`https://service.verivox.de/geo/latest/cities/${postcode}`)
                .then((response) => {
                    // Verify response status
                    expect(response.status).to.eq(200);

                    // Extract city names from the response and assert they match expected cities
                    const cityNames = response.body.map(city => city.Name);

                    // Check that cityNames array is an array and matches expectedCities
                    expect(cityNames).to.be.an('array');
                    expect(cityNames).to.deep.equal(expectedCities);
                });
        });
    });
});
