describe('Artificial Intelligencers site', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows the masthead and society identity', () => {
    cy.contains('h1', 'Artificial Intelligencers').should('be.visible')
    cy.contains('Nashville, Tennessee').should('exist')
  })

  it('leads with the next meetup', () => {
    cy.get('#next').should('exist')
    cy.contains('Next meetup').should('exist')
    // Either a live RSVP or the between-meetups state
    cy.get('#next').within(() => {
      cy.get('a[href*="meetup.com"]').should('have.length.at.least', 1)
    })
  })

  it('records the proceedings of past meetups', () => {
    cy.get('#proceedings li').should('have.length.at.least', 1)
    cy.get('#proceedings').contains('№').should('exist')
  })

  it('has a working call-for-presenters form', () => {
    cy.get('form[name="feedback"]').within(() => {
      cy.get('input[name="email"]').should('have.attr', 'required')
      cy.get('textarea[name="feedback"]').should('have.attr', 'required')
      cy.get('button[type="submit"]').should('exist')
    })
  })
})
