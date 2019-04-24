//archivo que contiene la logica 

class Producto{

    constructor(nombre, precio, year){
        this.nombre = nombre;
        this.precio = precio;
        this.year = year;
    }


}


class Ui{
    //clase que va acceder al DOM 

    //agregar un nuevo producto
    addProduct(producto){

        //almacenamos en esta constante el div con el id 'product-list'
        const productList = document.getElementById('product-list');

        // creamos un elemento div y lo guardamos en la constante elemento
        const elemento = document.createElement('div');

        // agregamos a la constante elemento codigo html con la funcion inner html  
        // el este html accedemos a las propiedades de el objeto producto que se instancio de la clase producto
        elemento.innerHTML = ` 
            <div class="card text-center mb-4">
                <div clas="card-body">
                    <strong>Producto Nombre</strong>: ${producto.nombre}
                    <strong>Producto Precio</strong>: ${producto.precio}
                    <strong>Producto Year</strong>: ${producto.year}
                    <a href="#" class="btn btn-danger" name="delete" >Delete</a>

                </div>
            
            </div>
        `;

        // ahora agregams como etiqueta hija a el div prodct-list el div que se almaceno en elemento 
        productList.appendChild(elemento);
    
    }

    limpiarCampos(){
        //limpia los campos 
        document.getElementById('product-form').reset();// resetea el formulario 
    }

    //metodo para eliminar un producto
    deleteProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.remove();
        }
    }

    //metodo para mostar mensajes
    showMessage(mensaje, cssclase){
        const div = document.createElement('div');
        div.className = `alert alert-${cssclase} mt-3`;//concatenamos con el parametro clase
        div.appendChild(document.createTextNode(mensaje));
        // mostrando en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        

        container.insertBefore(div,app);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }
}


// capturacion de eventos del DOM

//EVENTO GUARDAR   (SUBMIT)
// obtenemos el formulario del dom con el id 'product-form' y le dams un listener
// al listener le pasamos como parametro submit para que nos capture en evio del formulario 
// como segundo parametro del listener de pasamos una funcion que obtiene el valor ingresado en cada input
document.getElementById('product-form').addEventListener('submit', function(e) {
    
    // obtenemos los valores haciendo referencia a los elemtos por id y los almacenamos en constantes
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const year = document.getElementById('year').value;
    
    // instanciamos un objeto de la clase producto pasandole como parametros los valores obtenidos antes
    const producto = new Producto(nombre, precio, year);

    
    //instanciamos la clase Ui en el objeti ui
    const ui = new Ui();

    if(nombre == '' || precio == '' || year == ''){
        ui.showMessage('Complete los campos', 'info');
    }else{
        // accedemos a metodo addProduct por medio del objeto ui y le pasamos el objeto producto
        ui.addProduct(producto);

        //limpia los campos despues de añadir el producto 
        ui.limpiarCampos();
        ui.showMessage('Producto agregado','success');
        // metodo para hacer que la pagina no se recarge al enviar el formulario y solo limpie los campos
        e.preventDefault();
    }
    
   
});

// EVENTO CLICK
document.getElementById('product-list').addEventListener('click', function(e) {
    const ui = new Ui();

    ui.deleteProduct(e.target);

    ui.showMessage('Producto Eliminado', 'danger');
    
})