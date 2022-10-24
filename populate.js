import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import History from "./models/History.js";

const start = async () => {
  try {
    //Connect and deleta old data 
    await connectDB(process.env.MONGO_URL);
    await History.deleteMany();

    //Add data from json file
    // const jsonProducts = JSON.parse(
    //   await readFile(new URL("./mock-data.json", import.meta.url))
    // );
    // await History.create(jsonProducts);

    //Display success message and exit
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
