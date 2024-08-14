Instalar el proyecto e instalar express seria suficiente para hacerlo funcional.

Los routers cuentan con los siguientes protocolos:

-Products
  °get:
      -'/': Devuelve todos los productos. Se puede enviar por query params limit, page, sort(asc/desc), queryField(representa el campo por el que se va a filtrar puede ser category o disponible) y queryContent que es el
            filtro. En caso de filtrar por disponibilidad traera los productos con stock > queryContent
      -'/:pid': Devuelve el producto con el ID enviado en el parametro
      -'/realtimeproducts': Muestra todos los productso y una actualizacion en vivo de los mismos
   °post:
      -'/': Se debe enviar un objeto JSON con "title, description, price, thumbnail, code, stock y category" y lo agrega al .json
   °delete:
      -'/:pid': Elimina el objeto con el id enviado por parametro
   °put:
      -'/:pid': Se debe enviar un objeto JSON con atributos a modificar del objeto con el ID enviado por parametro

-Carts
   °get:
      -'/:cid': Renderiza los objetos del carrito enviado por parametros
   °post:
      -'/': Se debe enviar una lista JSON con uno o mas objetos(productos). Estos deben tener un atributo ID que no se debe repetir en ningun producto y el atributo quantity. El atributo ID referencia a un producto por lo
         cual debe coincidir con el id de un producto
      -'/:cid/product/:pid': Se añade o actualiza el producto enviado por parametro del carrito enviado por parametro. Se debe enviar por el body un objeto JSON con el atributo "quantity"
   °delete:
      -'/:cid/products/:pid': Elimina el producto enviado del carrito enviado
      -'/:cid': Elimina todos los productos de un carrito
   °put:
      -'/:cid': Reemplaza los productos del carrito por los enviados en el body
      .'/:cid/products/:pid': Actualiza el atributo quantity del producto enviado


Aclaracion: El archivo createProducts.js utiliza faker para crear productos (la categoria no corresponde con el producto pero sirve para testear)
Al fondo de carts js de db managers se encunetran algunas lineas para testear parte del codigo
El correo de administrador de coder no esta cargado, deberia cargarse en la db

Al usuario se le crea automaticamente un carrito. El mismo es al que se le agregan productos cuando se clickea en los botones de la vista "home"