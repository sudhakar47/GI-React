const express = require('express');
const router = express.Router();
const espotsHandler = require('../../handlers/espotshandler');

router.get('/:espotName', (req, res, next) => {
  espotsHandler.getEspotsData(
    req.headers,
    req.params.espotName,
    (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.status(200).send(result);
    },
  );
});

module.exports = router;
