let historico = null;
let periodo = null;

const left = () => {
  periodo = periodo > 0 ? --periodo : periodo;
  fill_historico(periodo);
}

const right = () => {
  periodo = periodo < (historico.length - 1) ? ++periodo : periodo;
  fill_historico(periodo);
}

const container = jogo => {
  let col = document.createElement('div');
  col.className = 'col-md-6';

  let p = document.createElement('p');
  p.innerHTML = jogo.titulo;

  let spanSubtitulo = document.createElement('span');
  spanSubtitulo.innerHTML = jogo.subtitulo;
  spanSubtitulo.className = 'nutror-span-subtitulo';
  let spanResultado = document.createElement('span');
  spanResultado.innerHTML = `${jogo.resultado}<br>Odd ${jogo.odd}`;
  spanResultado.className = 'nutror-span-resultado';

  col.append(p);
  col.append(spanSubtitulo);
  col.append(spanResultado);

  return col;
}

const fill_nuttr = ({ data, jogos }) => {
  document.getElementById('nutror_data').innerHTML = data;
  document.getElementById('nutror_bilhete_especial_data').innerHTML = data;

  jogos.forEach(jogo => {
    const col = container(jogo);
    document.getElementById('nutror_jogos').appendChild(col);
  });
}

const fill_historico = (periodo) => {
  const item = historico[periodo];

  document.getElementById("periodo_atual").innerHTML = item.periodo;
  document.getElementById("analise_taxa_acerto").innerHTML = item.analise.taxa_acerto;
  document.getElementById("analise_analises").innerHTML = item.analise.analises;
  document.getElementById("analise_greens").innerHTML = item.analise.greens;
  document.getElementById("analise_reds").innerHTML = item.analise.reds;
  document.getElementById("cupons_lucro").innerHTML = item.cupons.lucro;
  document.getElementById("cupons_cupons").innerHTML = item.cupons.cupons;
  document.getElementById("cupons_greens").innerHTML = item.cupons.greens;
  document.getElementById("cupons_reds").innerHTML = item.cupons.reds;
}

try {
  fetch("data.json")
    .then(res => {
      if (!res.ok) {
        throw new Error("HTTP error " + res.status);
      }
      return res.json();
    })
    .then(json => {
      fill_nuttr(json);

      //
      // Histórico
      //
      historico = json.historico;
      periodo = historico.length - 1;
      fill_historico(periodo);
    });
} catch (erro) {
  console.error(err);
}
