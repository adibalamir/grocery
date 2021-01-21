var express = require('express');
var router = express.Router();
const db = require('../queries');

/* POST grocery. */
router.post('/', db.addGroceryItem);

module.exports = router;
