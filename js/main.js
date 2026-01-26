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

function pedirTipoSitio() {
  let opcion = prompt("Ingrese el número del tipo de sitio:\n1-Landing\n2-Institucional\n3-Tienda online");
  let indice = parseInt(opcion) - 1; // Convertir a número y restar 1 para el índice
  
  // Validar que sea una opción válida
  if (indice >= 0 && indice < preciosSitio.length) {
    return preciosSitio[indice];
  } else {
    alert("Opción inválida. Se seleccionó Landing por defecto.");
    return preciosSitio[0];
  }
}

function pedirExtras() {
  let extrasElegidos = [];
  
  // Usar FOR para recorrer todos los extras
  for (let i = 0; i < extras.length; i++) {
    if (confirm("¿Desea agregar " + extras[i].nombre + " (USD " + extras[i].precio + ")?")) {
      extrasElegidos.push(extras[i]);
    }
  }
  
  return extrasElegidos;
}

function calcularPresupuesto(tipoSitio, extrasElegidos) {
  let total = tipoSitio.precio;

  for (let extra of extrasElegidos) {
    total += extra.precio;
  }

  return total;
}

function mostrarResultado(nombre, tipoSitio, extrasElegidos, total) {
  let mensajeExtras = extrasElegidos.length > 0 
    ? extrasElegidos.map(e => e.nombre).join(", ") 
    : "Ninguno";
    
  alert("Cliente: " + nombre + 
        "\nTipo de sitio: " + tipoSitio.tipo + 
        "\nExtras: " + mensajeExtras + 
        "\nPresupuesto final: USD " + total);
        
  console.log("Cliente:", nombre);
  console.log("Tipo de sitio:", tipoSitio.tipo);
  console.log("Extras:", mensajeExtras);
  console.log("Total: USD", total);
}

function iniciarSimulador() {
  let continuar = true;

  while (continuar) {
    let nombre = prompt("Ingrese su nombre:");
    let tipoElegido = pedirTipoSitio();
    let extrasElegidos = pedirExtras();
    
    const total = calcularPresupuesto(tipoElegido, extrasElegidos);
    mostrarResultado(nombre, tipoElegido, extrasElegidos, total);

    continuar = confirm("¿Desea realizar otro presupuesto?");
  }
  
  alert("¡Gracias por usar nuestro simulador!");
}

iniciarSimulador();
