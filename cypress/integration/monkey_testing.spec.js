const user = "d.moralesa2@uniandes.edu.co";
const password = "Bogota2022";

describe("Los estudiantes under monkeys", function () {
  it("visits los estudiantes and survives monkeys", function () {
   //Función para loguearse en la app
    Login(user, password);
    //Seleccionar un combo aleatoriamente
    Comboclick(2);
    //Seleccionar y escribir aleatoriamente
    TypeRandomly(3);
  });
});
function Login(user, password) {
  // Pruebas pra hacer login y empezar a realizar las pruebas
  cy.visit("https://losestudiantes.co");
  cy.get(".inline-flex > .text-base").click();
  cy.get(
    ":nth-child(1) > .loginstyles__Field-e7acdk-4 > .input-group > .form-control"
  ).type(user);
  cy.get(
    ":nth-child(2) > .loginstyles__Field-e7acdk-4 > .input-group > .form-control"
  ).type(password);
  cy.get(".loginstyles__ActionButton-e7acdk-5").click();
  cy.wait(1000);
}
function Comboclick(monkeysLeft) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  var monkeysLeft = monkeysLeft;
  if (monkeysLeft > 0) {
    cy.get("body").then(($links) => {
      if ($links.find("select").length > 0) {
        var randomLink = $links.get(getRandomInt(0, $links.length));
        if (!Cypress.dom.isHidden(randomLink)) {
          cy.wrap(randomLink).click({ force: true });
          monkeysLeft = monkeysLeft - 1;
        }
        cy.wait(1000);
        Comboclick(monkeysLeft);
      }
    });
  }
}

// Funcion que hace pruebas seleccionnando los botones "Responder"
// y escribe en los campos
function TypeRandomly(monkeysLeft) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var monkeysLeft = monkeysLeft;
  var randomNumber = Math.floor(Math.random() * (13 - 7)) + 7;
  let Str_randomNumber = randomNumber.toString();
  if (monkeysLeft > 0) {
    cy.get(
      `:nth-child(${Str_randomNumber}) > .px-4 > :nth-child(1) > .reaction > .rounded-md > .flex`
    ).then(($links) => {
      var randomLink = $links.get(getRandomInt(0, $links.length));
      cy.wrap(randomLink).click();
      cy.get(".ProseMirror").then(($links) => {
        var randomLink = $links.get(getRandomInt(0, $links.length));
        cy.wrap(randomLink).type("Se escrbe un post");
        monkeysLeft = monkeysLeft - 1;
        cy.wait(1000);
        TypeRandomly(monkeysLeft);
      });
    });
  }
}
