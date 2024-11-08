const express = require("express");
const router = express.Router();
const {
  addExchange,
  getAllExchanges,
  getExchangesBySlug,
  addFinancialReserves,
} = require("../controllers/exchangeController.js");

router.route("/add-exchange").post(addExchange);
router.route("/add-financial-reserves").post(addFinancialReserves);
router.route("/get-exchange").get(getAllExchanges);
router.route("/:slug").get(getExchangesBySlug);
module.exports = router;
