import express from "express";
import mongoose from "mongoose";
import workRoute from "./routes/work.route.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express();

app.use(express.json());

app.use("/api", workRoute);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, async () => {
  console.log("Server started on port 3000");
  //mongodb://localhost:27017
  await mongoose.connect("mongodb://localhost:27017/todo");
  console.log("Connected to MongoDB");
});
