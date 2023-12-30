describe('test logins', () => {
  beforeEach( () => {
    cy.viewport(Cypress.config("viewportWidth1"), Cypress.config("viewportHeight1"));
    cy.viewport(Cypress.config("viewportWidth2"), Cypress.config("viewportHeight2"));
    cy.visit('http://localhost:3000');
  })

  it('Should open the main page', () => {
    cy.contains('Books list');
  })

  it.only('Should successfully login', () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible')
  })

  it('Should not login with empty mail', () => {
    cy.login(null, "123");
    cy.get('#mail').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage()).to.be.eql('Заполните это поле.')
    })
  })  

  it('Should not login with empty password', () => {
    cy.password("bropet@mail.ru", null);
    cy.get('#pass').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage()).to.be.eql('Заполните это поле.')
    })   
  })

  //Запуск: npm install, npm start, npm run server, npx cypress open
  //Добавьте первый тест с проверкой отображения страницы.
  //Добавьте 3 теста для проверки функциональности работы с книгами в избранном: выберите 3 наиболее важных теста.

  /*it('test not login with wrong mail', () => {
    cy.visit('localhost:3000');
    cy.get('.ml-auto > .ml-2').click();
    cy.get('#mail').type('l@sfd');
    cy.get('#pass').type('123');
    cy.get('form > .ml-2').click();    Submit
    cy.contains('Неправильая почта или пароль').should('be.visible')
  })*/
})

import { faker } from '@faker-js/faker';
  let bookData;

  describe('test favourites', () => {
    beforeEach( () => {
      cy.viewport(Cypress.config("viewportWidth1"), Cypress.config("viewportHeight1"));
      cy.viewport(Cypress.config("viewportWidth2"), Cypress.config("viewportHeight2"));
      cy.visit("http://localhost:3000");
      cy.login("bropet@mail.ru", "123");
      (bookData = {
        title: faker.company.catchPhraseAdjective(),
        description: faker.company.catchPhrase(),
        author: faker.name.fullName(),
      })
    })
  
    it('Add book to favourites through "Add new"', () => {
      cy.createFavoriteBook(bookData);
      cy.visit('/favorites');
      cy.get('.card-title')
        .should('contain', bookData.title);
    });
  
    it('Add book to favourites through "Book page"', () => {
      cy.addBookFavorite(bookData);
      cy.contains(bookData.title)
        .should('be.visible')
        .within(() => cy.get('.card-footer > .btn')
        .click({ force: true }));
      cy.visit('/favorites');
      cy.contains(bookData.title)
        .should('be.visible');
    });
  
    it('Delete book from favourites', () => {
      cy.createFavoriteBook(bookData);
      cy.visit('/favorites');
      cy.contains(bookData.title)
        .should('be.visible')
        .within(() => cy.get('.card-footer > .btn')
        .click({ force: true }));
      cy.contains(bookData.title)
        .should('not.exist');
    });
  });
