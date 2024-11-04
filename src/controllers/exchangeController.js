const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const Exchange = require('../models/ExchangeModel.js');
const mongoose = require("mongoose");

const addExchange = asyncHandler(async (req, res) => {
  try {
    // console.log(req.body);
    const ExchangeData = req.body;
    const existingExchange = await Exchange.findOne({ id: ExchangeData.id });
   if (existingExchange) {
        throw new ApiError(409, "Exchange data already exists!")
    }
    const newExchange = await Exchange.create(ExchangeData);
    return res.status(201).json(
        new ApiResponse(200, newExchange, "Exchange data inserted successfully!")
    )
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
});

module.exports = {
    addExchange
}
