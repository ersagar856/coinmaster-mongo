const asyncHandler = require("../utils/asyncHandler.js");
const ApiError     = require("../utils/ApiError.js");
const ApiResponse  = require("../utils/ApiResponse.js");
const Exchange     = require("../models/ExchangeModel.js");
const mongoose     = require("mongoose");

const addExchange = asyncHandler(async (req, res) => {
  const ExchangeData = req.body;
  const existingExchange = await Exchange.findOne({ id: ExchangeData.id });
  if (existingExchange) {
    throw new ApiError(409, "Exchange data already exists!");
  }
  const newExchange = await Exchange.create(ExchangeData);
  return res
    .status(201)
    .json(
      new ApiResponse(200, newExchange, "Exchange data inserted successfully!")
    );
});

const getAllExchanges = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // Fetch exchanges with pagination
  const exchanges = await Exchange.find().skip(skip).limit(limit);
  const totalExchanges = await Exchange.countDocuments();
  const responseData = {
    pagination: {
      totalItems: totalExchanges,
      totalPages: Math.ceil(totalExchanges / limit),
      currentPage: page,
      pageSize: limit,
    },
    exchanges
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        responseData,
        "Exchanges fetched successfully"
      )
    );
});

module.exports = {
  addExchange,
  getAllExchanges,
};
