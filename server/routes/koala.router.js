const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');
// DB CONNECTION

// GET

// POST

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

module.exports = koalaRouter;
