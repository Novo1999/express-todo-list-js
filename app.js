const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

const todoRouter = require("./routes/todoRoute");
const authRouter = require("./routes/auth");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

require("dotenv").config();

app.use(express.json());

const port = process.env.PORT || 4000;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todos", authenticateUser, todoRouter);
app.use(express.static("./public"));
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const startMongoServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startMongoServer();
