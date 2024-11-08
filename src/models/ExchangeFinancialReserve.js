const mongoose = require("mongoose");
const financialReservesSchema = new mongoose.Schema({
  exchangeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exchange",
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  network: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  cryptoId: {
    type: Number,
    required: true,
  },
  priceUsd: {
    type: Number,
    required: true,
  },
  dsId: {
    type: Number,
    required: true,
  },
  platformCryptoId: {
    type: Number,
    required: true,
  },
  platformCryptoName: {
    type: String,
    required: true,
  },
  updateTime: {
    type: Date,
    required: true,
  },
  balanceUSD: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("FinancialReserves", financialReservesSchema);
