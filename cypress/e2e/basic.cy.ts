describe('Basic specs', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Check for meetup topics API endpoint with mock', () => {
    // Mock the API response for the development endpoint (what actually gets called)
    cy.intercept('GET', '/.netlify/functions/meetup-topics', {
      statusCode: 200,
      body: {
        topic: {
          title: "Production ML Model Deployment",
          description: "How to deploy machine learning models to production environments using Docker, Kubernetes, and cloud platforms.",
          type: "presentation",
          difficulty: "intermediate"
        },
        totalTopics: 1,
        selectedIndex: 0,
        timestamp: new Date().toISOString()
      }
    }).as('getTopics')
    
    // Ensure the page is fully loaded
    cy.get('#topic-generator').should('be.visible').and('not.be.disabled')
    
    cy.get('#topic-generator').click()
    
    // Wait for the request to complete with a longer timeout
    cy.wait('@getTopics', { timeout: 10000 })
    
    // Verify the UI updates correctly
    cy.get('#topic-display').should('be.visible')
    cy.get('#topic-title').should('contain.text', 'Production ML Model Deployment')
    cy.get('#topic-type').should('contain.text', 'presentation')
    cy.get('#topic-difficulty').should('contain.text', 'intermediate')
  })
})