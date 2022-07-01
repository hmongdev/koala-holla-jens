const express = require('express');

const router = express.Router();
const pg = require('pg');
const pool = require('../modules/pool');


// DB CONNECTION

// GET
router.get('/', (req, res) => {
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
// koalaRouter.post('/', (req, res) => {
//     const newKoala = req.body;
//     console.log(`req.body:`, newKoala);
//     const queryText = `
//         INSERT INTO "koalas" ("name", "age", "gender", "ready_to_transfer", "notes")
//         VALUES ($1, $2, $3, $4, $5);
//     `;
//     pool.query(queryText, [
//         newKoala.name,
//         newKoala.age,
//         newKoala.gender,
//         newKoala.ready_to_transfer,
//         newKoala.notes,
//     ])
//         .then(() => {
//             res.sendStatus(201);
//         })
//         .catch((err) => {
//             console.log(`Error in GET query:`, err);
//             //server always needs to respond
//             res.sendStatus(500);
//         });
// });

// PUT
router.put('/transfer/:id', (req, res) => {
  console.log('start of router.put');
  let koalasId = req.params.id;
  let transfer = req.body.transfer;
  let queryText;
  if (transfer === 'transfer') {
    console.log('first conditional of router.put');
    queryText = 'UPDATE "koalas" SET "ready_to_transfer" = "Y" WHERE id = $1;';
  } else {
    res.sendStatus(500);
    return;
  }
  pool
    .query(queryText, [koalasId])
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log(`Error UPDATEing with query ${queryText}: ${error}`);
      res.sendStatus(500);
    });
});

// DELETE

module.exports = router;

