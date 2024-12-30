const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Round = require('../models/Round');
require('dotenv').config();

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
  try {
    const players = await Player.findAll();
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
      const player = await Player.create(req.body);
      res.status(201).json(player);
    }
    else {
      res.status(401).json([]);
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
router.get('/rouds', async (req, res) => {
  try {
    const round = await Round.findAll();
    res.json(round); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/rouds/:id', async (req, res) => {
    let id = req.params.id
    try {
      const round = await Round.findOne({
        where: { id }
    })
      res.json(round); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.post('/rouds', async (req, res) => {
  try {
    const validate = valid(req.headers.key)
    if (validate) {
      const round = await Round.create(req.body);
      res.status(201).json(round);
    }
    else {
      res.status(401).json([]);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/rouds/:id', async (req, res) => {

    try {
      const validate = valid(req.headers.key)
      if (validate) {
        let id = req.params.id
        const round = await Round.update(req.body, {
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


router.delete('/rouds/:id', async (req, res) => {
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