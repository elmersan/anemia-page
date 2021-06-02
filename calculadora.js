// calculadora

const ANEMIA = {
  descartada: "#890202",
  leve: "#D91414",
  moderada: "#FF3333",
  grave: "#FFA3A3",
};

const MESSAGE = {
  descartada: "Es necesario que inicie / continúe con la SUPLEMENTACIÓN.",
  leve: "Acudir a consulta con el profesional médico.",
  moderada: "Acudir a consulta con el profesional médico.",
  grave:
    "Debe ser referído a un establecimiento de salud de mayor complejidad.",
};

function templateAnemy(hemoglobina, clasificacion) {
  const color = ANEMIA[clasificacion] || "";
  const message = MESSAGE[clasificacion] || "";

  return `
  <div>
    <h5>Hemoglobina Corregida (g/dl):</h5>
    <div class="content-progress">
      <div class="progress" style="background: ${color};"></div>
    </div>
    <p>${hemoglobina}</p>
  </div>
  <div>
    <h5>Diagnóstico</h5>
    <p class="clasificacion"  style="background: ${color};">Anemia ${clasificacion}</p>
    <p>${message}</p>
  </div>
  `;
}

function correctHemoglobina(altitudValue, hemoglobinaValue) {
  if (altitudValue >= 1000 && altitudValue <= 1499)
    return hemoglobinaValue - 0.2;
  else if (altitudValue >= 1500 && altitudValue <= 1999)
    return hemoglobinaValue - 0.5;
  else if (altitudValue >= 2000 && altitudValue <= 2499)
    return hemoglobinaValue - 0.8;
  else if (altitudValue >= 2500 && altitudValue <= 2999)
    return hemoglobinaValue - 1.3;
  else if (altitudValue >= 3000 && altitudValue <= 3499)
    return hemoglobinaValue - 1.9;
  else if (altitudValue >= 3500 && altitudValue <= 3999)
    return hemoglobinaValue - 2.7;
  else if (altitudValue >= 4000 && altitudValue <= 4499)
    return hemoglobinaValue - 3.5;
  else if (altitudValue >= 4500) return hemoglobinaValue - 4.5;
  else return hemoglobinaValue;
}

function correctClasification(valueHemoglobina) {
  if (valueHemoglobina < 7) return "grave";
  else if (valueHemoglobina >= 7 && valueHemoglobina <= 9.9) return "moderada";
  else if (valueHemoglobina >= 10 && valueHemoglobina <= 10.9) return "leve";
  else return "descartada";
}

// Mostrar reultados de la consulta

function validateForm(e) {
  e.preventDefault();

  // trayendo datos del form
  var hemoglobina = document.getElementById("hemoglobina");
  var altitud = document.getElementById("altitud");

  if (hemoglobina.value != "" && altitud.value != "") {
    let error = document.getElementById("error");
    error.style.display = "none";

    // evaluar la hemoglobina
    const valueHemoglobina = correctHemoglobina(
      parseInt(altitud.value),
      parseFloat(hemoglobina.value)
    );

    // clasificacion segun le hemoglobina
    const clasificacion = correctClasification(valueHemoglobina);

    const templateResults = templateAnemy(valueHemoglobina, clasificacion);

    let box = document.getElementById("content-results");
    box.innerHTML = templateResults;
  } else {
    let error = document.getElementById("error");
    error.style.display = "block";
    error.textContent = "Ingrese los campos solicitados";
  }
}
