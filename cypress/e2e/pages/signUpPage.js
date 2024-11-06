// Seperating the elements of SignUp in different file.

class SignUpPage {

    returnAmount() {
       return cy.get('.data > .ng-binding')
    }

    returnMonth() {
           return cy.get('.runtime > .ng-binding')
    }
}

export default SignUpPage;