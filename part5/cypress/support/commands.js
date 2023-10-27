Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('addBlog',  ({ title, author, url }) => {

  // Send a POST request with the token in the Authorization header
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/blogs`,
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }

  })
  cy.visit('http://localhost:5173')

})


