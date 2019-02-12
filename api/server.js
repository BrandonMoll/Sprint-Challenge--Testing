const express = require('express');
const knex = require('knex');
const dbConfig = require('../knexfile');

const server = express();
const db = knex(dbConfig.development);


server.use(express.json());

server.get('/', (req, res) => {
    db('games')
    .then(rows => {
        res.status(200).json(rows)
    })
    .catch(err => {
        res.status(500).json({message: 'error getting games'})
    })
});

server.post('/', (req, res) => {
    const game = req.body;
    if(game.title && game.genre) {
        db('games').insert(game)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json({message: 'error inserting game'})
        })
    } else {
        res.status(422).json({message: 'missing title or genre'})
    }
});

module.exports = server