const socket = io()

const div = document.querySelector('#products')
const deleteInput = document.querySelector('#deleteNumber')
const deleteButton = document.querySelector('#deleteSubmit')
const addButton = document.querySelector('#addSubmit')

deleteButton.addEventListener("click", () => {
    const id = deleteInput.value

    socket.emit("delete", id)

})
addButton.addEventListener("click", () => {
    const title = document.querySelector('#title').value
    const description = document.querySelector('#description').value
    const price = document.querySelector('#price').value
    const thumbnail = document.querySelector('#thumbnail').value
    const code = document.querySelector('#code').value
    const stock = document.querySelector('#stock').value
    const category = document.querySelector('#category').value

    const product = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        category: category
      }
    socket.emit("add", product)

})

socket.on('products', (products) => {
    console.log("Actualizando productos")
    div.innerHTML = ""
    console.log(products)
    for(const product of products){
        let producto = document.createElement('p')
        producto.innerText = product.title
        div.appendChild(producto)
    }
    
})