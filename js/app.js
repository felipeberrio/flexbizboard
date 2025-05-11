console.log("FlexBizBoard cargado correctamente ✅");

const btnAgregarMaterial = document.getElementById("agregar-material");
const tabla = document.getElementById("tabla-materiales");
const totalDiv = document.getElementById("total-materiales");


let obras = [];
let contadorClaveObra = 1;
let gastos = [];
let contadorClaveGasto = 1;

let materiales = [];
let contadorClaveMaterial = 1;

let ventas = [];
let contadorClaveVenta = 1;


btnAgregarMaterial.addEventListener("click", () => {
    const nombre = document.getElementById("material-nombre").value.trim();
    const unidad = document.getElementById("material-unidad").value.trim();
    const costo = parseFloat(document.getElementById("material-costo").value);
    const cantidad = parseFloat(document.getElementById("material-cantidad").value);

    if (nombre && unidad && !isNaN(costo) && !isNaN(cantidad)) {
    // Clave automática
    const clave = `MT${String(contadorClaveMaterial).padStart(5, "0")}`;
    contadorClaveMaterial++;
    
    const total = costo * cantidad;
    materiales.push({ clave, nombre, unidad, costo, cantidad, total });
    renderizarTabla();
    limpiarInputs();
    actualizarClaveGenerada(); // para mostrar la siguiente clave
}
});

function actualizarClaveGenerada() {
    const clavePreview = `MT${String(contadorClaveMaterial).padStart(5, "0")}`;
  document.getElementById("clave-generada").textContent = clavePreview;
}


function renderizarTabla() {
    tabla.innerHTML = "";
    let totalGlobal = 0;
    
    materiales.forEach((m, index) => {
        totalGlobal += m.total;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${m.clave}</td>
      <td>${m.nombre}</td>
      <td>${m.unidad}</td>
      <td>$${m.costo.toFixed(2)}</td>
      <td>${m.cantidad}</td>
      <td>$${m.total.toFixed(2)}</td>
      <td><button onclick="eliminarMaterial(${index})">❌</button></td>
      `;
      tabla.appendChild(fila);
    });

    totalDiv.textContent = `Total en materiales: $${totalGlobal.toFixed(2)}`;
}

function eliminarMaterial(index) {
  materiales.splice(index, 1);
  renderizarTabla();
}

function limpiarInputs() {
  document.getElementById("material-clave").value = "";
  document.getElementById("material-nombre").value = "";
  document.getElementById("material-unidad").value = "";
  document.getElementById("material-costo").value = "";
  document.getElementById("material-cantidad").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarClaveGenerada();
  // ... el resto de tus funciones
  });

  document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("negocio");
    const titulo = document.getElementById("negocio-actual");
    const inputNuevo = document.getElementById("nuevoNegocio");
    const btnAgregar = document.getElementById("agregarNegocio");
    const btnBorrar = document.getElementById("borrarNegocio");
  
    let negocios = [];
  
    // Cambiar texto cuando se selecciona
    selector.addEventListener("change", () => {
      const nombre = selector.options[selector.selectedIndex].text;
      titulo.textContent = `Negocio activo: ${nombre}`;
    });
  
    // Agregar nuevo negocio
    btnAgregar.addEventListener("click", () => {
      const nuevo = inputNuevo.value.trim();
      if (nuevo && !negocios.includes(nuevo)) {
        const option = document.createElement("option");
        option.text = nuevo;
        option.value = nuevo.toLowerCase().replace(/\s+/g, "-");
        selector.add(option);
        negocios.push(nuevo);
        selector.value = option.value;
        titulo.textContent = `Negocio activo: ${nuevo}`;
        inputNuevo.value = "";
      }
    });
  
    // Borrar negocio seleccionado
    btnBorrar.addEventListener("click", () => {
      const selected = selector.selectedIndex;
      if (selected > 0) {
        const removed = selector.options[selected].text;
        selector.remove(selected);
        negocios = negocios.filter(n => n !== removed);
        titulo.textContent = `Negocio activo: Ninguno`;
        selector.value = "";
      }
    });
  });

  const btnAgregarObra = document.getElementById("agregar-obra");
const tablaObra = document.getElementById("tabla-obra");
const totalObra = document.getElementById("total-obra");

btnAgregarObra.addEventListener("click", () => {
  const cargo = document.getElementById("obra-cargo").value.trim();
  const horas = parseFloat(document.getElementById("obra-horas").value);
  const tarifa = parseFloat(document.getElementById("obra-tarifa").value);

  if (cargo && !isNaN(horas) && !isNaN(tarifa)) {
    const clave = `MO${String(contadorClaveObra).padStart(5, "0")}`;
    contadorClaveObra++;

    const total = horas * tarifa;
    obras.push({ clave, cargo, horas, tarifa, total });
    renderizarTablaObra();
    limpiarInputsObra();
    actualizarClaveObra();
  }
});

function renderizarTablaObra() {
  tablaObra.innerHTML = "";
  let totalGlobal = 0;

  obras.forEach((o, index) => {
    totalGlobal += o.total;
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${o.clave}</td>
      <td>${o.cargo}</td>
      <td>${o.horas}</td>
      <td>$${o.tarifa.toFixed(2)}</td>
      <td>$${o.total.toFixed(2)}</td>
      <td><button onclick="eliminarObra(${index})">❌</button></td>
    `;
    tablaObra.appendChild(fila);
  });

  totalObra.textContent = `Total mano de obra: $${totalGlobal.toFixed(2)}`;
}

function eliminarObra(index) {
  obras.splice(index, 1);
  renderizarTablaObra();
}

function limpiarInputsObra() {
  document.getElementById("obra-cargo").value = "";
  document.getElementById("obra-horas").value = "";
  document.getElementById("obra-tarifa").value = "";
}

function actualizarClaveObra() {
  const clavePreview = `MO${String(contadorClaveObra).padStart(5, "0")}`;
  document.getElementById("clave-obra-generada").textContent = clavePreview;
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarClaveGenerada();  // materiales
  actualizarClaveObra();      // mano de obra
});

const btnAgregarGasto = document.getElementById("agregar-gasto");
const tablaGastos = document.getElementById("tabla-gastos");
const totalGastos = document.getElementById("total-gastos");

btnAgregarGasto.addEventListener("click", () => {
  const nombre = document.getElementById("gasto-nombre").value.trim();
  const tipo = document.getElementById("gasto-tipo").value;
  const unidad = document.getElementById("gasto-unidad").value.trim();
  const costo = parseFloat(document.getElementById("gasto-costo").value);
  const cantidad = parseFloat(document.getElementById("gasto-cantidad").value);

  if (nombre && tipo && unidad && !isNaN(costo) && !isNaN(cantidad)) {
    const clave = `DP${String(contadorClaveGasto).padStart(5, "0")}`;
    contadorClaveGasto++;

    const total = costo * cantidad;
    gastos.push({ clave, nombre, tipo, unidad, costo, cantidad, total });
    renderizarTablaGastos();
    limpiarInputsGasto();
    actualizarClaveGasto();
  }
});

function renderizarTablaGastos() {
  tablaGastos.innerHTML = "";
  let totalGlobal = 0;

  gastos.forEach((g, index) => {
    totalGlobal += g.total;
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${g.clave}</td>
      <td>${g.nombre}</td>
      <td>${g.tipo}</td>
      <td>${g.unidad}</td>
      <td>$${g.costo.toFixed(2)}</td>
      <td>${g.cantidad}</td>
      <td>$${g.total.toFixed(2)}</td>
      <td><button onclick="eliminarGasto(${index})">❌</button></td>
    `;
    tablaGastos.appendChild(fila);
  });

  totalGastos.textContent = `Total en desplazamiento/producción: $${totalGlobal.toFixed(2)}`;
}

function eliminarGasto(index) {
  gastos.splice(index, 1);
  renderizarTablaGastos();
}

function limpiarInputsGasto() {
  document.getElementById("gasto-nombre").value = "";
  document.getElementById("gasto-tipo").value = "Desplazamiento";
  document.getElementById("gasto-unidad").value = "";
  document.getElementById("gasto-costo").value = "";
  document.getElementById("gasto-cantidad").value = "";
}

function actualizarClaveGasto() {
  const clavePreview = `DP${String(contadorClaveGasto).padStart(5, "0")}`;
  document.getElementById("clave-gasto-generada").textContent = clavePreview;
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarClaveGenerada();     // materiales
  actualizarClaveObra();         // mano de obra
  actualizarClaveGasto();        // gastos
});


const btnGuardar = document.getElementById("guardar-negocio");
const btnCargar = document.getElementById("cargar-negocio");
const selectorNegocio = document.getElementById("negocio");

btnGuardar.addEventListener("click", () => {
  const negocioKey = selectorNegocio.value;
  if (!negocioKey) return alert("Selecciona un negocio válido");

  const datos = {
    materiales,
    obras,
    gastos,
    ventas,
    claves: {
      contadorClaveMaterial,
      contadorClaveObra,
      contadorClaveGasto,
      contadorClaveVenta
    }
  };

  localStorage.setItem(`flexbiz-${negocioKey}`, JSON.stringify(datos));
  alert(`Negocio "${negocioKey}" guardado ✅`);
});

btnCargar.addEventListener("click", () => {
  const negocioKey = selectorNegocio.value;
  if (!negocioKey) return alert("Selecciona un negocio válido");

  const datos = localStorage.getItem(`flexbiz-${negocioKey}`);
  if (!datos) return alert("No se encontraron datos para ese negocio");

  const parsed = JSON.parse(datos);

  materiales = parsed.materiales || [];
  obras = parsed.obras || [];
  gastos = parsed.gastos || [];
  ventas = parsed.ventas || [];

  // Restaurar contadores
  contadorClaveMaterial = parsed.claves.contadorClaveMaterial || 1;
  contadorClaveObra = parsed.claves.contadorClaveObra || 1;
  contadorClaveGasto = parsed.claves.contadorClaveGasto || 1;
  contadorClaveVenta = parsed.claves.contadorClaveVenta || 1;

  // Actualizar tablas y claves
  renderizarTabla();
  renderizarTablaObra();
  renderizarTablaGastos();
  renderizarVentas();
  actualizarClaveGenerada();
  actualizarClaveObra();
  actualizarClaveGasto();
  actualizarClaveVenta();

  alert(`Negocio "${negocioKey}" cargado ✅`);
});

Object.keys(localStorage).filter(k => k.startsWith("flexbiz-"))



function actualizarResumen() {
  const totalMat = materiales.reduce((acc, m) => acc + m.total, 0);
  const totalObra = obras.reduce((acc, o) => acc + o.total, 0);
  const totalGasto = gastos.reduce((acc, g) => acc + g.total, 0);

  const inversionTotal = totalMat + totalObra + totalGasto;

  const ingreso = ventas.reduce((acc, v) => acc + v.total, 0);
  if (isNaN(ingreso)) return alert("Ingresa un valor numérico válido.");

  const ingresoNeto = ingreso - inversionTotal;
  const margen = ingreso > 0 ? (ingresoNeto / ingreso) * 100 : 0;

  // Mostrar resultados
  document.getElementById("res-mat").textContent = `$${totalMat.toFixed(2)}`;
  document.getElementById("res-obra").textContent = `$${totalObra.toFixed(2)}`;
  document.getElementById("res-gasto").textContent = `$${totalGasto.toFixed(2)}`;
  document.getElementById("res-inversion").textContent = `$${inversionTotal.toFixed(2)}`;
  document.getElementById("res-bruto").textContent = `$${ingreso.toFixed(2)}`;
  document.getElementById("res-neto").textContent = `$${ingresoNeto.toFixed(2)}`;
  document.getElementById("res-margen").textContent = `${margen.toFixed(2)}%`;
  document.getElementById("res-balance").textContent = `$${(ingresoNeto).toFixed(2)}`;
}

const btnAgregarVenta = document.getElementById("agregar-venta");
const tablaVentas = document.getElementById("tabla-ventas");
const totalVentas = document.getElementById("total-ventas");

btnAgregarVenta.addEventListener("click", () => {
  const nombre = document.getElementById("venta-nombre").value.trim();
  const cantidad = parseFloat(document.getElementById("venta-cantidad").value);
  const precio = parseFloat(document.getElementById("venta-precio").value);
  const metodo = document.getElementById("venta-metodo").value;

  if (nombre && !isNaN(cantidad) && !isNaN(precio)) {
    const clave = `VT${String(contadorClaveVenta).padStart(5, "0")}`;
    contadorClaveVenta++;

    const total = cantidad * precio;
    ventas.push({ clave, nombre, cantidad, precio, metodo, total });
    renderizarVentas();
    limpiarInputsVenta();
    actualizarClaveVenta();
  }
});

function renderizarVentas() {
  tablaVentas.innerHTML = "";
  let totalBruto = 0;

  ventas.forEach((v, index) => {
    totalBruto += v.total;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${v.clave}</td>
      <td>${v.nombre}</td>
      <td>${v.cantidad}</td>
      <td>$${v.precio.toFixed(2)}</td>
      <td>$${v.total.toFixed(2)}</td>
      <td>${v.metodo}</td>
      <td><button onclick="eliminarVenta(${index})">❌</button></td>
    `;
    tablaVentas.appendChild(fila);
  });

  totalVentas.textContent = `Ingreso Bruto Total: $${totalBruto.toFixed(2)}`;
}

function eliminarVenta(index) {
  ventas.splice(index, 1);
  renderizarVentas();
}

function limpiarInputsVenta() {
  document.getElementById("venta-nombre").value = "";
  document.getElementById("venta-cantidad").value = "";
  document.getElementById("venta-precio").value = "";
  document.getElementById("venta-metodo").value = "Efectivo";
}

function actualizarClaveVenta() {
  const clavePreview = `VT${String(contadorClaveVenta).padStart(5, "0")}`;
  document.getElementById("clave-venta-generada").textContent = clavePreview;
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarClaveGenerada();     // materiales
  actualizarClaveObra();         // mano de obra
  actualizarClaveGasto();        // desplazamiento/producción
  actualizarClaveVenta();        // ventas
});
