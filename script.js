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

document.getElementById('simulation-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const energia = +document.getElementById('energia').value;
  const agua = +document.getElementById('agua').value;
  const residuos = +document.getElementById('residuos').value;
  const gastos = +document.getElementById('gastos').value;
  const carbono = +document.getElementById('carbono').value;

  const extracao = +document.getElementById('intensidade-extracao').value * 10;
  const fabricacao = +document.getElementById('energia-renovavel').value;
  const distribuicao = +document.getElementById('distancia').value;
  const utilizacao = +document.getElementById('durabilidade').value;
  const reciclavel = +document.getElementById('taxa-reciclagem').value;

  // Preencher resultado de uso de recursos
  const recursosLista = document.getElementById('recursos-lista');
  recursosLista.innerHTML = `
    <li>Água: ${agua} / 1000 unidades<br>Reciclado: ${Math.round(agua * 0.89)} unidades (89%)<br>Utilização: 14%</li>
    <li>Energia: ${energia} / 1000 unidades<br>Renovável: ${Math.round(energia * 0.53)} unidades (53%)<br>Utilização: 17%</li>
    <li>Materiais: ${residuos} / 1000 unidades<br>Reciclado: ${Math.round(residuos * 0.74)} unidades (74%)<br>Utilização: 11%</li>
  `;

  // Preencher fluxo do processo
  document.getElementById('etapa-extracao').textContent = extracao;
  document.getElementById('etapa-fabricacao').textContent = fabricacao;
  document.getElementById('etapa-distribuicao').textContent = distribuicao;
  document.getElementById('etapa-utilizacao').textContent = utilizacao;
  document.getElementById('etapa-reciclagem').textContent = reciclavel;

  // Animações
  document.querySelectorAll('.fluxo div').forEach((div, index) => {
    div.style.opacity = 0;
    div.style.transform = 'translateY(20px)';
    setTimeout(() => {
      div.style.transition = 'all 0.6s ease';
      div.style.opacity = 1;
      div.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});
