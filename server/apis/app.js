

const React = require("react")
const ReactDOM = require("react-dom")
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const info = require(__dirname + "/info.js");
let data=[];
const api = require(__dirname+"/api.js")
const fapiKey=api.fapiKey;
const fsecretKey=api.fsecretKey;
const Binance = require('node-binance-api-testnet');
const binance = new Binance().options({
  APIKEY:fapiKey,
  APISECRET: fsecretKey,
  "family":4,
});


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


app.get("/chart/data",(req,res)=>{
  binance.websockets.chart("BNBBTC", "1m", (symbol, interval, chart) => {
    let tick = binance.last(chart);
    const last = chart[tick].close;
    // console.info(chart);
    // Optionally convert 'chart' object to array:
   
    let ohlc = binance.ohlc(chart);
   
    console.info( ohlc);
    // console.info(symbol+" last price: "+last)
    res.send(ohlc);
  });
  



})





// Ana sayfa
app.get("/", (req, res) => {
 

  // Açık emirleri al ve ekrana yazdır
  info
    .openOrders()
    .then((orders) => {
      if (orders.length > 0) {
        res.render("list", { orders: orders });
      } else {
        res.render("no-open-orders");
      }
    })
    .catch((error) => {
      console.error(error);
      res.send("An error occurred");
    });
});

//chart
app.get("/index", function name(req, res) {
  res.sendFile(__dirname+"/index.html");
});


// Hesap bilgisi endpoint'i
app.get("/hesap", function name(req, res) {
  let balance = info.balance("USDT");

  balance
    .then((result) => {
      let balance = JSON.stringify(result);
      console.log(balance);

      res.render("account", { balance: balance });
    })
    .catch((error) => {
      console.error(error);
      res.send("An error occurred");
    });
});

// Giriş sayfası
app.get("/login", function name(req, res) {
  res.render("login");
});

// Stratejiler sayfası
app.get("/stratejiler", function name(req, res) {
  

  res.render("strategies");
});


// Uygulama 3000 numaralı portu dinliyor
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
