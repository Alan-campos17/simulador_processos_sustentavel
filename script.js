document.getElementById('simulation-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const energia = parseFloat(document.getElementById('energia').value);
  const agua = parseFloat(document.getElementById('agua').value);
  const residuos = parseFloat(document.getElementById('residuos').value);

  let impacto = (energia * 0.5) + (agua * 0.2) + (residuos * 1.0);
  let nivel;

  if (impacto < 100) {
    nivel = "Baixo";
  } else if (impacto < 300) {
    nivel = "Médio";
  } else {
    nivel = "Alto";
  }

  document.getElementById('output').innerHTML = `
    <p><strong>Impacto total:</strong> ${impacto.toFixed(2)} unidades</p>
    <p><strong>Nível de impacto ambiental:</strong> ${nivel}</p>
  `;
});
