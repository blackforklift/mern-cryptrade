import express from "express";
import bodyParser from "body-parser";
import mongoose, { get } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";

import { Users } from "./models/User.js";
import Tran from "./models/transaction.js";
import { getTransactions } from "./controllers/client.js";
import { getAllOrders } from "./apis/info.js";
import Order from "./models/orders.js";
import { getHistoricalKlines } from "./apis/info.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);

/* MONGOOSE SETUP */
import { getUserTrades, getIncomeHistory } from "./apis/info.js";
import IncomeHistory from "./models/IncomeHistory.js";
import Candlestick from "./models/candle.js";

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    const addIncomeHistory = async () => {
      try {
        const promise = await getIncomeHistory();
        await IncomeHistory.insertMany(promise);
        console.log("Income history data added successfully");
      } catch (error) {
        console.error(`Error adding income history data: ${error}`);
      }
    };
    const addhistoricalklines = async () => {
      try {
        const promise = await getHistoricalKlines();
        const formattedData = promise.map((item) => ({
          openTime: new Date(item[0]),
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
          volume: parseFloat(item[5]),
          closeTime: new Date(item[6]),
          quoteVolume: parseFloat(item[7]),
          numberOfTrades: parseInt(item[8]),
          takerBuyBaseVolume: parseFloat(item[9]),
          takerBuyQuoteVolume: parseFloat(item[10]),
          ignore: parseInt(item[11]),
        }));

        await Candlestick.insertMany(formattedData);
        console.log("CANDLE data added successfully");
      } catch (error) {
        console.error(`Error adding CANDLE data: ${error}`);
      }
    };

    const updateCandleData = async () => {
      try {
        await Candlestick.deleteMany({});
        console.log("Old candle data deleted successfully");
        await addhistoricalklines();
      } catch (error) {
        console.error(`Error updating data: ${error}`);
      }
    };

    updateCandleData();

    const updateData = async () => {
      try {
        await IncomeHistory.deleteMany({});
        console.log("Old income history data deleted successfully");
        await addIncomeHistory();
      } catch (error) {
        console.error(`Error updating data: ${error}`);
      }
    };

    const addOrders = async () => {
      try {
        const promise = await getAllOrders();
        await Order.insertMany(promise);
        console.log("order history data added successfully");
      } catch (error) {
        console.error(`Error adding order history data: ${error}`);
      }
    };

    // addOrders()
    // tran.insertOne()

    const addIncometoTran = async () => {
      try {
        const user = await Users.findOne({ _id: "643b3fd81273ec483576abdd" });
        const incomeHistoriesFromAPI = await getIncomeHistory();

        const existingTran = await Tran.findOne({ userId: user._id });
        console.log(existingTran);
        const existingIncomeHistories = existingTran
          ? existingTran.incomehistories
          : [];

        const newIncomeHistories = [];
        const addedTranIds = new Set();
        for (const ih of incomeHistoriesFromAPI) {
          if (
            !existingIncomeHistories.some((eih) => eih.tranId === ih.tranId) &&
            !addedTranIds.has(ih.tranId)
          ) {
            newIncomeHistories.push({
              symbol: ih.symbol,
              incomeType: ih.incomeType,
              income: ih.income,
              asset: ih.asset,
              time: ih.time,
              info: ih.info,
              tranId: ih.tranId,
              tradeId: ih.tradeId,
              user: user._id.toString(),
            });
            addedTranIds.add(ih.tranId);
          }
        }

        const incomeHistories = [
          ...existingIncomeHistories,
          ...newIncomeHistories,
        ];

        const tran = new Tran({
          userId: user._id,
          incomehistories: incomeHistories,
        });

        await tran.save();
      } catch (error) {
        console.error(
          "An error occurred while adding income to transaction:",
          error
        );
      }
    };

    const UpdateTran = async () => {
      try {
        await Tran.deleteMany({});
        console.log("old history of tran deleted..");
        await addIncometoTran();
        console.log("Tran updated successfuly");
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      const currentDate = new Date().toLocaleString();
      updateCandleData(); // Update candle data
     
      console.log(`Server got updated ${currentDate}`);
     
    }, 60000);

    updateData();
    // UpdateTran();
  })
  .catch((error) => console.log(`${error} did not connect`));

// Create a new user
// const newUser = new Users({

//   firstName: 'Dilan',
//   lastName: 'Saskin',
//   email: 'dilansskn@gmail.com',
//   password: '1234',
//   status:"VIP"

// });

// newUser.save()
//   .then(user => console.log(`User created: ${user}`))
//   .catch(err => console.error(err));
