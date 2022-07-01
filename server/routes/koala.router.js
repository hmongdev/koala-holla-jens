const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg');
const pool = require('../modules/pool');

// DB CONNECTION

//GET route
koalaRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas";';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`Error making query`, err);
            res.sendStatus(500);
        });
});

// POST route
koalaRouter.post('/', (req, res) => {
    const newKoala = req.body;
    console.log(`req.body:`, newKoala);
    const queryText = `
        INSERT INTO "koalas" ("name", "age", "gender", "ready_to_transfer", "notes")
        VALUES ($1, $2, $3, $4, $5);
    `;
    pool.query(queryText, [
        newKoala.name,
        newKoala.age,
        newKoala.gender,
        newKoala.ready_to_transfer,
        newKoala.notes,
    ])
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error in GET query:`, err);
            //server always needs to respond
            res.sendStatus(500);
        });
});

// PUT

// DELETE

module.exports = koalaRouter;
