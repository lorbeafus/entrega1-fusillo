const carrito = JSON.parse(localStorage.getItem("historialPresupuestos")) || [];

const listaCarrito = document.getElementById('lista-carrito');
const btnLimpiarCarrito = document.getElementById('btn-limpiar-carrito');

function mostrarCarrito() {
  listaCarrito.innerHTML = '';
  
  if (carrito.length === 0) {
    const mensajeVacio = document.createElement('div');
    mensajeVacio.className = 'carrito-vacio';
    mensajeVacio.innerHTML = `
      <p class="carrito-vacio-mensaje">
        🛒 No hay presupuestos en el carrito aún.
      </p>
      <p class="carrito-vacio-submensaje">
        Crea tu primer presupuesto para verlo aquí.
      </p>
    `;
    listaCarrito.appendChild(mensajeVacio);
    return;
  }
  
  //Calculo del total antes de renderizar
  const totalGeneral = carrito.reduce((total, p) => total + p.total, 0);
  
  carrito.forEach((presupuesto, indice) => {
    const card = document.createElement('div');
    card.className = 'historial-card';
    
    const extrasTexto = presupuesto.extras.length > 0 ? presupuesto.extras.join(', ') : 'Ninguno';

    card.innerHTML = `
      <div class="historial-fecha">${presupuesto.fecha}</div>
      <div class="historial-item"><strong>Cliente:</strong> ${presupuesto.nombre}</div>
      <div class="historial-item"><strong>Email:</strong> ${presupuesto.email}</div>
      <div class="historial-item"><strong>Teléfono:</strong> ${presupuesto.telefono}</div>
      <div class="historial-item"><strong>Tipo de Sitio:</strong> ${presupuesto.tipoSitio}</div>
      <div class="historial-item"><strong>Extras:</strong> ${extrasTexto}</div>
      <div class="historial-total">USD ${presupuesto.total}</div>
      <button class="btn-eliminar" data-indice="${indice}">Eliminar</button>
    `;
    
    //botón creado dentro del innerHTML
    card.querySelector('.btn-eliminar').addEventListener('click', () => eliminarPresupuesto(indice));
    
    listaCarrito.appendChild(card);
  });
  
  const resumenTotal = document.createElement('div');
  resumenTotal.className = 'resumen-total';
  resumenTotal.innerHTML = `
    <div class="resumen-total-cantidad">Total de Presupuestos: ${carrito.length}</div>
    <div class="resumen-total-precio">Total General: USD ${totalGeneral}</div>
  `;
  
  listaCarrito.appendChild(resumenTotal);
}

function eliminarPresupuesto(indice) {
  carrito.splice(indice, 1);
  localStorage.setItem("historialPresupuestos", JSON.stringify(carrito));
  mostrarCarrito();
}

function limpiarCarrito() {
  if (carrito.length === 0) {
    return;
  }
  
  carrito.length = 0;
  localStorage.removeItem("historialPresupuestos");
  mostrarCarrito();
}

btnLimpiarCarrito.addEventListener('click', limpiarCarrito);

mostrarCarrito();