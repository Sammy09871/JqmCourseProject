const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.json');
const titlesFilePath = path.join(__dirname, '../titles.json');


const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        throw error;
    }
};

const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error);
        throw error;
    }
};


router.get('/games', (req, res) => {
    try {
        const data = readData(dataFilePath);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch games' });
    }
});


router.get('/games/:id', (req, res) => {
    try {
        const data = readData(dataFilePath);
        const game = data.find(g => g.id === parseInt(req.params.id));
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch game' });
    }
});


router.post('/games', (req, res) => {
    try {
        const data = readData(dataFilePath);
        const newGame = req.body;
        newGame.id = data.length ? data[data.length - 1].id + 1 : 1;
        data.push(newGame);
        writeData(dataFilePath, data);
        res.status(201).json(newGame);
    } catch (error) {
        console.error("Error adding game:", error);
        res.status(500).json({ message: 'Failed to add game' });
    }
});


router.get('/games/random', (req, res) => {
    try {
        const titles = readData(titlesFilePath);
        if (titles.length === 0) {
            return res.status(404).json({ message: 'No games found' });
        }
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        res.json({ title: randomTitle });
    } catch (error) {
        console.error("Error fetching random game:", error);
        res.status(500).json({ message: 'Failed to fetch random game' });
    }
});

module.exports = router;
