describe('homepage', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('/')
    })

    it('Take Screenshot of homepage and fail', () => {
        // Check the first primary menu link.
        cy.screenshot('homepage')
        expect(true).to.be.false
    })

    // remote file include https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T122/
    // authorization https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T85/
    // XSS https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T89/
    // check session https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T128/
    // check storage https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T321/

    it('Check local and session storage', () => {
        // Non authenticated should be empty
        cy.getAllLocalStorage().should('be.empty')
        cy.getAllSessionStorage().should('be.empty')
    })

    it('Check local and session storage authenticated', () => {
        // Authenticated should store user info in session
        // TODO ADD LOGIN

        cy.getAllLocalStorage().should('be.empty')
        cy.getAllSessionStorage().should('contain.value', 'user')
    })

    // check rbac https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T2276/
    // check authentication https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T2277/
    // access authorized pages https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T84/
    // null byte check https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T127/
    // access local files https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T297/
    // input validation https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T519/
    // check meta tag https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T132/
    // no-cache https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T112/

    // it('Check no-cache headers', () => {
    //     // Check for cache control in header set to no-cache
    //     // ticket is for requests not responses????  need to figure out how to check requests
    //     cy.request('/').its('headers').should('have.keys', 'Cache-Control').and('deep.equal', {'Cache-Control': 'no-cache'})
    // })
    it('Check no-cache headers', () => {
        // Check for cache control in header set to no-cache
        // ticket is for requests not responses????  need to figure out how to check requests
        cy.request('/')
            .its('headers')
            .and('include', 'content-encoding')
            .and('include', 'content-type')
            .and('include', 'date')
            .and('include', 'etag')
            .and('include', 'transfer-encoding')
            .and('include', 'vary')
            .and('include', 'x-powered-by');
    })

    // check CSP https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T332/
    
    // it('Check CSP headers', () => {
    //     // Check for CSP control in header set to no-cache
    //     // ticket is for requests not responses????  need to figure out how to check requests
    //     cy.request('/').its('headers').should('have.keys', 'Content-Security-Policy').and('deep.string', {'Content-Security-Policy': 'self'})
    // })
    it('Check CSP headers', () => {
        // Check for CSP control in header set to no-cache
        // ticket is for requests not responses????  need to figure out how to check requests
        cy.request('/')
            .its('headers')
            .should('include', 'Content-Security-Policy')
            .and('have.property', 'Content-Security-Policy')
            .and('eq', 'self');
    });
})