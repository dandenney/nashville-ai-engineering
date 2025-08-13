describe('Basic specs', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Check for meetup topics generator', () => {
    cy.get('#topic-generator').should('exist')
    cy.get('#topic-generator').should('contain.text', 'Generate Meetup Topic')
  })

  it('Check for meetup topics API endpoint', () => {
    cy.intercept('GET', '/api/meetup-topics').as('getTopics')
    cy.get('#topic-generator').click()
    cy.wait('@getTopics')
    cy.get('#topic-display').should('be.visible')
  })
})