"use strict";
const session = sessionStorage.getItem('logged');
const titleNote = document.getElementById("title");
const noteInput = document.getElementById("note");
const obs = document.getElementById("obs");
const buttonPost = document.getElementById("button-post");
const editAndDeleteButton = document.querySelector("#table-principal>tbody");
var DataBaseFunctions;
(function (DataBaseFunctions) {
    DataBaseFunctions.getDB = () => JSON.parse(localStorage.getItem("dbNotes") || "dbNotes");
    DataBaseFunctions.setDB = (item) => localStorage.setItem("dbNotes", JSON.stringify(item));
})(DataBaseFunctions || (DataBaseFunctions = {}));
is_logged();
function is_logged() {
    if (!session) {
        window.location.href = "login.html";
    }
}
function reload() {
    window.location.href = window.location.href;
}
function createNote(title, noteBody, obs) {
    const note = {
        title: title,
        noteBody: noteBody,
        obs: obs
    };
    return note;
}
function saveNote(note) {
    const dbNotes = DataBaseFunctions.getDB();
    dbNotes.push(note);
    DataBaseFunctions.setDB(dbNotes);
}
function refresh() {
    window.location.reload();
}
function createNoteOnScreen(note, index) {
    var _a;
    const newNoteOnScreen = document.createElement("tr");
    newNoteOnScreen.innerHTML =
        `
    <td>${note.title}</td>
    <td>${note.noteBody}</td>
    <td>${note.obs}</td>
    <td><button class="btn btn-info" id="${index}" name="delete">Excluir</button></td>
    <td><button class="btn btn-danger" id="${index}" name="edit">Editar</button></td>
    `;
    (_a = document.querySelector("#table-principal>tbody")) === null || _a === void 0 ? void 0 : _a.appendChild(newNoteOnScreen);
}
function loadNotes() {
    const dbNotes = DataBaseFunctions.getDB();
    dbNotes.forEach(createNoteOnScreen);
}
loadNotes();
function editNote(index) {
    const dbNotes = DataBaseFunctions.getDB()[index];
    const arrayNotes = [];
    arrayNotes.push(dbNotes);
    arrayNotes.forEach(element => {
        const title = element.title;
        const body = element.noteBody;
        const obs = element.obs;
        const titleI = document.getElementById("title");
        titleI.value = title;
        const bodyI = document.getElementById("note");
        bodyI.value = body;
        const obsI = document.getElementById("obs");
        obsI.value = obs;
    });
    deleteNote(index);
}
function deleteNote(index) {
    const dbNotes = DataBaseFunctions.getDB();
    dbNotes.splice(index, 1);
    DataBaseFunctions.setDB(dbNotes);
}
editAndDeleteButton.addEventListener("click", (event) => {
    if (event.target.type === 'submit') {
        if (event.target.name === 'delete') {
            const index = event.target.id;
            deleteNote(index);
            alert("Excluida com sucesso!");
            reload();
        }
        if (event.target.name === 'edit') {
            const index = event.target.id;
            editNote(index);
        }
    }
});
buttonPost.addEventListener("click", () => {
    saveNote(createNote(titleNote.value, noteInput.value, obs.value));
    console.log("test");
    refresh();
});
