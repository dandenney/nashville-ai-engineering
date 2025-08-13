describe('Basic specs', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Check for meetup topics API endpoint with mock', () => {
    // Mock the API response
    cy.intercept('GET', '/api/meetup-topics', {
      statusCode: 200,
      body: {
        title: "Production ML Model Deployment",
        description: "How to deploy machine learning models to production environments using Docker, Kubernetes, and cloud platforms.",
        type: "presentation",
        difficulty: "intermediate"
      }
    }).as('getTopics')
    
    cy.get('#topic-generator').click()
    cy.wait('@getTopics')
    cy.get('#topic-display').should('be.visible')
    cy.get('#topic-title').should('contain.text', 'Production ML Model Deployment')
  })
})