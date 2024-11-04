const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  filteredTotalVol24h: {
    type: Number,
  },
  totalVol24h: {
    type: Number,
  },
  totalVolAdjusted24h: {
    type: Number,
  },
  totalVol7d: {
    type: Number,
  },
  totalVol30d: {
    type: Number,
  },
  spotVol24h: {
    type: Number,
  },
  derivativesVol24h: {
    type: Number,
  },
  derivativesOpenInterests: {
    type: Number,
  },
});

const ExchangeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
  },
  name: { type: String, required: true },
  slug: {
    type: String,
    required: true,
  },
  dexStatus: {
    type: Number,
  },
  platformId: {
    type: Number,
  },
  score: { type: Number },
  trafficScore: {
    type: Number,
  },
  countries: [
    {
      type: String,
    },
  ],
  fiats: [
    {
      type: String,
    },
  ],
  filteredTotalVol24h: {
    type: Number,
  },
  totalVol24h: {
    type: Number,
  },
  totalVolAdjusted24h: {
    type: Number,
  },
  totalVol7d: {
    type: Number,
  },
  totalVol30d: {
    type: Number,
  },
  spotVol24h: {
    type: Number,
  },
  derivativesVol24h: {
    type: Number,
  },
  derivativesOpenInterests: {
    type: Number,
  },
  derivativesMarketPairs: {
    type: Number,
  },
  totalVolChgPct24h: {
    type: Number,
  },
  totalVolChgPct7d: {
    type: Number,
  },
  totalVolChgPct30d: {
    type: Number,
  },
  visits: {
    type: String,
  },
  liquidity: {
    type: Number,
  },
  numMarkets: {
    type: Number,
  },
  numCoins: {
    type: Number,
  },
  dateLaunched: {
    type: Date,
  },
  lastUpdated: {
    type: Date,
  },
  marketSharePct: {
    type: Number,
  },
  type: {
    type: String,
    default: "",
  },
  makerFee: {
    type: Number,
  },
  takerFee: {
    type: Number,
  },
  firstHistoricalData: {
    type: Date,
  },
  lastHistoricalData: {
    type: Date,
  },
  quotes: [QuoteSchema],
  reservesAvailable: {
    type: Number,
  },
  porAuditStatus: {
    type: Number,
  },
});

module.exports = mongoose.model("Exchange", ExchangeSchema);