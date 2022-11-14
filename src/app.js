import express from "express";
import indexRoutes from "./routes/index.routes";
import { engine } from "express-handlebars";
import path from "path";
import morgan from "morgan";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

config();
const app = express();

mongoose.connect(process.env.MONGODB_URL);
app.use(express.json()); // Esto es importante para usar el BODY JSON.stringify
app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));

app.engine(
  ".hbs",
  engine({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

const multerSave = multer.diskStorage({
  destination: path.join(__dirname, "public/images"),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
  },
});

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(
  multer({
    storage: multerSave,
    dest: path.join(__dirname, "public/images"),
    limits: { fileSize: 3000000 },
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb("Error: Archivo debe ser una imagen valida");
    },
  }).single("image")
);

/*
app.post("/upload", (req, res) => {
  console.log(req.file);
});*/

//routes
app.use(indexRoutes);

//static files
app.use(express.static(path.join(__dirname, "public")));

export default app;
