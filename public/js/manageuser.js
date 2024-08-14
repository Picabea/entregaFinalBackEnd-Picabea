const socket = io()

const uidLabel = document.querySelector('#uid')
const uid = uidLabel.innerHTML


const deleteUserButton = document.querySelector('#deleteUserButton')

deleteUserButton.addEventListener('click', async () => {
    socket.emit('deleteUser', {uid})
})


const setUserButton = document.querySelector('#setUserButton')

setUserButton.addEventListener('click', async() => {
    socket.emit('changeRole', {uid, role: 'user'})
})


const setPremiumButton = document.querySelector('#setPremiumButton')

setPremiumButton.addEventListener('click', async() => {
    socket.emit('changeRole', {uid, role: 'premium'})
})


const setAdminButton = document.querySelector('#setAdminButton')

setAdminButton.addEventListener('click', async() => {
    socket.emit('changeRole', {uid, role: 'admin'})
})


socket.on('resultDeleteUser', (result) => {
    console.log(result)
})

socket.on('resultChangeRole', (res) => {
    console.log(res)
})

socket.on('error', (error) => {
    console.log(error)
})