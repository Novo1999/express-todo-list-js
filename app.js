const express = require("express");
const router = require("./routes/todoRoute");
const app = express();
const connectDB = require("./db/connect");
const notFound = require("./errors/error");

require("dotenv").config();

app.use(express.json());

const port = 4000;

app.use("/api/v1/todos", router);
app.use(express.static("./public"));
app.use(notFound);

const startMongoServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startMongoServer();
