import express, { json, urlencoded } from "express";
import {config} from "./config";
import mongoose from "mongoose";
import { RegisterRoutes } from "../build/routes";
import cors from "cors";

const app = express();

const url = "mongodb://localhost:27017";
mongoose.connect(url,
  {
    "user": "root",
    "pass": "rootpassword"
  });
const con = mongoose.connection;
app.use(json()); // Parse JSON bodies
app.use(urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors());

RegisterRoutes(app);
try {
  con.on("open", () => {
    console.log("connected");
  });
} catch (error) {
  console.log("Error: " + error);
}

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
