const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const errorhandler = require("errorhandler");
const app = express();

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Ok ok ok");
});

//Using middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

if (process.env.NODE === "development") {
  app.use(errorhandler());
}

app.listen(PORT, () => {
  console.log("Server running OK on port: ", PORT);
});
