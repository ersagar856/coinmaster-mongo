const express = require("express");
const router  = express.Router();
const {
    addExchange,
    getAllExchanges
} = require('../controllers/exchangeController.js')

router.route('/add-exchange').post(addExchange)
router.route('/get-exchange').get(getAllExchanges)
module.exports = router;