document.addEventListener('DOMContentLoaded', () => {
  const usuario = localStorage.getItem('usuarioCadastro');
  if (!usuario) {
    // Redireciona para cadastro se não estiver cadastrado
    window.location.href = 'cadastro.html';
  }
});
function carregarTemplateLeiteria() {
  document.getElementById('energia').value = 850;
  document.getElementById('agua').value = 2200;
  document.getElementById('residuos').value = 480;
  document.getElementById('gastos').value = 3200;
  document.getElementById('carbono').value = 620;

  document.getElementById('intensidade-extracao').value = 6;
  document.getElementById('intensidade-producao').value = 7;
  document.getElementById('energia-renovavel').value = 30;
  document.getElementById('nivel-otimizacao').value = 5;
  document.getElementById('distancia').value = 80;
  document.getElementById('durabilidade').value = 5;
  document.getElementById('taxa-reciclagem').value = 60;

  document.getElementById('deslocamento-carro').value = 20;
  document.getElementById('deslocamento-bus').value = 10;
  document.getElementById('consumo-gas').value = 5;

  alert('Template de Leiteria carregado com sucesso!');
}
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

  // Calcular emissão de carbono no estilo Eco-Genius
  const emissaoCarbono = (
    extracao * 25 +
    producao * 20 +
    (100 - renovavel) * 2 +
    (10 - otimizacao) * 12 +
    distancia * 0.06 +
    (50 - durabilidade) * 1.5 +
    (100 - reciclavel) * 1
  ).toFixed(2);

  document.getElementById('emissao-total').textContent = emissaoCarbono + ' kg CO₂';

  const classificacao = document.getElementById('classificacao-carbono');
  if (emissaoCarbono <= 300) {
    classificacao.textContent = '🟢 Eco-friendly';
    classificacao.style.color = 'green';
  } else if (emissaoCarbono <= 600) {
    classificacao.textContent = '🟡 Moderado';
    classificacao.style.color = 'orange';
  } else {
    classificacao.textContent = '🔴 Alto Impacto';
    classificacao.style.color = 'red';
  }

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
  document.getElementById('etapa-extracao').textContent = extracao;
  document.getElementById('etapa-fabricacao').textContent = renovavel;
  document.getElementById('etapa-distribuicao').textContent = distancia;
  document.getElementById('etapa-utilizacao').textContent = durabilidade;
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

function calcularCarbono() {
  const tipo = document.getElementById('tipo-metrica').value;
  const valor = parseFloat(document.getElementById('valor-carbono').value);
  const resultadoDiv = document.getElementById('resultado-carbono');

  if (!tipo || isNaN(valor) || valor <= 0) {
    resultadoDiv.textContent = "Por favor, selecione a métrica e informe um valor válido.";
    resultadoDiv.style.color = "red";
    return;
  }

  let emissao = 0;

  // Fatores médios de emissão (kg CO₂ por unidade)
  switch (tipo) {
    case 'energia':
      emissao = valor * 0.084; // kWh
      break;
    case 'carro':
      emissao = valor * 0.192; // km
      break;
    case 'onibus':
      emissao = valor * 0.105; // km
      break;
    case 'gas':
      emissao = valor * 2.2; // kg ou m³
      break;
    default:
      emissao = 0;
  }

  emissao = emissao.toFixed(2);

  resultadoDiv.textContent = `Sua pegada estimada é de ${emissao} kg de CO₂`;
  resultadoDiv.style.color = "#2e7d32";
}

function selecionarTipo(tipo) {
  const select = document.getElementById('tipo-metrica');
  select.value = tipo;
  atualizarPlaceholder();
}

function atualizarPlaceholder() {
  const tipo = document.getElementById('tipo-metrica').value;
  const input = document.getElementById('valor-carbono');

  switch (tipo) {
    case 'energia':
      input.placeholder = "Digite o consumo em kWh";
      break;
    case 'carro':
      input.placeholder = "Digite a distância em km";
      break;
    case 'onibus':
      input.placeholder = "Digite a distância em km";
      break;
    case 'gas':
      input.placeholder = "Digite o volume em m³";
      break;
    default:
      input.placeholder = "Digite o valor";
  }
}






