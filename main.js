const perfumes = [
    {id: 1, nombre: "Afnan 9pm", precio: 60000},
    {id: 2, nombre: "Lattafa Khamrah", precio: 48000},
    {id: 3, nombre: "Honor & Glory", precio: 48000},
    {id: 4, nombre: "Amber Oud Gold Edition", precio: 70.000},
    {id: 5, nombre: "Lattafa Yara rose", precio: 43000},
]

let carrito = [];
let continuar = true;
let total = 0;
do {
    let eleccion = prompt("¿Qué producto desea añadir al carrito?\n" +
    "1- Afnan 9pm\n" +
    "2- Lattafa Khamrah\n" +
    "3- Honor & Glory\n" +
    "4- Amber Oud Gold Edition\n" +
    "5- Lattafa Yara rose\n" +
    "6- Salir\n" +
    "7- Continuar con la compra");

switch (eleccion) {
    case "1": 
        carrito.push(perfumes[0]);
        console.log(carrito);
        break;

    case "2": 
        carrito.push(perfumes[1]);
        console.log(carrito);
        break;

    case "3": 
        carrito.push(perfumes[2]);
        console.log(carrito);
        break;

    case "4": 
        carrito.push(perfumes[3]);
        console.log(carrito);
        break;

    case "5": 
        carrito.push(perfumes[4]);
        console.log(carrito);
        break;

    case "6": 
        continuar = false;
        
        break;

    case "7": 
        continuar = false;
        alert("Continuando con la compra...");
        break;

    default:
        alert("Opcion invalida, elija una opcion del 1 al 7")
        break;
}
} while (continuar);

for (let i = 0; i < carrito.length; i++) {
    const producto = carrito[i];
    total = total + producto.precio; 
}

let confirmacionPrecio= confirm(`El total de su compra es de $${total}
¿Desea seguir con la compra?`);

let nombre;

if (confirmacionPrecio === true) {
    nombre= prompt("Indique su nombre y apellido");
} else {
    alert("Compra cancelada");
}

const mediosPago = ["Tarjeta de credito ", "Tarjeta de debito ", "Transferencia"]

let eleccionPago = prompt("Como desea pagar?\n" + "1-Tarjeta de credito\n" + "2-Tarjeta de debito\n" + "3-Transferencia")

const contacto = ["Mail", "Whatsapp"]

let preferenciaContacto = prompt("Por donde prefiere ser contactado para concluir pago y envio?\n" + "1-Mail\n" + "2-Whatsapp"
)

if (contacto === 1) {
    prompt("Indique su Email por el que sera contactado...")
} else {
    prompt("Indique su numero de telefono por el cual nos comunicaremos...")
}

let pagoConfirmado = alert("¡Felicitaciones, " + nombre + "!, su compra se ha hecho con exito, en la brevedad lo contactaremos para cerrar el pago y el envio. ¡Saludos!")