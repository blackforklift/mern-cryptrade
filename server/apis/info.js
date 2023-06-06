import { fapiKey } from "./api.js";
import apiCall from "./apiUrlGenerator.js";
import createSignature from "./signature.js";


// ---take btcusdt usertrades--
const getUserTrades = async () => {
 
  const endpoint = "/fapi/v1/userTrades";
  const payload = { symbol: "BTCUSDT" };
  const url = apiCall(endpoint, payload);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-MBX-APIKEY": fapiKey,
      },
    });
    const data = await response.json();
    console.log("USER TRADES: ", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

//account info:
const accountInfo = async (index) => {

  const url_income = apiCall("/fapi/v2/account");

  try {
    const response = await fetch(url_income, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-MBX-APIKEY": fapiKey,
      },
    });
    const data = await response.json();
    console.log(data[index])
    console.log(`${index}`, data[index]);
    return data[index];
  } catch (error) {
    console.error(error);
  }
};




// GET INCOME HISTORY
const getIncomeHistory = async () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000); // Subtract 30 days
  
  const startTime = startDate.getTime();
  const endTime = currentDate.getTime();
  console.log(startTime)
  const url_income = apiCall("/fapi/v1/income", { symbol: "BTCUSDT",startTime:startTime,endTime:endTime });

  try {
    const response = await fetch(url_income, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-MBX-APIKEY": fapiKey,
      },
    });
    const data = await response.json();
    console.log("INCOME HISTORY: ", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};



 const getOpenPositions = async () => {
  const url_income = apiCall("/fapi/v2/positionRisk", { symbol: "BTCUSDT" });

  try {
    const response = await fetch(url_income, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-MBX-APIKEY": fapiKey,
      },
    });
    const data = await response.json();
    console.log("open : ", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAllOrders = async () => {
  
  const url_income = apiCall("/fapi/v1/allOrders", { symbol: "BTCUSDT" });

  try {
    const response = await fetch(url_income, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-MBX-APIKEY": fapiKey,
      },
    });
    const data = await response.json();
    console.log("orders : ", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// get historical klines

const getHistoricalKlines = async () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getTime() - 10* 24 * 60 * 60 * 1000); // Subtract 10 days
  const url_income = apiCall("/fapi/v1/klines", { symbol: "BTCUSDT", interval:"15m",startTime:startDate,endTime:currentDate });

  try {
    const response = await fetch(url_income, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-MBX-APIKEY": fapiKey,
      },
    });
    const data = await response.json();
    console.log("orders : ", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};





export { getUserTrades, getIncomeHistory,getOpenPositions,accountInfo,getAllOrders,getHistoricalKlines};


