const perfumes = [
  { id: 1, nombre: "Afnan 9pm", precio: 60000 },
  { id: 2, nombre: "Lattafa Khamrah", precio: 48000 },
  { id: 3, nombre: "Honor & Glory", precio: 48000 },
  { id: 4, nombre: "Amber Oud Gold Edition", precio: 70000 },
  { id: 5, nombre: "Lattafa Yara Rose", precio: 43000 }
];

const CLAVE_CARRITO = "carritoPerfumeria";
const CLAVE_ULTIMA_COMPRA = "ultimaCompraPerfumeria";

const formatoPesos = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

const listaProductos = document.querySelector("#lista-productos");
const carritoItems = document.querySelector("#carrito-items");
const textoCarritoVacio = document.querySelector("#carrito-vacio");
const totalCarrito = document.querySelector("#carrito-total");
const botonVaciarCarrito = document.querySelector("#vaciar-carrito");
const formularioCompra = document.querySelector("#form-compra");
const inputContacto = document.querySelector("#contacto-valor");
const mensajeFormulario = document.querySelector("#mensaje-formulario");
const resumenCompra = document.querySelector("#resumen-compra");

function iniciar() {
  mostrarProductos();
  mostrarCarrito();
  restaurarCompra();
  configurarEventos();
}

function configurarEventos() {
  botonVaciarCarrito.addEventListener("click", () => vaciarCarrito());
  formularioCompra.addEventListener("submit", enviarFormulario);

  const radios = formularioCompra.querySelectorAll('input[name="contactoMedio"]');
  radios.forEach(radio => {
    radio.addEventListener("change", () => seleccionarMedio(radio.value));
  });
}

function cargarCarrito() {
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  return guardado ? JSON.parse(guardado) : [];
}

let carrito = cargarCarrito();

function guardarCarrito() {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function mostrarProductos() {
  listaProductos.innerHTML = "";

  perfumes.forEach(perfume => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-producto";
    tarjeta.innerHTML = `
      <div>
        <h3>${perfume.nombre}</h3>
        <p class="tarjeta-producto__precio">${formatoPesos.format(perfume.precio)}</p>
      </div>
      <button class="boton boton--principal">Agregar al carrito</button>
    `;

    tarjeta.querySelector("button").addEventListener("click", () => agregarAlCarrito(perfume.id));

    listaProductos.appendChild(tarjeta);
  });
}

function agregarAlCarrito(id) {
  const producto = perfumes.find(p => p.id === id);
  const existente = carrito.find(p => p.id === id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
  mostrarMensaje(`${producto.nombre} agregado al carrito.`);
}

function incrementar(id) {
  const item = carrito.find(p => p.id === id);
  item.cantidad++;
  actualizarCarrito();
}

function decrementar(id) {
  const item = carrito.find(p => p.id === id);

  if (item.cantidad > 1) {
    item.cantidad--;
  } else {
    carrito = carrito.filter(p => p.id !== id);
  }

  actualizarCarrito();
}

function vaciarCarrito(silencioso = false) {
  carrito = [];
  actualizarCarrito();
  if (!silencioso) mostrarMensaje("Carrito vaciado.");
}

function mostrarCarrito() {
  carritoItems.innerHTML = "";

  if (!carrito.length) {
    textoCarritoVacio.style.display = "block";
    botonVaciarCarrito.disabled = true;
  } else {
    textoCarritoVacio.style.display = "none";
    botonVaciarCarrito.disabled = false;

    carrito.forEach(item => {
      const fila = document.createElement("li");
      fila.className = "item-carrito";
      fila.innerHTML = `
        <div>
          <p>${item.nombre}</p>
          <small>${formatoPesos.format(item.precio)}</small>
        </div>
        <div class="item-carrito__controles">
          <button class="boton-cantidad">-</button>
          <span class="valor-cantidad">${item.cantidad}</span>
          <button class="boton-cantidad">+</button>
        </div>
      `;

      const [restar, sumar] = fila.querySelectorAll(".boton-cantidad");

      restar.addEventListener("click", () => decrementar(item.id));
      sumar.addEventListener("click", () => incrementar(item.id));

      carritoItems.appendChild(fila);
    });
  }

  totalCarrito.textContent = formatoPesos.format(
    carrito.reduce((a, p) => a + p.precio * p.cantidad, 0)
  );

  guardarCarrito();
}

function actualizarCarrito() {
  mostrarCarrito();
}

function seleccionarMedio(medio) {
  inputContacto.disabled = false;
  inputContacto.value = "";
  inputContacto.type = medio === "mail" ? "email" : "tel";
  inputContacto.placeholder = medio === "mail" ? "ejemplo@mail.com" : "1122334455";
  inputContacto.focus();
}

function enviarFormulario(e) {
  e.preventDefault();

  if (!carrito.length) {
    mostrarMensaje("Agregá un perfume antes de confirmar la compra.", "error");
    return;
  }

  const nombre = formularioCompra.clienteNombre.value.trim();
  const medioPago = formularioCompra.medioPago.value;
  const medioContacto = formularioCompra.contactoMedio.value;
  const datoContacto = inputContacto.value.trim();

  if (!nombre || /\d/.test(nombre)) {
    mostrarMensaje("Ingresá un nombre válido.", "error");
    return;
  }

  if (!medioPago) {
    mostrarMensaje("Elegí un medio de pago.", "error");
    return;
  }

  if (!medioContacto) {
    mostrarMensaje("Elegí cómo querés que te contactemos.", "error");
    return;
  }

  if (!datoContacto) {
    mostrarMensaje("Completá el dato de contacto.", "error");
    return;
  }

  if (medioContacto === "mail" && !datoContacto.includes("@")) {
    mostrarMensaje("Ingresá un mail válido.", "error");
    return;
  }

  if (medioContacto === "whatsapp" && !/^[\d\s+-]{6,}$/.test(datoContacto)) {
    mostrarMensaje("Ingresá un número válido.", "error");
    return;
  }

  const total = formatoPesos.format(
    carrito.reduce((a, p) => a + p.precio * p.cantidad, 0)
  );

  const compra = {
    cliente: nombre,
    total,
    medioPago,
    contacto: medioContacto === "mail" ? "Mail" : "Whatsapp",
    datoContacto,
    productos: carrito.map(p => ({
      nombre: p.nombre,
      cantidad: p.cantidad,
      subtotal: formatoPesos.format(p.precio * p.cantidad)
    }))
  };

  mostrarResumen(compra);
  localStorage.setItem(CLAVE_ULTIMA_COMPRA, JSON.stringify(compra));
  mostrarMensaje(`¡Gracias ${nombre}! Te vamos a contactar por ${compra.contacto}.`, "exito");

  formularioCompra.reset();
  inputContacto.disabled = true;
  inputContacto.placeholder = "Elegí antes un método";
  vaciarCarrito(true);
}

function mostrarResumen(compra) {
  resumenCompra.classList.add("visible");
  resumenCompra.innerHTML = `
    <h3>Resumen de compra</h3>
    <p><strong>Cliente:</strong> ${compra.cliente}</p>
    <p><strong>Total:</strong> ${compra.total}</p>
    <p><strong>Medio de pago:</strong> ${compra.medioPago}</p>
    <p><strong>Contacto:</strong> ${compra.contacto} - ${compra.datoContacto}</p>
    <h4>Productos</h4>
    <ul>
      ${compra.productos
        .map(p => `<li>${p.nombre} x${p.cantidad} (${p.subtotal})</li>`)
        .join("")}
    </ul>
  `;
}

function restaurarCompra() {
  const guardado = localStorage.getItem(CLAVE_ULTIMA_COMPRA);
  if (!guardado) return;
  const compra = JSON.parse(guardado);
  mostrarResumen(compra);
}

function mostrarMensaje(texto, tipo = "info") {
  mensajeFormulario.textContent = texto;
  mensajeFormulario.className = "estado";

  if (tipo === "exito") {
    mensajeFormulario.classList.add("estado--exito");
  } else if (tipo === "error") {
    mensajeFormulario.classList.add("estado--error");
  }
}

if (listaProductos) {
  iniciar();
}
