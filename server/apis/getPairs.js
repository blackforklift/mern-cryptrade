import https from 'https';
import { resolve } from 'path';

let coinPairs = [];
let coinPairsLoaded = false;

const getCoinPairs = () => {
  return new Promise((resolve, reject) => {
    if (coinPairsLoaded) {
      resolve(coinPairs);
    } else {
      const options = {
        hostname: 'api.binance.com',
        path: '/api/v3/exchangeInfo',
        method: 'GET'
      };

      const req = https.request(options, res => {
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('end', () => {
          const response = JSON.parse(data);
          coinPairs = response.symbols.map(symbol => symbol.symbol);
          coinPairsLoaded = true;
          resolve(coinPairs);
        });
      });

      req.on('error', error => {
        reject(error);
      });

      req.end();
    }
  });
};

export { getCoinPairs, coinPairs };