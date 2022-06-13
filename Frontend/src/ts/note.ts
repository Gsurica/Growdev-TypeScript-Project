const session = sessionStorage.getItem('logged')

const titleNote = document.getElementById("title") as HTMLInputElement

const noteInput = document.getElementById("note") as HTMLInputElement

const obs = document.getElementById("obs") as HTMLInputElement

const buttonPost = document.getElementById("button-post") as HTMLButtonElement

const editAndDeleteButton = document.querySelector("#table-principal>tbody") as HTMLElement

namespace DataBaseFunctions {
    export const getDB = () => JSON.parse(localStorage.getItem("dbNotes") || "dbNotes")

    export const setDB = (item: note[]) => localStorage.setItem("dbNotes", JSON.stringify(item))
}

is_logged()

function is_logged(): void {
    if(!session){
        window.location.href = "login.html"
    }
}

interface note {
    title: string 
    noteBody: string 
    obs: string 
}

function reload() {
    window.location.href = window.location.href;
}


function createNote(title: string, noteBody: string, obs: string): note {
    const note: note = {
        title: title,
        noteBody: noteBody,
        obs: obs
    }
    return note 
}

function saveNote(note: note): void {
    const dbNotes: note[] = DataBaseFunctions.getDB()
    dbNotes.push(note)
    DataBaseFunctions.setDB(dbNotes)
}

function refresh() {
    window.location.reload()
}

function createNoteOnScreen(note: note, index: number): void {
    const newNoteOnScreen = document.createElement("tr")
    newNoteOnScreen.innerHTML = 
    `
    <td>${note.title}</td>
    <td>${note.noteBody}</td>
    <td>${note.obs}</td>
    <td><button class="btn btn-info" id="${index}" name="delete">Excluir</button></td>
    <td><button class="btn btn-danger" id="${index}" name="edit">Editar</button></td>
    `
    document.querySelector("#table-principal>tbody")?.appendChild(newNoteOnScreen)
}

function loadNotes(): void {
    const dbNotes = DataBaseFunctions.getDB()
    dbNotes.forEach(createNoteOnScreen)
}

loadNotes()

function editNote(index: number) {
    const dbNotes = DataBaseFunctions.getDB()[index]
    const arrayNotes: note[] = []
    arrayNotes.push(dbNotes)
    arrayNotes.forEach(element => {

        const title = element.title 
        const body = element.noteBody
        const obs = element.obs

        const titleI = document.getElementById("title") as HTMLInputElement 
        titleI.value = title 

        const bodyI = document.getElementById("note") as HTMLInputElement 
        bodyI.value = body

        const obsI = document.getElementById("obs") as HTMLInputElement 
        obsI.value = obs

    })

    deleteNote(index)
}


function deleteNote(index: number) {
    const dbNotes: note[] = DataBaseFunctions.getDB()
    dbNotes.splice(index, 1)
    DataBaseFunctions.setDB(dbNotes)
}


editAndDeleteButton.addEventListener("click", (event) => {
  if(event.target.type === 'submit'){
    if(event.target.name === 'delete'){
      const index: number = event.target.id
      deleteNote(index)
      // alert("Excluida com sucesso!")
      reload()

    }
    if(event.target.name === 'edit'){
        const index: number = event.target.id 
        editNote(index)
    }
  }
})

buttonPost.addEventListener("click", () => {
    saveNote(createNote(titleNote.value, noteInput.value, obs.value))
    console.log("test")
    refresh()
})














