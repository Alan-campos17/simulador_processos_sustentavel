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
  recursosLista.innerHTML = '';

  const recursos = [
    {
      nome: 'Água',
      total: agua,
      reciclado: Math.round(agua * 0.89),
      percentual: '89%',
      utilizacao: '14%'
    },
    {
      nome: 'Energia',
      total: energia,
      reciclado: Math.round(energia * 0.53),
      percentual: '53%',
      utilizacao: '17%'
    },
    {
      nome: 'Materiais',
      total: residuos,
      reciclado: Math.round(residuos * 0.74),
      percentual: '74%',
      utilizacao: '11%'
    }
  ];

  recursos.forEach(recurso => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${recurso.nome}</strong>: ${recurso.total} / 1000 unidades<br>
      Reciclado: ${recurso.reciclado} unidades (${recurso.percentual})<br>
      Utilização: ${recurso.utilizacao}
    `;
    recursosLista.appendChild(li);
  });

  // Preencher fluxo do processo
  document.getElementById('etapa-extracao').textContent = extracao;
  document.getElementById('etapa-fabricacao').textContent = fabricacao;
  document.getElementById('etapa-distribuicao').textContent = distribuicao;
  document.getElementById('etapa-utilizacao').textContent = utilizacao;
  document.getElementById('etapa-reciclagem').textContent = reciclavel;

  // Animações
  const fluxoItems = document.querySelectorAll('.fluxo div');
  fluxoItems.forEach((div, index) => {
    div.style.opacity = '0';
    div.style.transform = 'translateY(20px)';
  });

  fluxoItems.forEach((div, index) => {
    setTimeout(() => {
      div.style.transition = 'all 0.6s ease';
      div.style.opacity = '1';
      div.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});
