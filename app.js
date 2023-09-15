const express = require("express");
const router = require("./routes/todoRoute");
const app = express();
const port = 4000;

app.use("/api/v1/todos", router);

app.listen(port, console.log(`Server listening on port ${port}`));
