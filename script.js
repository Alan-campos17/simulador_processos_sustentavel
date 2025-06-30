document.getElementById('simulation-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const energia = +document.getElementById('energia').value;
  const agua = +document.getElementById('agua').value;
  const residuos = +document.getElementById('residuos').value;
  const gastos = +document.getElementById('gastos').value;
  const carbono = +document.getElementById('carbono').value;

  const extracao = +document.getElementById('intensidade-extracao').value;
  const producao = +document.getElementById('intensidade-producao').value;
  const renovavel = +document.getElementById('energia-renovavel').value;
  const otimizacao = +document.getElementById('nivel-otimizacao').value;
  const distancia = +document.getElementById('distancia').value;
  const durabilidade = +document.getElementById('durabilidade').value;
  const reciclavel = +document.getElementById('taxa-reciclagem').value;

  // Preencher resultado de uso de recursos
  const recursosLista = document.getElementById('recursos-lista');
  recursosLista.innerHTML = '';

  const recursos = [
  {
    nome: 'Água',
    total: agua,
    reciclado: Math.round(agua * 0.89),
    percentual: Math.round((agua * 0.89 / agua) * 100) + '%',
    utilizacao: Math.round((agua / 1000) * 100) + '%'
  },
  {
    nome: 'Energia',
    total: energia,
    reciclado: Math.round(energia * 0.53),
    percentual: Math.round((energia * 0.53 / energia) * 100) + '%',
    utilizacao: Math.round((energia / 1000) * 100) + '%'
  },
  {
    nome: 'Materiais',
    total: residuos,
    reciclado: Math.round(residuos * 0.74),
    percentual: Math.round((residuos * 0.74 / residuos) * 100) + '%',
    utilizacao: Math.round((residuos / 1000) * 100) + '%'
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
  document.getElementById('etapa-extracao').textContent = extracao * 10;
  document.getElementById('etapa-fabricacao').textContent = renovavel;
  document.getElementById('etapa-distribuicao').textContent = distancia;
  document.getElementById('etapa-utilizacao').textContent = durabilidade;
  document.getElementById('etapa-reciclagem').textContent = reciclavel;

  // Calcular emissões de carbono
  const emissoesCarbono = 
    (extracao * 20) +
    (producao * 15) +
    ((100 - renovavel) * 1.5) +
    ((10 - otimizacao) * 10) +
    (distancia * 0.05) +
    ((50 - durabilidade) * 1.2) +
    ((100 - reciclavel) * 0.8);

  const emissaoTexto = document.getElementById('resultado-carbono');
  let classificacao = '';
  if (emissoesCarbono <= 300) classificacao = '🟢 Baixa emissão (excelente)';
  else if (emissoesCarbono <= 600) classificacao = '🟡 Média emissão (razoável)';
  else classificacao = '🔴 Alta emissão (crítico)';

  emissaoTexto.innerHTML = `<strong>Emissões de carbono:</strong> ${emissoesCarbono.toFixed(1)} kg CO₂<br>${classificacao}`;

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

function carregarCenario(tipo) {
  const cenarios = {
    serralheria: {
      extracao: 3,
      producao: 2,
      energiaRenovavel: 85,
      otimizacao: 9,
      distancia: 120,
      durabilidade: 12,
      reciclavel: 80,
      agua: 150,
      energia: 140,
      residuos: 100,
      carbono: 60,
      gastos: 9000
    },
    tapecaria: {
      extracao: 10,
      producao: 9,
      energiaRenovavel: 5,
      otimizacao: 2,
      distancia: 800,
      durabilidade: 4,
      reciclavel: 10,
      agua: 800,
      energia: 950,
      residuos: 700,
      carbono: 1200,
      gastos: 12000
    },
    agropecuaria: {
      extracao: 9,
      producao: 8,
      energiaRenovavel: 10,
      otimizacao: 3,
      distancia: 300,
      durabilidade: 5,
      reciclavel: 20,
      agua: 600,
      energia: 700,
      residuos: 450,
      carbono: 850,
      gastos: 11000
    }
  };

  const c = cenarios[tipo];

  document.getElementById('intensidade-extracao').value = c.extracao;
  document.getElementById('intensidade-producao').value = c.producao;
  document.getElementById('energia-renovavel').value = c.energiaRenovavel;
  document.getElementById('nivel-otimizacao').value = c.otimizacao;
  document.getElementById('distancia').value = c.distancia;
  document.getElementById('durabilidade').value = c.durabilidade;
  document.getElementById('taxa-reciclagem').value = c.reciclavel;

  document.getElementById('agua').value = c.agua;
  document.getElementById('energia').value = c.energia;
  document.getElementById('residuos').value = c.residuos;
  document.getElementById('carbono').value = c.carbono;
  document.getElementById('gastos').value = c.gastos;
}

