const fs = require("fs");

fs.readFile("dados.json", "utf8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err);
    return;
  }

  const faturamento = JSON.parse(data);

  let menorValor = Number.MAX_SAFE_INTEGER;
  let maiorValor = Number.MIN_SAFE_INTEGER;
  let somaValores = 0;
  let numDiasAcimaMedia = 0;
  let diasComFaturamento = 0;

  faturamento.forEach((dia) => {
    if (dia.valor > maiorValor) {
      maiorValor = dia.valor;
    }
    if (dia.valor < menorValor) {
      menorValor = dia.valor;
    }
    somaValores += dia.valor;
  });

  for (let i = 0; i < faturamento.length; i++) {
    const valorDiario = faturamento[i].valor;

    if (valorDiario !== 0) {
      diasComFaturamento++;
    }
  }

  const mediaMensal = somaValores / diasComFaturamento;

  faturamento.forEach((dia) => {
    if (dia.valor > mediaMensal) {
      numDiasAcimaMedia++;
    }
  });

  console.log("Número de dias:", faturamento.length);
  console.log("Número de dias com faturamento:", diasComFaturamento);
  console.log("Número de dias com faturamento acima da média:", numDiasAcimaMedia);
  console.log("Menor valor de faturamento:", menorValor);
  console.log("Maior valor de faturamento:", maiorValor);
  console.log("Média mensal:", mediaMensal);
});
