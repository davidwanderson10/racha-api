const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Round = require('../models/Round');
require('dotenv').config();
const { Op } = require("sequelize");
const { literal } = require('sequelize');



const KEY = process.env.KEY || 10000;

const valid = (userKey) => {
  try {
    userKey ? userKey : '123'
    if (userKey === KEY) {
      return 1
    } else {
      return 0
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ROTAS DE JOGADORES

router.get('/player', async (req, res) => {
  let order = req.headers.order === 'nome' ? [['nome', 'ASC']] : [['pontos', 'DESC'], ['cotas']]
  try {
    
    const players = await Player.findAll({
      attributes: [
        'id',
        'nome',
        [literal('(vitorias * 3) + empates + (primeiro * 10) + (segundo * 6) + (terceiro * 5)'), 'pontos'],
        'cotas',
        'jogos',
        'vitorias',
        'empates',
        'derrotas',
        'gols_pro',
        'gols_contra',
        [literal('gols_pro - gols_contra'), 'saldo'],
        'primeiro',
        'segundo',
        'terceiro',
        'quarto',
        'gols',
        'ass',
        'amarelo',
        'vermelho'
      ],
      where: {
        nome: { [Op.notLike]: '%(G)%' },
      },
        order: order
    });
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/player-az', async (req, res) => {
  let order = [['nome', 'ASC']]
  try {
    const players = await Player.findAll({
      where: {
        nome: { [Op.notLike]: '%(G)%' },
      },
        order: order
    });
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/player-gol', async (req, res) => {
  let order = req.headers.order === 'nome' ? [['nome', 'ASC']] : [['pontos', 'DESC'], ['cotas']]
  try {
    const players = await Player.findAll({
      attributes: [
        'id',
        'nome',
        [literal('(vitorias * 3) + empates + (primeiro * 10) + (segundo * 6) + (terceiro * 5)'), 'pontos'],
        'cotas',
        'jogos',
        'vitorias',
        'empates',
        'derrotas',
        'gols_pro',
        'gols_contra',
        [literal('gols_pro - gols_contra'), 'saldo'],
        'primeiro',
        'segundo',
        'terceiro',
        'quarto',
        'gols',
        'ass',
        'amarelo',
        'vermelho'
      ],
      where: {
        nome: { [Op.like]: '%(G)%' },
      },
        order: order
    });
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/player/:id', async (req, res) => {
    let id = req.params.id
    try {
      const players = await Player.findOne({
        where: { id }
    })
      res.json(players); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.post('/player', async (req, res) => {
  try {
    const validate = valid(req.headers.key)
    if (validate) {
      const playerName = await Player.findOne({
        where: { nome: req.body.nome }
      })

      if (playerName) {
        res.status(401).json({message: `Nome de jogador já existente!`});
      } else {
        const player = await Player.create(req.body);
        res.status(201).json({message: `Jogador criado com sucesso!`});
      }
    }
    else {
      res.status(401).json({message: `Código inválido! Sai fora gambá safado!`});
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/player/:id', async (req, res) => {
  try {
      const validate = valid(req.headers.key)
      if (validate) {
        let id = req.params.id
        const player = await Player.update(req.body, {
            where: { id } 
        });
        res.status(200).json(player);
        }
      else {
        res.status(401).json([]);
      }
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

router.put('/player-all', async (req, res) => {
  try {
    const validate = valid(req.headers.key)
    if (!validate) {
      return res.status(401).json({message: `Código inválido! Sai fora gambá safado!`});
    }

    // Array para armazenar os resultados das atualizações
    const updateResults = [];

    // Processa cada jogador do array recebido
    for (const playerData of req.body) {
      // Encontra o jogador no banco pelo nome
      const player = await Player.findOne({
        where: { nome: playerData.nome }
      });

      if (player) {
        // Atualiza somando os valores existentes
        const updatedData = {
          gols: player.gols + playerData.gols,
          ass: player.ass + playerData.assistencias,
          amarelo: player.amarelo + playerData.amarelos,
          vermelho: player.vermelho + playerData.vermelhos,
          cotas: player.cotas + 1,
          jogos: player.jogos + 4,
          vitorias: player.vitorias + playerData.v,
          empates: player.empates + playerData.e,
          derrotas: player.derrotas + playerData.d,
          gols_pro: player.gols_pro + playerData.gp,
          gols_contra: player.gols_contra + playerData.gc,
          primeiro: player.primeiro + playerData.p,
          segundo: player.segundo + playerData.s,
          terceiro: player.terceiro + playerData.t,
          quarto: player.quarto + playerData.q
        };

        // Realiza a atualização
        await Player.update(updatedData, {
          where: { nome: playerData.nome }
        });

        updateResults.push({
          nome: playerData.nome,
          status: 'updated'
        });
      } else {
        // Se o jogador não existe, registra que não foi encontrado
        updateResults.push({
          nome: playerData.nome,
          status: 'not_found'
        });
      }
    }

    return res.status(200).json({
      message: 'Rodada criada e Jogadores atualizados com sucesso!',
      results: updateResults
    });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});


router.delete('/player/:id', async (req, res) => {
try {
    const validate = valid(req.headers.key)
    if (validate) {
      let id = req.params.id
      const player = await Player.destroy({
          where: { id }
      });
      res.status(200).json(player);
    }
    else {
      res.status(401).json([]);
    }
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// ROTAS DE RODADAS
router.get('/rounds', async (req, res) => {
  try {
    const round = await Round.findAll(
      order: [
                ['numero', 'DESC']                                  
      ]);
    res.json(round); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/rounds-metrics', async (req, res) => {
  try {
    const round = await Round.findAll({
      attributes: ['gols', 'assistencias'],
    });

    let acumulado = round.reduce((acc, curr) => {
      return {
        gols: acc.gols + curr.gols,
        assistencias: acc.assistencias + curr.assistencias
      };
     });

     acumulado["rodadas"] = round.length
     acumulado["jogos"] = round.length * 8


    res.json(acumulado); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/rounds/:id', async (req, res) => {
    let numero = req.params.id
    try {
      const round = await Round.findOne({
        where: { numero }
    })
      res.json(round); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.post('/rounds', async (req, res) => {

  try {
    const validate = valid(req.headers.key || '')
    if (validate) {
      const round = await Round.create(req.body);
      res.status(201).json({message: `Rodada ${req.body.numero} criada com sucesso!`});
    }
    else {
      res.status(401).json({message: `Código inválido! Sai fora gambá safado!`});
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/rounds/:id', async (req, res) => {

  try {
    const validate = valid(req.headers.key || '')
    if (validate) {
      let id = req.params.id
      const round = await Round.update(req.body, {
          where: { id } 
      });
      res.status(200).json({message: `Rodada ${req.body.numero} alterada com sucesso!`});
    }
    else {
      res.status(401).json({message: `Código inválido! Sai fora gambá safado!`});
    }
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});


router.delete('/rounds/:id', async (req, res) => {
try {
    const validate = valid(req.headers.key)
    if (validate) {
      let id = req.params.id
      const round = await Round.destroy({
        where: { id }
      });
      res.status(200).json(round);
    }
    else {
      res.status(401).json([]);
    }
} catch (error) {
    res.status(400).json({ error: error.message });
}
});


module.exports = router;
