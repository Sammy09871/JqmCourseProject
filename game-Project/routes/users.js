const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.json');

// GET all games
router.get('/games', (req, res) => {
    fs.readFile(dataFilePath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// POST a new game
router.post('/games', (req, res) => {
    fs.readFile(dataFilePath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
        const games = JSON.parse(data);
        games.push(req.body);
        fs.writeFile(dataFilePath, JSON.stringify(games), (err) => {
            if (err) {
                res.status(500).send('Error writing data file');
                return;
            }
            res.status(201).send('Game added');
        });
    });
});

module.exports = router;

