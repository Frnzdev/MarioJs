// criando players
const player1 = {
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
};

const player2 = {
  nome: "Luigi",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  pontos: 0,
};

async function rollDice() {
  // Rolar Dado de 1 a 6
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
      break;
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 Rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada: ${round}`);

    let block = await getRandomBlock();
    console.log(`🏁 Bloco: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let testSkill1 = 0;
    let testSkill2 = 0;

    if (block === "RETA") {
      testSkill1 = diceResult1 + character1.velocidade;
      testSkill2 = diceResult2 + character2.velocidade;

      await logRollResult(
        character1.nome,
        "velocidade",
        diceResult1,
        character1.velocidade
      );

      await logRollResult(
        character2.nome,
        "velocidade",
        diceResult2,
        character2.velocidade
      );
    }

    if (block === "CURVA") {
      testSkill1 = diceResult1 + character1.manobrabilidade;
      testSkill2 = diceResult2 + character2.manobrabilidade;

      await logRollResult(
        character1.nome,
        "manobrabilidade",
        diceResult1,
        character1.manobrabilidade
      );

      await logRollResult(
        character2.nome,
        "manobrabilidade",
        diceResult2,
        character2.manobrabilidade
      );
    }

    if (block === "CONFRONTO") {
      testSkill1 = diceResult1 + character1.poder;
      testSkill2 = diceResult2 + character2.poder;

      console.log(`${character1.nome} confrontou com ${character2.nome} 🥊`);

      await logRollResult(
        character1.nome,
        "poder",
        diceResult1,
        character1.poder
      );

      await logRollResult(
        character2.nome,
        "poder",
        diceResult2,
        character2.poder
      );
      if (testSkill1 > testSkill2 && character2.pontos > 0) {
        console.log(
          `${character1.nome} Venceu o confronto! ${character2.nome} perdeu um ponto`
        );
        character2.pontos--;
      }

      if (testSkill2 > testSkill1 && character1.pontos > 0) {
        console.log(
          `${character2.nome} Venceu o confronto! ${character1.nome} perdeu um ponto`
        );
        character1.pontos--;
      }

      console.log(
        testSkill1 === testSkill2
          ? "Confronto empatado, nenhum ponto foi retirado ou adicionado"
          : ""
      );
    }

    if (testSkill1 > testSkill2) {
      console.log(`${character1.nome} venceu a rodada +1 ponto`);
      character1.pontos++;
    } else if (testSkill1 < testSkill2) {
      console.log(`${character2.nome} venceu a rodada +1 ponto`);
      character2.pontos++;
    }
    console.log(
      "__________________________________________________________________"
    );
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.nome}: ${character1.pontos} ponto(s)`);
  console.log(`${character2.nome}: ${character2.pontos} ponto(s)`);

  if (character1.pontos > character2.pontos) {
    console.log(`${character1.nome} Ganhou a corrida!`);
  } else if (character2.pontos > character1.pontos) {
    console.log(`${character2.nome} Ganhou a corrida!`);
  } else {
    console.log("A corrida terminou empatada!");
  }
}

(async function main() {
  console.log(`🏁🚨Corrinda entre ${player1.nome} e ${player2.nome} \n`);
  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
