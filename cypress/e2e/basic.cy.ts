describe('Basic specs', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Check for meetup topics API endpoint with mock', () => {
    // Mock the API response for both development and production paths
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
    }).as('getTopicsDev')
    
    cy.intercept('GET', '/api/meetup-topics', {
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
    }).as('getTopicsProd')
    
    cy.get('#topic-generator').click()
    
    // Wait for either endpoint to be called
    cy.wait(['@getTopicsDev', '@getTopicsProd'])
    
    cy.get('#topic-display').should('be.visible')
    cy.get('#topic-title').should('contain.text', 'Production ML Model Deployment')
  })
})