/// <reference types="Cypress" />

describe('homepage', () => {
  beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('/')
  })

  // remote file include https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T122/
  it('Check ssi injection', () => {
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const d = new Date();
    let day = weekday[d.getDay()];

    // encoded <!--#echo var="DATE_LOCAL" -->
    cy.request('/search?keyword=<%21--%23echo%20var%3D"DATE_LOCAL"%20-->&p=1');
    cy.contains(day).should('not.exist');
    cy.contains('<!--#echo var="DATE_LOCAL" -->', { timeout: 15000 });
  });

  // access authorized pages https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T84/
  // authorization https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T85/
  it('Check can not access restricted pages', () => {
    cy.request({
      url: '/lists/owned',
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404);
    });
  });

  // check session https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T128/
  // check storage https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T321/
  it('Check local and session storage', () => {
    cy.request('/');
    // should be empty
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllSessionStorage().should('be.empty');
  });

  // XSS https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T89/
  // check rbac https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T2276/
  // check authentication https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T2277/

  // input validation https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T519/
  it('Check input validation', () => {
    cy.request('/');
    cy.get('input').type('?');
    cy.get('input').should('not.have.value', '?');
    cy.get('input').should('have.value', '');
  });

  // access local files https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T297/
  it('Check use image serving to access other files', () => {
    cy.request({
      url: '/_next/image?url=/package.json&w=384&q=75',
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404);
    });
  });

  // null byte check https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T127/
  it('Check using null byte to access other files', () => {
    cy.request({
      url: '/package.json\0/_next/static/media/logo.ed71202b.png&w=384&q=75',
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(500);
    });
  });

  // no-cache https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T112/
  it('Check no-cache headers', () => {
    // Check for cache control in header set to no-cache
    // ticket is for requests not responses????  need to figure out how to check requests
    cy.request('/').then((resp) => {
      expect(resp.headers['Cache-Control']).to.equal('max-age=0');
    });
    //   cy.request('/')
    //   .its('headers')
    //   .should('have.keys', 'Cache-Control')
    //   .and('deep.equal', { 'Cache-Control': 'no-cache' });
  });

  // check meta tag https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T132/
  it('Check content-type headers', () => {
    // Check for cache control in header set to no-cache
    // ticket is for requests not responses????  need to figure out how to check requests
    cy.request('/').then((resp) => {
      expect(resp.headers['Content-Type']).to.equal('text/html; charset=UTF-8');
    });
    // cy.request('/')
    // .its('headers')
    // .should('have.keys', 'Content-Type')
    // .and('deep.equal', { 'Content-Type': 'text/html; charset=UTF-8' });
  });

  // check CSP https://sdelements.il2.dso.mil/bunits/platform1/ecc/open-lxp-xds-ui/tasks/phase/testing/387-T332/
  it('Check meta tags', () => {
    // Check for CSP control in header set to no-cache
    // ticket is for requests not responses????  need to figure out how to check requests
    cy.get(`head > meta[http-equiv="Content-Security-Policy"]`)
      .should('have.attr', 'content')
      .and('contain', 'self');
    // cy.request('/').its('headers').should('have.keys', 'Content-Security-Policy').and('deep.string', {'Content-Security-Policy': 'self'})
  });
});
