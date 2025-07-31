import passport from "passport";
import express from "express";
import configDotenv from "./src/config/dotenv";
import router from "./src/routes/routes";
import * as path from "path";
import configAuth from "./src/middlewares/useCredentialMiddleware";
import cors from "cors";
// import routes from './src/routes/routes';

configDotenv();
configAuth();

const app = express();
const port = process.env.PORT;

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `${process.env.APP_NAME} app listening at http://localhost:${port}`
  );
});
