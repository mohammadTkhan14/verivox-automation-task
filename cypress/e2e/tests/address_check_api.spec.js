// Scenario 3 for API test verification
describe('Backend API for Address Checks', () => {
    const testCases = [
        { postcode: '10409', expectedCities: ['Berlin'] },
        { postcode: '77716', expectedCities: ['Fischerbach', 'Haslach', 'Hofstetten'] }
    ];

    testCases.forEach(({ postcode, expectedCities }) => {
        it(`should return the correct cities for postcode ${postcode}`, () => {
            cy.request(`https://service.verivox.de/geo/latest/cities/${postcode}`)
                .then((response) => {
                    // Verify response status
                    expect(response.status).to.eq(200);

                    // Extract city names from response and assert they match expected cities
                    const cityNames = response.body.map(city => city.Name);

                    // Check that cityNames array is an array and matches expectedCities
                    expect(cityNames).to.be.an('array');
                    expect(cityNames).to.deep.equal(expectedCities);
                });
        });
    });
});