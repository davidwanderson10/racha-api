const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

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
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/player/:id', async (req, res) => {

    try {
        let id = req.params.id
        const player = await Player.update(req.body, {
            where: { id } 
        });
        res.status(200).json(player);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    });


router.delete('/player/:id', async (req, res) => {
try {
    let id = req.params.id
    const player = await Player.destroy({
        where: { id }
    });
    res.status(200).json(player);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});


module.exports = router;