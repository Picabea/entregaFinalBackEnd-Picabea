const socket = io()

const buttons = document.querySelectorAll("button")

for(const button of buttons){
    if(button.id != 'comprar'){
        button.addEventListener("click", async() => {
            
            console.log("agregando product")
            const productId = button.id.slice(7)
            let product = {
                productId,
                quantity: 1
            }
            const cart = document.querySelector("#cart").innerHTML
            if(cart){
                socket.emit("addProductToCart", {
                    cid: cart, 
                    pid: productId
            })
            }else{
                socket.emit("createCart", [product])
            }
        })
    }
}



function hasCart(){
    const cart = localStorage.getItem("cart")
    
    if(cart){
        return true
    }else{
        return false
    }
}

socket.on("result", (result) => {
    localStorage.setItem("cart", result._id)
})

socket.on("resultAddProductToCart", (result) => {
    console.log(result)
})

socket.on("error", (err) => {
    console.log(err)
})