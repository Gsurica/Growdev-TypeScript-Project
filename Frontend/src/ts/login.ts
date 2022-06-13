namespace LoginElements {
    export const login = document.getElementById("login") as HTMLInputElement

    export const password = document.getElementById("password") as HTMLInputElement

    export const buttonLogin = document.getElementById("login-button") as HTMLButtonElement
}

namespace LoginFunctions {
    export const getDB = () => JSON.parse(localStorage.getItem("users") || "users")
    
}

interface loginUser {
    login: string
    password: string 
}

function loginIn(): void {
    const dbUsers = LoginFunctions.getDB()
    dbUsers.forEach((element: any) => {
        if(element.login === LoginElements.login.value && element.password === LoginElements.password.value){
            alert("Logado com sucesso!")
            sessionStorage.setItem("logged", element.login)
            window.location.href = "notes.html"
        }
    })
}

LoginElements.buttonLogin.addEventListener("click", (event) => {
    loginIn()
    event.preventDefault()
})





