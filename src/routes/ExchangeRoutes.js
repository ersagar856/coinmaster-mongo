const express = require("express");
const router = express.Router();
const {
    addExchange
} = require('../controllers/exchangeController.js')

router.route('/add-exchange').post(addExchange)
module.exports = router;