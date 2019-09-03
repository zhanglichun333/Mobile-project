var express = require('express');

var app = express();

var router = express.Router();

var appData = require('./mock/data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});


router.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

router.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

router.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use(router);

module.exports = app.listen(3000, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:3000'  + '\n')
});