"use strict";
var LoginElements;
(function (LoginElements) {
    LoginElements.login = document.getElementById("login");
    LoginElements.password = document.getElementById("password");
    LoginElements.buttonLogin = document.getElementById("login-button");
})(LoginElements || (LoginElements = {}));
var LoginFunctions;
(function (LoginFunctions) {
    LoginFunctions.getDB = () => JSON.parse(localStorage.getItem("users") || "users");
})(LoginFunctions || (LoginFunctions = {}));
function loginIn() {
    const dbUsers = LoginFunctions.getDB();
    dbUsers.forEach((element) => {
        if (element.login === LoginElements.login.value && element.password === LoginElements.password.value) {
            alert("Logado com sucesso!");
            sessionStorage.setItem("logged", element.login);
            window.location.href = "notes.html";
        }
    });
}
LoginElements.buttonLogin.addEventListener("click", (event) => {
    loginIn();
    event.preventDefault();
});
