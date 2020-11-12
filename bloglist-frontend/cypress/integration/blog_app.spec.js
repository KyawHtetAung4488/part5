
describe('Blog app', function() {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const newUser = {
            name: 'Kyaw',
            username: 'Kyaw',
            password: 'Kyaw',
        }
        cy.request('POST', 'http://localhost:3000/api/users/', newUser)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('Kyaw')
            cy.get('#password').type('Kyaw')
            cy.get('#login-button').click()

            cy.contains('Kyaw logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('Kyaw')
            cy.get('#password').type('Wrong')
            cy.get('#login-button').click()

            cy.contains('wrong username or password')
        })
    })

    describe('When Logged in', function() {
        beforeEach(function () {
          cy.login({
            username: 'Kyaw',
            password: 'Kyaw'
          })
        })

        it('A blog can be created', function() {
          cy.createBlog({
            title: 'test title',
            author: 'test author',
            url: 'test url'
          })
        })

        it('A user can like a blog', function() {
          cy.createBlog({
            title: 'test title',
            author: 'test author',
            url: 'test url'
          })

            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('1')
        })
    })

    it('Logged user can delete his blog', function() {
        cy.get('#username').type('Kyaw')
        cy.get('#password').type('Kyaw')
        cy.get('#login-button').click()

        cy.contains('new blog').click()
        cy.get('#title').type('test title')
        cy.get('#author').type('test author')
        cy.get('#url').type('test url')
        cy.get('#create-blog').click()

        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'test title')
    })

    describe('Blogs must be ordered', function () {
      beforeEach(function() {
       cy.login({ username: 'Kyaw', password: 'Kyaw' })
       cy.createBlog({ author: 'first author', title: 'test1', url: 'test1' })
       cy.createBlog({ author: 'second author', title: 'test2', url: 'test2' })
       cy.createBlog({ author: 'third author', title: 'test3', url: 'test3' })

       cy.contains('test1').parent().as('first')
       cy.contains('test2').parent().as('second')
       cy.contains('test3').parent().as('third')
     })

     it(' according to its likes', function() {
       cy.get('@first').contains('view').click()
       cy.get('@second').contains('view').click()
       cy.get('@third').contains('view').click()

       cy.get('@first').contains('like').as('like1')
       cy.get('@second').contains('like').as('like2')
       cy.get('@third').contains('like').as('like3')

       cy.get('@like2').click()
       cy.wait(500)
       cy.get('@like1').click()
       cy.wait(500)
       cy.get('@like1').click()
       cy.wait(500)
       cy.get('@like1').click()
       cy.wait(500)
       cy.get('@like3').click()
       cy.wait(500)
       cy.get('@like3').click()

       cy.get('.blog').then(blogs => {
         cy.wrap(blogs[0]).contains('3')
         cy.wrap(blogs[1]).contains('2')
         cy.wrap(blogs[2]).contains('1')
       })
      })
  })
})
