const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const Exchange = require("../models/ExchangeModel.js");
const FinancialReserves = require("../models/ExchangeFinancialReserve.js");
const mongoose = require("mongoose");

const addExchange = asyncHandler(async (req, res) => {
  const ExchangeData = req.body;
  const existingExchange = await Exchange.findOne({
    $or: [{ id: ExchangeData.id }, { slug: ExchangeData.slug }],
  });
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
    exchanges,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, responseData, "Exchanges fetched successfully"));
});
const getExchangesBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const exchange = await Exchange.findOne({ slug })
    .select(
      "id name slug logo description dateLaunched urls fiats countries tags type makerFee takerFee quote platformId dexStatus netWorthUsd walletSourceStatus"
    )
    .populate('financialReserves');

  if (!exchange) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Exchange not found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, exchange, "Exchange fetched successfully"));
});
const addFinancialReserves = asyncHandler(async (req, res) => {
  const financialReservesData = req.body;

  if (!Array.isArray(financialReservesData)) {
    throw new ApiError(400, "Expected an array of financial reserves data.");
  }

  const insertedReserves = [];

  for (const reserve of financialReservesData) {
    const existingReserve = await FinancialReserves.findOne({
      walletAddress: reserve.walletAddress,
      network: reserve.network,
    });

    // if (existingReserve) {
    //   throw new ApiError(
    //     409,
    //     `Reserve data for wallet ${reserve.walletAddress} on network ${reserve.network} already exists!`
    //   );
    // }

    const newReserve = await FinancialReserves.create(reserve);
    insertedReserves.push(newReserve);
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        insertedReserves,
        "Financial reserves inserted successfully!"
      )
    );
});

module.exports = {
  addExchange,
  getAllExchanges,
  getExchangesBySlug,
  addFinancialReserves,
};
