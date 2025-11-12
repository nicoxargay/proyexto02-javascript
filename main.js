const perfumes = [
  { id: 1, nombre: "Afnan 9pm", precio: 60000 },
  { id: 2, nombre: "Lattafa Khamrah", precio: 48000 },
  { id: 3, nombre: "Honor & Glory", precio: 48000 },
  { id: 4, nombre: "Amber Oud Gold Edition", precio: 70000 },
  { id: 5, nombre: "Lattafa Yara rose", precio: 43000 },
];

function mostrarMenuProductos() {
  let carrito = [];
  let continuar = true;

  do {
    let eleccion = prompt(
      "¿Qué producto desea añadir al carrito?\n" +
        "1- Afnan 9pm\n" +
        "2- Lattafa Khamrah\n" +
        "3- Honor & Glory\n" +
        "4- Amber Oud Gold Edition\n" +
        "5- Lattafa Yara rose\n" +
        "6- Salir\n" +
        "7- Continuar con la compra"
    );

    
    if (eleccion === null) {
      alert("Compra cancelada");
      return [];
    }

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
        alert("Opción inválida. Elija una opción del 1 al 7.");
        break;
    }
  } while (continuar);

  return carrito;
}

function calcularTotal(carrito) {
  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    const producto = carrito[i];
    total = total + producto.precio;
  }
  return total;
}

function procesarCompra(total, carrito) {
  let confirmacionPrecio = confirm(
    `El total de su compra es de $${total}\n¿Desea seguir con la compra?`
  );

  if (!confirmacionPrecio) {
    alert("Compra cancelada");
    return;
  }

  const mediosPago = [
    "Tarjeta de crédito",
    "Tarjeta de débito",
    "Transferencia",
  ];
  const contacto = ["Mail", "Whatsapp"];

  // Solicitar nombre
  let nombre = prompt("Indique su nombre y apellido:");
  while (nombre && (/\d/.test(nombre) || nombre.trim() === "")) {
    alert("Ingrese un nombre válido (solo letras).");
    nombre = prompt("Indique su nombre y apellido:");
  }
  if (nombre === null) {
    alert("Compra cancelada");
    return;
  }

  // Elegir método de pago
  let eleccionPago = prompt(
    "¿Cómo desea pagar?\n1- Tarjeta de crédito\n2- Tarjeta de débito\n3- Transferencia"
  );
  while (
    eleccionPago !== "1" &&
    eleccionPago !== "2" &&
    eleccionPago !== "3" &&
    eleccionPago !== null
  ) {
    alert("Opción inválida. Elija 1, 2 o 3.");
    eleccionPago = prompt(
      "¿Cómo desea pagar?\n1- Tarjeta de crédito\n2- Tarjeta de débito\n3- Transferencia"
    );
  }
  if (eleccionPago === null) {
    alert("Compra cancelada");
    return;
  }

  // Preferencia de contacto
  let preferenciaContacto = prompt(
    "¿Por dónde prefiere ser contactado para concluir pago y envío?\n1- Mail\n2- Whatsapp"
  );
  while (
    preferenciaContacto !== "1" &&
    preferenciaContacto !== "2" &&
    preferenciaContacto !== null
  ) {
    alert("Opción inválida. Elija 1 o 2.");
    preferenciaContacto = prompt(
      "¿Por dónde prefiere ser contactado para concluir pago y envío?\n1- Mail\n2- Whatsapp"
    );
  }
  if (preferenciaContacto === null) {
    alert("Compra cancelada");
    return;
  }

  // Solicitar dato de contacto
  let contactoFinal;
  if (preferenciaContacto === "1") {
    contactoFinal = prompt("Indique su Email por el que será contactado...");
    while (contactoFinal && !contactoFinal.includes("@")) {
      alert("Ingrese un correo válido (debe incluir @).");
      contactoFinal = prompt("Indique su Email por el que será contactado...");
    }
  } else {
    contactoFinal = prompt(
      "Indique su número de teléfono por el cual nos comunicaremos..."
    );
    while (contactoFinal && isNaN(contactoFinal)) {
      alert("Ingrese un número válido (solo dígitos).");
      contactoFinal = prompt(
        "Indique su número de teléfono por el cual nos comunicaremos..."
      );
    }
  }
  if (contactoFinal === null) {
    alert("Compra cancelada");
    return;
  }

  // Confirmación final
  alert(
    `¡Felicitaciones, ${nombre}!\nSu compra se ha hecho con éxito.\nEn la brevedad lo contactaremos por ${
      contacto[preferenciaContacto - 1]
    } al ${contactoFinal} para cerrar el pago y el envío. ¡Saludos!`
  );

  // Resumen en consola
  let resumenCompra = {
    cliente: nombre,
    total: total,
    metodoPago: mediosPago[eleccionPago - 1],
    contactoPreferido: contacto[preferenciaContacto - 1],
    datoContacto: contactoFinal,
    productos: carrito,
  };

  console.log(resumenCompra);
}

// Ejecución del programa
let carrito = mostrarMenuProductos();
if (carrito.length === 0) {
  alert("Compra finalizada. ¡Hasta luego!");
} else {
  let total = calcularTotal(carrito);
  procesarCompra(total, carrito);
}

