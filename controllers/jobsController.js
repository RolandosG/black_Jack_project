import History from "../models/History.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";

import checkPermissions from "../utils/checkPermission.js";
import mongoose from "mongoose";
import moment from "moment";

const createJob = async (req, res) => {
  //const {message, currentBet} = req.body;

  req.body.createdBy = req.user.userId;

  const history = await History.create(req.body);

  res.status(StatusCodes.CREATED).json(history);
};

const getAllJobs = async (req, res) => {
  const { search, status, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (search) {
    queryObject.message = { $regex: search, $options: "i" };
  }

  // NO AWAIT
  let result = History.find(queryObject);

  // chain sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; //10
  result = result.skip(skip).limit(limit);
  // 75
  // 10 10 10 10 10 10 10 5
  const histories = await result;

  const totalJobs = await History.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({
    histories,
    totalHistories: histories.length,
    numOfPages: numOfPages,
  });
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const deleteJob = async (req, res) => {
  const { id: historyId } = req.params;

  const history = await History.findOne({ _id: historyId });

  if (!history) {
    throw new NotFoundError(`No history with id: ${historyId}`);
  }

  checkPermissions(req.user, history.createdBy);

  await history.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! History Remove" });
};

const showStats = async (req, res) => {
  //Get array of win, lost, and draw game
  let stats = await History.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  //Convert array to the object
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  //Add default value if register new user
  const defaultStats = {
    draw: stats.draw || 0,
    lost: stats.lost || 0,
    win: stats.win || 0,
  };

  let monthlyApplications = await History.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },

    //Display latest 6 months
    { $limit: 6 },
  ]);

  //Refactor Data
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      // accepts 0-11
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  //Get bet amount
  let achievement = await History.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
  ]);

  let betAmount = [];
  let isAchievedBet = false;
  let totalWin = 0;

  for (let i = 0; i < achievement.length; i++) {
    if (achievement[i].status === "win") {
      betAmount.push(parseInt(achievement[i].currentBet.slice(13)));
    }
  }

  for (let i = 0; i < betAmount.length; i++) {
    totalWin += betAmount[i];

    if (betAmount[i] === 100) {
      isAchievedBet = true;
    }
  }

  const achievementResult = {
    isAchievedBet,
    totalWin,
  };

  //Return stats
  res
    .status(StatusCodes.OK)
    .json({ defaultStats, monthlyApplications, achievementResult });
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats };
