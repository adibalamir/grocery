var express = require('express');
var router = express.Router();
const db = require('../queries');

/* GET users listing. */
router.get('/', db.addGroceryItem);

module.exports = router;
