// --- LÓGICA DE LA CALCULADORA FÍSICA ---
let operando1 = "";
let operando2 = "";
let operacionActual = "";
let resultadoMostrado = false;

function actualizarPantalla(valor, esError = false) {
    let cajaRes = document.getElementById('resultado');
    cajaRes.className = esError ? "lcd-principal error-text" : "lcd-principal";
    cajaRes.innerHTML = valor === "" ? "0" : valor;
}

function agregarNumero(num) {
    if (resultadoMostrado) limpiarTodo(); // Reinicia si se empieza a escribir tras un resultado

    if (operacionActual === "") {
        operando1 += num;
        actualizarPantalla(operando1);
    } else {
        operando2 += num;
        actualizarPantalla(operando2);
    }
}

function agregarOperador(op) {
    if (operando1 === "") return;
    operacionActual = op;
    let simbolo = op === 'sumar' ? '+' : op === 'restar' ? '-' : op === 'multiplicar' ? '×' : '÷';
    document.getElementById('historial').innerText = operando1 + " " + simbolo;
    actualizarPantalla("0");
    resultadoMostrado = false;
}

function limpiarTodo() {
    operando1 = "";
    operando2 = "";
    operacionActual = "";
    resultadoMostrado = false;
    document.getElementById('historial').innerText = "";
    actualizarPantalla("0");
}

function borrarUltimo() {
    if (operacionActual === "") {
        operando1 = operando1.slice(0, -1);
        actualizarPantalla(operando1);
    } else {
        operando2 = operando2.slice(0, -1);
        actualizarPantalla(operando2);
    }
}

function porcentaje() {
    if (operacionActual === "" && operando1 !== "") {
        operando1 = (parseFloat(operando1) / 100).toString();
        actualizarPantalla(operando1);
    }
}

// Función principal que conserva las validaciones de la Semana 7
function calcular() {
    let cajaHistorial = document.getElementById('historial');

    // Validación 1: Campos vacíos
    if (operando1 === "" || operando2 === "" || operacionActual === "") {
        actualizarPantalla("Error: Faltan datos", true);
        return; 
    }

    let num1 = parseFloat(operando1);
    let num2 = parseFloat(operando2);

    // Validación 2: Texto no numérico
    if (isNaN(num1) || isNaN(num2)) {
        actualizarPantalla("Error: Solo números", true);
        return;
    }

    let resultado = 0;
    let simbolo = "";

    if (operacionActual === "sumar") {
        resultado = num1 + num2;
        simbolo = "+";
    } else if (operacionActual === "restar") {
        resultado = num1 - num2;
        simbolo = "-";
    } else if (operacionActual === "multiplicar") {
        resultado = num1 * num2;
        simbolo = "×";
    } else if (operacionActual === "dividir") {
        // Validación 3: División por cero
        if (num2 === 0) {
            actualizarPantalla("Error: Div por 0", true);
            return;
        }
        resultado = num1 / num2;
        simbolo = "÷";
    }

    // Mostrar resultados
    cajaHistorial.innerText = `${num1} ${simbolo} ${num2} =`;
    
    // Redondear decimales largos para que quepan en pantalla
    let resultadoFinal = parseFloat(resultado.toFixed(6)).toString();
    actualizarPantalla(resultadoFinal);
    
    // Preparar para encadenar operaciones
    operando1 = resultadoFinal;
    operando2 = "";
    operacionActual = "";
    resultadoMostrado = true;
}


// --- LÓGICA DEL CONVERSOR (Se mantiene intacta) ---
const conversiones = {
    'm-cm': (val) => val * 100,
    'cm-m': (val) => val / 100,
    'kg-g': (val) => val * 1000,
    'g-kg': (val) => val / 1000
};

function calcularConversion() {
    const valorTexto = document.getElementById('valorInput').value.trim();
    const tipo = document.getElementById('tipoConversion').value;
    const resultadoDiv = document.getElementById('resultadoConversion');
    
    resultadoDiv.className = "pantalla-resultados";

    if (valorTexto === '') {
        resultadoDiv.classList.add("error");
        resultadoDiv.textContent = "Error: El campo no puede estar vacío.";
        return;
    }

    const valorNumero = Number(valorTexto);

    if (!Number.isFinite(valorNumero)) {
        resultadoDiv.classList.add("error");
        resultadoDiv.textContent = "Error: Ingrese un número válido.";
        return;
    }

    if (valorNumero < 0) {
        resultadoDiv.classList.add("error");
        resultadoDiv.textContent = "Error: No se permiten valores negativos.";
        return;
    }

    const resultado = conversiones[tipo](valorNumero);
    resultadoDiv.classList.add("exito");
    resultadoDiv.textContent = `Resultado: ${resultado}`;
}