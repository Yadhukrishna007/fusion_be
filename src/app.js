import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import compression from "compression";
import cors from "cors";

dotenv.config();
const app = express();

//Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

//route
app.use("/api/", routes);

//Error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);

  res.send({
    Error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
