const express = require('express');
const router = express.Router();
const categoriesHandler = require('../../handlers/categoryhandler');

router.get('/room', (req, res, next) => {
  categoriesHandler.productsByCategories(
    req.url.substring(1),
    req.headers,
    req.query,
    (err, result) => {
      if (err) {
        next(err);
      } else {
        res.status(200).send(result);
      }
    },
  );
});

router.get('/product', (req, res, next) => {
  categoriesHandler.getProductTable(
    req.url.substring(1),
    req.headers,
    req.query,
    (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.status(200).send(result);
    },
  );
});

router.get('/:keyword', (req, res, next) => {
  categoriesHandler.getCategories(
    req.params.keyword,
    req.headers,
    (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.status(200).send({
        status: 'success',
        data: result,
      });
    },
  );
});

module.exports = router;
