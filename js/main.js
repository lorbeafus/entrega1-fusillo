const preciosSitio = [
  { tipo: "Landing", precio: 300 },
  { tipo: "Institucional", precio: 500 },
  { tipo: "Tienda online", precio: 900 }
];

const extras = [
  { nombre: "Mantenimiento", precio: 100 },
  { nombre: "Hosting", precio: 80 },
  { nombre: "SEO básico", precio: 120 }
];

const historialPresupuestos = JSON.parse(localStorage.getItem("historialPresupuestos")) || [];

const menuPrincipal = document.getElementById('menu-principal');
const formPresupuesto = document.getElementById('form-presupuesto');
const infoSitios = document.getElementById('info-sitios');
const infoExtras = document.getElementById('info-extras');
const resultado = document.getElementById('resultado');

const btnCrearPresupuesto = document.getElementById('btn-crear-presupuesto');
const btnVerSitios = document.getElementById('btn-ver-sitios');
const btnVerExtras = document.getElementById('btn-ver-extras');

const btnCancelar = document.getElementById('btn-cancelar');
const btnVolverSitios = document.getElementById('btn-volver-sitios');
const btnVolverExtras = document.getElementById('btn-volver-extras');
const btnVolverResultado = document.getElementById('btn-volver-resultado');
const btnNuevoPresupuesto = document.getElementById('btn-nuevo-presupuesto');

const todasLasSecciones = [menuPrincipal, formPresupuesto, infoSitios, infoExtras, resultado];

function mostrarSeccion(seccionAMostrar) {
  todasLasSecciones.forEach(seccion => {
    seccion.classList.remove('active');
  });
  seccionAMostrar.classList.add('active');
}

const presupuestoForm = document.getElementById('presupuesto-form');

function volverAlMenu() {
  mostrarSeccion(menuPrincipal);
}

function generarTiposSitio() {
  const tipoSitioGroup = document.getElementById('tipo-sitio-group');
  tipoSitioGroup.innerHTML = '';
  
  preciosSitio.forEach((sitio, indice) => {
    const radioOption = document.createElement('div');
    radioOption.className = 'radio-option';
    
    radioOption.innerHTML = `
      <input type="radio" name="tipo-sitio" value="${indice}" id="sitio-${indice}" ${indice === 0 ? 'checked' : ''}>
      <label for="sitio-${indice}" class="option-label">${sitio.tipo}</label>
      <span class="option-price">USD ${sitio.precio}</span>
    `;
    
    tipoSitioGroup.appendChild(radioOption);
  });
}

function generarExtras() {
  const extrasGroup = document.getElementById('extras-group');
  extrasGroup.innerHTML = '';
  
  extras.forEach((extra, indice) => {
    const checkboxOption = document.createElement('div');
    checkboxOption.className = 'checkbox-option';
    
    checkboxOption.innerHTML = `
      <input type="checkbox" name="extras" value="${indice}" id="extra-${indice}">
      <label for="extra-${indice}" class="option-label">${extra.nombre}</label>
      <span class="option-price">USD ${extra.precio}</span>
    `;
    
    extrasGroup.appendChild(checkboxOption);
  });
}

function mostrarListaSitios() {
  const listaSitios = document.getElementById('lista-sitios');
  listaSitios.innerHTML = '';
  
  preciosSitio.forEach(sitio => {
    const infoItem = document.createElement('div');
    infoItem.className = 'info-item';
    infoItem.innerHTML = `
      <span class="info-item-nombre">${sitio.tipo}</span>
      <span class="info-item-precio">USD ${sitio.precio}</span>
    `;
    listaSitios.appendChild(infoItem);
  });
}

function mostrarListaExtras() {
  const listaExtras = document.getElementById('lista-extras');
  listaExtras.innerHTML = '';
  
  extras.forEach(extra => {
    const infoItem = document.createElement('div');
    infoItem.className = 'info-item';
    infoItem.innerHTML = `
      <span class="info-item-nombre">${extra.nombre}</span>
      <span class="info-item-precio">USD ${extra.precio}</span>
    `;
    listaExtras.appendChild(infoItem);
  });
}

function calcularPresupuesto(tipoSitio, extrasElegidos) {
  return extrasElegidos.reduce((total, extra) => total + extra.precio, tipoSitio.precio);
}

function guardarPresupuestoEnStorage(presupuesto) {
  historialPresupuestos.push(presupuesto);
  localStorage.setItem("historialPresupuestos", JSON.stringify(historialPresupuestos));
}

function mostrarResultado(nombre, tipoSitio, extrasElegidos, total) {
  const resultadoContenido = document.getElementById('resultado-contenido');
  
  const mensajeExtras = extrasElegidos.length > 0 
    ? extrasElegidos.map(extra => extra.nombre).join(', ') 
    : 'Ninguno';
  
  resultadoContenido.innerHTML = `
    <div class="resultado-item"><strong>Cliente:</strong> ${nombre}</div>
    <div class="resultado-item"><strong>Tipo de sitio:</strong> ${tipoSitio.tipo}</div>
    <div class="resultado-item"><strong>Extras:</strong> ${mensajeExtras}</div>
    <div class="resultado-total">Presupuesto Final: USD ${total}</div>
  `;
  
  mostrarSeccion(resultado);
  
  const fechaActual = new Date();
  const fechaFormateada = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()} ${fechaActual.getHours()}:${fechaActual.getMinutes()}`;
  
  const presupuesto = {
    nombre: nombre,
    tipoSitio: tipoSitio.tipo,
    extras: extrasElegidos.map(extra => extra.nombre),
    total: total,
    fecha: fechaFormateada
  };
  
  guardarPresupuestoEnStorage(presupuesto);
}

btnCrearPresupuesto.addEventListener('click', () => {
  mostrarSeccion(formPresupuesto);
  document.getElementById('nombre-cliente').value = '';
  document.querySelectorAll('input[name="extras"]').forEach(cb => cb.checked = false);
  document.querySelector('input[name="tipo-sitio"]').checked = true;
});

btnVerSitios.addEventListener('click', () => {
  mostrarListaSitios();
  mostrarSeccion(infoSitios);
});

btnVerExtras.addEventListener('click', () => {
  mostrarListaExtras();
  mostrarSeccion(infoExtras);
});

btnCancelar.addEventListener('click', volverAlMenu);
btnVolverSitios.addEventListener('click', volverAlMenu);
btnVolverExtras.addEventListener('click', volverAlMenu);
btnVolverResultado.addEventListener('click', volverAlMenu);

btnNuevoPresupuesto.addEventListener('click', () => {
  mostrarSeccion(formPresupuesto);
  document.getElementById('nombre-cliente').value = '';
  document.querySelectorAll('input[name="extras"]').forEach(cb => cb.checked = false);
  document.querySelector('input[name="tipo-sitio"]').checked = true;
});

presupuestoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre-cliente').value.trim();
  if (nombre === '') {
    return;
  }
  const tipoSeleccionado = document.querySelector('input[name="tipo-sitio"]:checked');
  const tipoSitio = preciosSitio[parseInt(tipoSeleccionado.value)];
  const extrasCheckboxes = document.querySelectorAll('input[name="extras"]:checked');
  const extrasElegidos = Array.from(extrasCheckboxes).map(checkbox => extras[parseInt(checkbox.value)]);
  const total = calcularPresupuesto(tipoSitio, extrasElegidos);
  mostrarResultado(nombre, tipoSitio, extrasElegidos, total);
});

function inicializarApp() {
  generarTiposSitio();
  generarExtras();
  volverAlMenu();
}

inicializarApp();

