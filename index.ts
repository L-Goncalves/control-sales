import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Seller from "./routes/Seller"
import bodyParser from 'body-parser'
import Accounts from './routes/Accounts';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json())

app.use("/sellers", Seller)
app.use("/accounts", Accounts)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

