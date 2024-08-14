const socket = io()

if(!localStorage.getItem('userEmail')){
    Swal.fire({
        title: "Identificate para continuar",
        input: "email",
        text: "Ingresa tu email",
        inputValidator: (value) => {
            if(!value){
                return "Coloca tu email para continuar!"
            }
            return false
        },
        allowOutsideClick: false
    })
    .then(input => {const email = input.value
    localStorage.setItem('userEmail', email)})
}

const button = document.querySelector("button")
const input = document.querySelector("input")
const div = document.querySelector("#mensajes")

button.addEventListener("click", () => {
    let message = input.value
    let email = localStorage.getItem("userEmail")
    socket.emit("message", {message, email})

    div.innerHTML += `<p>${email}: ${message}</p>`
    input.value = ""
})

socket.on('loadMessages', (messages) => {
    div.innerHTML = ""
    
    for(const message of messages){
        let messageParagraph = document.createElement('p')
        messageParagraph.innerText = message.email + ": " + message.message
        div.appendChild(messageParagraph)
    }
    
})

socket.on('newMessage', (message) => {
    let messageParagraph = document.createElement('p')
    messageParagraph.innerText = message.email + ": " + message.message
    div.appendChild(messageParagraph)

    
})