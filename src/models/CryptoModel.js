const mongoose = require('mongoose');
const AuditInfoSchema = new mongoose.Schema({
    coinId: String,
    auditor: String,
    auditStatus: Number,
    score: String,
    auditTime: Date,
    reportUrl: String,
    contractAddress: String,
    contractPlatform: String
});
const QuoteSchema = new mongoose.Schema({
    name: String,
    price: Number,
    volume24h: Number,
    marketCap: Number,
    selfReportedMarketCap: Number,
    percentChange1h: Number,
    percentChange24h: Number,
    percentChange7d: Number,
    lastUpdated: Date,
    percentChange30d: Number,
    percentChange60d: Number,
    percentChange90d: Number,
    fullyDilluttedMarketCap: Number,
    marketCapByTotalSupply: Number,
    dominance: Number,
    turnover: Number,
    ytdPriceChangePercentage: Number,
    percentChange1y: Number
});
const CryptoSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: String,
    symbol: String,
    slug: String,
    cmcRank: Number,
    circulatingSupply: Number,
    selfReportedCirculatingSupply: Number,
    totalSupply: Number,
    isActive: Boolean,
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    dateAdded: {
        type: Date,
        default: Date.now 
    },
    quotes: [QuoteSchema],
    isAudited: Boolean,
    auditInfoList: [AuditInfoSchema],
    badges: [Number],
    tagSlugs: { type: [String] }
});
module.exports = mongoose.model('Crypto', CryptoSchema);