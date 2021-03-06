import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/etsaw_react", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api/productList", (request, response) => {
  response.send("Products");
});

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

///////////// Required for publishing to heroku /////////////
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

app.use((error, request, response, next) => {
  response.status(500).send({ message: error.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Serve at http://localhost:5000");
});
