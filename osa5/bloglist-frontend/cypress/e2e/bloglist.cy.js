describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'test',
      password: 'test',
      name: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user )
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#usernameinput').type('test')
      cy.get('#passwordinput').type('test')
      cy.get('#loginbutton').click()

      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameinput').type('incorrect')
      cy.get('#passwordinput').type('incorrect')
      cy.get('#loginbutton').click()

      cy.get('.error').should('contain', 'wrong cridentials')

      cy.get('html').should('not.contain', 'test logged in')
    })
  })
})
