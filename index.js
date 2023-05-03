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
const { AuthHandler } = require("./middlewares/auth.handler");

const PORT = process.env.PORT || 3001;

connectDB();

const whiteList = [
  "http://localhost:3000",
  "https://contactapp-marsdev.vercel.app/",
  "https://contact-app-api-hl8y.onrender.com/",
];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso no permitido"));
    }
  },
};

//Using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors(options));
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
app.use(AuthHandler);

app.listen(PORT, () => {
  console.log("Server running OK on port: ", PORT);
});
