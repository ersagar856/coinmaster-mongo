const express = require('express');
const router = express.Router();
const Crypto = require('../models/CryptoModel');

router.post('/addCrypto', async (req, res) =>{
    try{
        const cryptoData = req.body;
        const existingCrypto = await Crypto.findOne({ id: cryptoData.id });
        if (existingCrypto) {
            return res.status(409).json({
                message: 'Cryptocurrency data already exists!',
                data: existingCrypto.id
            });
        }
        const newCrypto = await Crypto.create(cryptoData);
        res.status(201).json({
            message: 'Cryptocurrency data inserted successfully!',
            data: newCrypto.id
        });
    }
    catch(err)
    {
        res.status(500).json({error: 'Server error', details: err});
    }
});
router.get('/getCrypto', async (req, res) =>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const filterTags = req.query.tagSlugs || "";
        const tagSlugs = filterTags.replace(/['"]+/g, '').split(',').map(tag => tag.trim()).filter(tag => tag);
        const cryptoType = req.query.cryptoType || "all"; // Need to add after confirmation Varun Sir
        const marketCapRange = req.query.marketCapRange || ""; 
        const percentChange24hRange = req.query.percentChange24hRange || "";
        const volume24hRange = req.query.volume24hRange || "";
        const circulatingSupplyRange = req.query.circulatingSupplyRange || ""; // Need to add after confirmation Varun Sir
        const skip = (page - 1) * limit;
        let filter = {};
        if (tagSlugs.length > 0) {
            filter.tagSlugs = { $in: tagSlugs };
        }
        if (cryptoType && cryptoType !== 'all') {
            if (cryptoType === 'coins') {
                filter.isToken = false;
            } else if (cryptoType === 'tokens') {
                filter.isToken = true;
            }
        }
        if (marketCapRange) {
            const [minMarketCap, maxMarketCap] = marketCapRange.split('~').map(Number);
            filter['quotes.0.marketCap'] = { $gte: minMarketCap, $lte: maxMarketCap };
        }
        if (percentChange24hRange) {
            const [minPercentChange, maxPercentChange] = percentChange24hRange.split('~').map(Number);
            filter['quotes.0.percentChange24h'] = { $gte: minPercentChange, $lte: maxPercentChange };
        }
        if (volume24hRange) {
            const [minVolume, maxVolume] = volume24hRange.split('~').map(Number);
            filter['quotes.0.volume24h'] = { $gte: minVolume, $lte: maxVolume };
        }

        if (circulatingSupplyRange) {
            const [minSupply, maxSupply] = circulatingSupplyRange.split('~').map(Number);
            filter.circulatingSupply = { $gte: minSupply, $lte: maxSupply };
        }

        const [data, totalRecords] = await Promise.all([
            Crypto.find(filter).skip(skip).limit(limit),
            Crypto.countDocuments(filter)
        ]);
        res.json({
            totalRecords,
            currentPage: page,
            totalPages: Math.ceil(totalRecords / limit),
            cryptoCurrencyList: data,
        });
    }
    catch(err)
    {
        res.status(500).json({error: 'Server error', details: err});
    }
});
router.put('/updateCrypto/:id',async(req, res)=>{
    let id = String(req.params.id);
    try
    {
        const cryptoData = req.body;
        const existingCrypto = await Crypto.findOneAndUpdate(
            { id: id },
            cryptoData,
            { new: true, upsert: true }
        );
        res.status(200).json({
            message: 'Cryptocurrency data updated successfully!',
            data: existingCrypto.id
        });
    }
    catch(err)
    {
        res.status(500).json({error: 'Server error', details: err});
    }
});
module.exports = router;