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
      cy.get('#usernameInput').type('test')
      cy.get('#passwordInput').type('test')
      cy.get('#login-Button').click()

      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameInput').type('incorrect')
      cy.get('#passwordInput').type('incorrect')
      cy.get('#login-Button').click()

      cy.get('.error').should('contain', 'wrong cridentials')

      cy.get('html').should('not.contain', 'test logged in')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'test', password: 'test' })
      })

      it('A blog can be created', function() {
        cy.contains('new blog').click()

        cy.get('#title').type('testblog')
        cy.get('#author').type('testauthor')
        cy.get('#url').type('testurl')

        cy.get('#create-Button').click()

        cy.get('html').should('contain', 'testblog')
        cy.get('.success').should('contain', 'blog testblog added by testauthor')
      })

      it('A blog can be liked', function() {
        cy.createBlog({
          title: 'testtitle',
          author: 'testauthor',
          url: 'testurl'
        })

        cy.get('#viewDetails-Button').click()
        cy.get('#like-Button').click()

        cy.get('#blogLikes').should('contain', '1')
      })
    })

  })
})
