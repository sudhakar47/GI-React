const express = require('express');
const router = express.Router();
const productHandler = require('../../handlers/producthandler');

router.get('/pdp', (req, res, next) => {
  productHandler.getProductDetailPage(
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
  )
});
module.exports = router;
