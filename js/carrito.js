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
  
  let totalGeneral = 0;
  
  for (const presupuesto of carrito) {
    const card = document.createElement('div');
    card.className = 'historial-card';
    
    const fecha = document.createElement('div');
    fecha.className = 'historial-fecha';
    fecha.textContent = presupuesto.fecha;
    
    const cliente = document.createElement('div');
    cliente.className = 'historial-item';
    cliente.innerHTML = `<strong>Cliente:</strong> ${presupuesto.nombre}`;
    
    const tipo = document.createElement('div');
    tipo.className = 'historial-item';
    tipo.innerHTML = `<strong>Tipo de Sitio:</strong> ${presupuesto.tipoSitio}`;
    
    const extrasTexto = presupuesto.extras.length > 0 ? presupuesto.extras.join(', ') : 'Ninguno';
    const extrasDiv = document.createElement('div');
    extrasDiv.className = 'historial-item';
    extrasDiv.innerHTML = `<strong>Extras:</strong> ${extrasTexto}`;
    
    const total = document.createElement('div');
    total.className = 'historial-total';
    total.textContent = `USD ${presupuesto.total}`;
    
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.textContent = 'Eliminar';
    
    const indice = carrito.indexOf(presupuesto);
    btnEliminar.addEventListener('click', () => eliminarPresupuesto(indice));
    
    card.appendChild(fecha);
    card.appendChild(cliente);
    card.appendChild(tipo);
    card.appendChild(extrasDiv);
    card.appendChild(total);
    card.appendChild(btnEliminar);
    
    listaCarrito.appendChild(card);
    
    totalGeneral += presupuesto.total;
  }
  
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