"use strict";
var RegisterElements;
(function (RegisterElements) {
    RegisterElements.buttonRegister = document.getElementById("button-register");
    RegisterElements.login = document.getElementById("login");
    RegisterElements.email = document.getElementById("email");
    RegisterElements.password = document.getElementById("password");
})(RegisterElements || (RegisterElements = {}));
var IndexFunctions;
(function (IndexFunctions) {
    IndexFunctions.getDB = () => JSON.parse(localStorage.getItem("users") || "users");
    IndexFunctions.setDB = (item) => localStorage.setItem("users", JSON.stringify(item));
})(IndexFunctions || (IndexFunctions = {}));
function createObject(login, email, password) {
    const user = {
        login: login,
        email: email,
        password: password
    };
    return user;
}
function saveOnDb(user) {
    const dbUsers = IndexFunctions.getDB();
    dbUsers.push(user);
    IndexFunctions.setDB(dbUsers);
}
function readDB() {
    return IndexFunctions.getDB();
}
function registerUser(loginP, emailP, passwordP) {
    if (loginP.length < 3 || emailP.length < 5 || passwordP.length < 5) {
        alert("Por favor, coloque o número de caractéres acima de 5");
    }
    else {
        alert("Conta criada com sucesso! Bem-vindo ao site!");
        saveOnDb(createObject(RegisterElements.login.value, RegisterElements.email.value, RegisterElements.password.value));
        sessionStorage.setItem("logged", RegisterElements.login.value);
        window.location.href = "notes.html";
    }
}
RegisterElements.buttonRegister.addEventListener("click", (event) => {
    registerUser(RegisterElements.login.value, RegisterElements.email.value, RegisterElements.password.value);
    event.preventDefault();
});
