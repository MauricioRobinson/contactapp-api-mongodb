const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const errorhandler = require("errorhandler");
const passport = require("passport");
const connectDB = require("./db/config");
const app = express();
const routerApi = require("./routes/index");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/errorHandler");
const ValidatorHandler = require("./middlewares/validator.handler");

const PORT = process.env.PORT || 3001;

connectDB();

//Using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

if (process.env.NODE === "development") {
  app.use(errorhandler());
}

//Initialiazing passport strategies
require("./libs/auth");
app.use(passport.initialize());

routerApi(app);

//Custom middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(ValidatorHandler);

app.listen(PORT, () => {
  console.log("Server running OK on port: ", PORT);
});
