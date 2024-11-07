describe('Backend API for Address Checks', () => {

    let testCases;

    // Load the fixture data before each test
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
                    const cityNames = response.body.map((city) => city.Name);

                    // Checking that cityNames array matches expectedCities
                    expect(cityNames).to.be.an('array');
                    expect(cityNames).to.deep.equal(expectedCities);
                });
        });
    });
});
