describe("Render", () => {
  it("Load front page", () => {
    cy.visit("localhost:3000/");
    cy.contains("Barn tilstede");
    cy.contains("Voksne tilstede");
    cy.contains("Fraværende");
  });
});

describe("Render", () => {
  it("Load employee page", () => {
    cy.visit("localhost:3000/employees");
    cy.contains("Ansatte");
    cy.contains("Fast ansatt");
    cy.contains("Vikar");
  });
});

describe("Render", () => {
  it("Load statistics page", () => {
    cy.visit("localhost:3000/stats");
  });
});

describe("Render", () => {
  it("Load settings page", () => {
    cy.visit("localhost:3000/settings");
  });
});