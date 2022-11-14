import mongoose from "mongoose";
import { MONGODB_URL } from "./config";

import { config } from "dotenv";

config();

mongoose.connect(process.env.MONGODB_URL);
