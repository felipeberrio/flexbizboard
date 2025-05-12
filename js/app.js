console.log("FlexBizBoard cargado correctamente ✅");

// DOM Elements
const btnAgregarMaterial = document.getElementById("agregar-material");
const tabla = document.getElementById("tabla-materiales");
const totalDiv = document.getElementById("total-materiales");
const btnAgregarObra = document.getElementById("agregar-obra");
const tablaObra = document.getElementById("tabla-obra");
const totalObra = document.getElementById("total-obra");
const btnAgregarGasto = document.getElementById("agregar-gasto");
const tablaGastos = document.getElementById("tabla-gastos");
const totalGastos = document.getElementById("total-gastos");
const btnAgregarVenta = document.getElementById("agregar-venta");
const tablaVentas = document.getElementById("tabla-ventas");
const totalVentas = document.getElementById("total-ventas");
const btnGuardar = document.getElementById("guardar-negocio");
const btnCargar = document.getElementById("cargar-negocio");
const selectorNegocio = document.getElementById("negocio");

// Arrays and Counters

let materiales = [], contadorClaveMaterial = 1;
let obras = [], contadorClaveObra = 1;
let gastos = [], contadorClaveGasto = 1;
let ventas = [], contadorClaveVenta = 1;
let negocios = [];

let charts = {};


// Event Listeners
btnAgregarMaterial.addEventListener("click", agregarMaterial);
btnAgregarObra.addEventListener("click", agregarObra);
btnAgregarGasto.addEventListener("click", agregarGasto);
btnAgregarVenta.addEventListener("click", agregarVenta);
btnGuardar.addEventListener("click", guardarNegocio);
btnCargar.addEventListener("click", cargarNegocio);

// Functions
function agregarMaterial() {
    const nombre = document.getElementById("material-nombre").value.trim();
    const unidad = document.getElementById("material-unidad").value.trim();
    const costo = parseFloat(document.getElementById("material-costo").value);
    const cantidad = parseFloat(document.getElementById("material-cantidad").value);

    if (nombre && unidad && !isNaN(costo) && !isNaN(cantidad)) {
        const clave = `MT${String(contadorClaveMaterial).padStart(5, "0")}`;
        contadorClaveMaterial++;

        const total = costo * cantidad;
        materiales.push({ clave, nombre, unidad, costo, cantidad, total });
        renderizarTabla();
        limpiarInputs();
        actualizarClaveGenerada();
    }
}

function agregarObra() {
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
}

function agregarGasto() {
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
}

function agregarVenta() {
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
}

function guardarNegocio() {
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
}

function cargarNegocio() {
    const negocioKey = selectorNegocio.value;
    if (!negocioKey) return alert("Selecciona un negocio válido");

    const datos = localStorage.getItem(`flexbiz-${negocioKey}`);
    if (!datos) return alert("No se encontraron datos para ese negocio");

    const parsed = JSON.parse(datos);

    materiales = parsed.materiales || [];
    obras = parsed.obras || [];
    gastos = parsed.gastos || [];
    ventas = parsed.ventas || [];

    contadorClaveMaterial = parsed.claves.contadorClaveMaterial || 1;
    contadorClaveObra = parsed.claves.contadorClaveObra || 1;
    contadorClaveGasto = parsed.claves.contadorClaveGasto || 1;
    contadorClaveVenta = parsed.claves.contadorClaveVenta || 1;

    renderizarTabla();
    renderizarTablaObra();
    renderizarTablaGastos();
    renderizarVentas();
    actualizarClaveGenerada();
    actualizarClaveObra();
    actualizarClaveGasto();
    actualizarClaveVenta();

    alert(`Negocio "${negocioKey}" cargado ✅`);
}

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
    document.getElementById("material-nombre").value = "";
    document.getElementById("material-unidad").value = "";
    document.getElementById("material-costo").value = "";
    document.getElementById("material-cantidad").value = "";
}

function actualizarClaveObra() {
    const clavePreview = `MO${String(contadorClaveObra).padStart(5, "0")}`;
    document.getElementById("clave-obra-generada").textContent = clavePreview;
}

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

function actualizarClaveGasto() {
    const clavePreview = `DP${String(contadorClaveGasto).padStart(5, "0")}`;
    document.getElementById("clave-gasto-generada").textContent = clavePreview;
}

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

function actualizarClaveVenta() {
    const clavePreview = `VT${String(contadorClaveVenta).padStart(5, "0")}`;
    document.getElementById("clave-venta-generada").textContent = clavePreview;
}

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

function actualizarResumen() {
    const totalMat = materiales.reduce((acc, m) => acc + m.total, 0);
    const totalObra = obras.reduce((acc, o) => acc + o.total, 0);
    const totalGasto = gastos.reduce((acc, g) => acc + g.total, 0);

    const inversionTotal = totalMat + totalObra + totalGasto;

    const ingreso = ventas.reduce((acc, v) => acc + v.total, 0);
    if (isNaN(ingreso)) return alert("Ingresa un valor numérico válido.");

    const ingresoNeto = ingreso - inversionTotal;
    const margen = ingreso > 0 ? (ingresoNeto / ingreso) * 100 : 0;

    document.getElementById("res-mat").textContent = `$${totalMat.toFixed(2)}`;
    document.getElementById("res-obra").textContent = `$${totalObra.toFixed(2)}`;
    document.getElementById("res-gasto").textContent = `$${totalGasto.toFixed(2)}`;
    document.getElementById("res-inversion").textContent = `$${inversionTotal.toFixed(2)}`;
    document.getElementById("res-bruto").textContent = `$${ingreso.toFixed(2)}`;
    document.getElementById("res-neto").textContent = `$${ingresoNeto.toFixed(2)}`;
    document.getElementById("res-margen").textContent = `${margen.toFixed(2)}%`;
    document.getElementById("res-balance").textContent = `$${(ingresoNeto).toFixed(2)}`;
}

// =====================
// FUNCIONES GRÁFICAS
// =====================
function renderizarGraficas() {
  const totalMat = materiales.reduce((acc, m) => acc + m.total, 0);
  const totalObra = obras.reduce((acc, o) => acc + o.total, 0);
  const totalGasto = gastos.reduce((acc, g) => acc + g.total, 0);
  const ingreso = ventas.reduce((acc, v) => acc + v.total, 0);
  const neto = ingreso - (totalMat + totalObra + totalGasto);

 const hayDatos = totalMat > 0 || totalObra > 0 || totalGasto > 0 || ingreso > 0;

  // Mostrar solo si hay datos
  if (!hayDatos) {
    alert("No hay datos suficientes para generar gráficas.");
    return;
  }

  // Mostrar canvas
  document.getElementById("grafica-costos").style.display = "block";
  document.getElementById("grafica-balance").style.display = "block";
  document.getElementById("grafica-ventas").style.display = "block";


  // Destruir gráficas anteriores si existen
  if (charts.costos) charts.costos.destroy();
  if (charts.balance) charts.balance.destroy();
  if (charts.ventas) charts.ventas.destroy();

  charts.costos = new Chart(document.getElementById("grafica-costos"), {
    type: "doughnut",
    data: {
      labels: ["Materiales", "Mano de Obra", "Producción/Desplazamiento"],
      datasets: [{
        data: [totalMat, totalObra, totalGasto],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"]
      }]
    },
    options: { responsive: true }
  });

  charts.balance = new Chart(document.getElementById("grafica-balance"), {
    type: "bar",
    data: {
      labels: ["Inversión", "Ingreso Neto"],
      datasets: [{
        label: "USD",
        data: [totalMat + totalObra + totalGasto, neto],
        backgroundColor: ["#ef4444", "#22c55e"]
      }]
    },
    options: { responsive: true }
  });

  const pagos = {};
  ventas.forEach(v => {
    pagos[v.metodo] = (pagos[v.metodo] || 0) + v.total;
  });

  charts.ventas = new Chart(document.getElementById("grafica-ventas"), {
    type: "pie",
    data: {
      labels: Object.keys(pagos),
      datasets: [{
        data: Object.values(pagos),
        backgroundColor: ["#4f46e5", "#f97316", "#ec4899", "#14b8a6"]
      }]
    },
    options: { responsive: true }
  });
}

// =====================
// CARGA INICIAL
// =====================
document.addEventListener("DOMContentLoaded", () => {
  actualizarClaveGenerada();
  actualizarClaveObra();
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    actualizarClaveGenerada();
    actualizarClaveObra();
    actualizarClaveGasto();
    actualizarClaveVenta();
    renderizarGraficas();

    const selector = document.getElementById("negocio");
    const titulo = document.getElementById("negocio-actual");
    const inputNuevo = document.getElementById("nuevoNegocio");
    const btnAgregar = document.getElementById("agregarNegocio");
    const btnBorrar = document.getElementById("borrarNegocio");

    let negocios = [];

    selector.addEventListener("change", () => {
        const nombre = selector.options[selector.selectedIndex].text;
        titulo.textContent = `Negocio activo: ${nombre}`;
    });

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

Object.keys(localStorage).filter(k => k.startsWith("flexbiz-"));
