import { PostController } from "./controller/post.controller";
import express, { Application } from "express";
import cors from "cors";
import { PostService } from "./service/post.service";
import mongoose from "mongoose";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setDBConfig();
    this.setControllers();
  }

  private setConfig() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private setDBConfig() {
    const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/CasionTimes";
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    mongoose.set("toJSON", {
      virtuals: true,
      transform: (_: any, converted: any) => {
        delete converted._id;
      },
    });

    mongoose.connection.on("error", () => console.error("CONNECTION ERROR:"));
    mongoose.connection.once("open", () => console.log("DATABASE CONNECTED"));
  }

  private setControllers() {
    const postController = new PostController(new PostService());

    this.app.use("/api/v1/post", postController.router);
  }
}

export default new App().app;
