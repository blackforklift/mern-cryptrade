import { fapiKey } from "./api.js";
import apiCall from "./apiUrlGenerator.js";
import createSignature from "./signature.js";
import { accountInfo } from "./info.js";

const roundToPrecision = (value, precision) => {
  const multiplier = Math.pow(10, precision);
  return Math.floor(value * multiplier) / multiplier;
};


// GET current btc price

const getBtcPrice = async () => {
  const url_income = apiCall("/fapi/v1/ticker/price", { symbol: "BTCUSDT" });

  try {
    const response = await fetch(url_income, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-MBX-APIKEY": fapiKey,
      },
    });
    const data = await response.json();
    console.log("btc price: ", data.price);
    return data.price;
  } catch (error) {
    console.error(error);
  }
};
let currentPricebtc=Number(await getBtcPrice());
let priceBTC = currentPricebtc.toFixed();
let totalBalance=accountInfo("totalWalletBalance");
console.log(totalBalance)

// ---buy sell btcusdt --   https://binance-docs.github.io/apidocs/futures/en/#new-order-trade
const Buy_Sell = async (symbol, type, timeInForce, side, quantity, optionalParams = {}) => {
  
  const roundedQuantity = roundToPrecision(quantity, 4);
  const endpoint = "/fapi/v1/order";
  
  // Include mandatory parameters
  const payload = {
    symbol: symbol,
    type: type,
    timeInForce: timeInForce,
    side: side,
    quantity: roundedQuantity,
   
    ...optionalParams, // Include optional parameters
  };
  
  const url = apiCall(endpoint, payload);
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MBX-APIKEY": fapiKey,
      },
    });
    
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};


// ---initial leverage --
const Leverage = async (symbol ,leverage) => {
   
    const endpoint = "/fapi/v1/leverage";
    const payload = { symbol: symbol, leverage:leverage };
    const url = apiCall(endpoint, payload);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-MBX-APIKEY": fapiKey,
        },
      });
      const data = await response.json();
      console.log(data);
     
    } catch (error) {
      console.error(error);
    }
  };
;
  

Buy_Sell("BTCUSDT",
"LIMIT",
"GTC",
"BUY",
 0.1,

 {price:priceBTC}
);



// export { getBtcPrice,Buy };


