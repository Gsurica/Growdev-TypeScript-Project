namespace RegisterElements {
    export const buttonRegister = document.getElementById("button-register") as HTMLButtonElement

    export const login = document.getElementById("login") as HTMLInputElement

    export const email = document.getElementById("email") as HTMLInputElement

    export const password = document.getElementById("password") as HTMLInputElement
}

interface UserObject {
    login: string 
    email: string 
    password: string 
}

namespace IndexFunctions {
    export const getDB = () => JSON.parse(localStorage.getItem("users") || "users")

    export const setDB = (item: UserObject[]) => localStorage.setItem("users", JSON.stringify(item))
}

function createObject(login: string, email: string, password: string): UserObject {
    const user: UserObject = {
        login: login,
        email: email,
        password: password
    }
    return user
}

function saveOnDb(user: UserObject): void {
    const dbUsers: UserObject[] = IndexFunctions.getDB()
    dbUsers.push(user)
    IndexFunctions.setDB(dbUsers)
}

function readDB(): UserObject[] {
    return IndexFunctions.getDB()
}

function registerUser(loginP: string, emailP: string, passwordP: string): void {
    if(loginP.length < 3 || emailP.length < 5 || passwordP.length < 5){
        alert("Por favor, coloque o número de caractéres acima de 5")
    } else {
        alert("Conta criada com sucesso! Bem-vindo ao site!")
        saveOnDb(createObject(RegisterElements.login.value, RegisterElements.email.value, RegisterElements.password.value))
        sessionStorage.setItem("logged", RegisterElements.login.value)
        window.location.href = "notes.html"
    }
}

RegisterElements.buttonRegister.addEventListener("click", (event) => {
    registerUser(RegisterElements.login.value, RegisterElements.email.value, RegisterElements.password.value)
    event.preventDefault()
})