import IncomeHistory from "../models/IncomeHistory.js";

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 80, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort == "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await IncomeHistory.find({
      $or: [
        { symbol: { $regex: new RegExp(search, "i") } },
        { income: { $gte: Number(search) } },
        { incomeType: { $regex: new RegExp(search, "i") } },
     
        
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

      const total = await IncomeHistory.countDocuments({
        $or: [
          { symbol: { $regex: new RegExp(search, "i") } },
     
          
        ],
      });
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getStrategy = async (req, res) => {
//   try {
//     // Symbol to trade
//     const symbol = 'BTCUSDT';
  
//     // Fetch latest k-line data
//     const tv = new tradingViewAPI();
//     const data = await tv.getBarset(symbol, '1', { limit: 2 });
//     const latestKline = data[symbol][1];
  
//     // Prepare order parameters
//     const quantity = 0.001;
//     const orderParams = {
//       symbol:symbol,
//       side: 'BUY',
//       type: 'MARKET',
//       quantity:quantity,
//     };
  
//     // Create order
//     const url = apiCall('/fapi/v1/order', orderParams);
//     const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
//     const order = await response.json();
//     console.log(order);
    
//     res.status(200).json({ message: 'Order placed successfully!' });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };




