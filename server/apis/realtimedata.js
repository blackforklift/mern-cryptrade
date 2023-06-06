import express from 'express';
import { createServer } from 'http';
import WebSocket from 'ws';

const app = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });

const binanceWsBaseUrl = 'wss://fstream.binance.com';
const symbol = 'btcusdt';
const interval = '15m';
const ohlcStreamUrl = `${binanceWsBaseUrl}/stream?streams=${symbol}@kline_${interval}`;
const ohlcStreamWs = new WebSocket(ohlcStreamUrl);

let clientSocket = null;

ohlcStreamWs.on('open', () => {
  console.log('WebSocket connection established.');
});

ohlcStreamWs.on('message', (data) => {
  if (clientSocket) {
    clientSocket.send(data);
  }
});

ohlcStreamWs.on('close', () => {
  console.log('WebSocket connection closed.');
  clientSocket = null;
});

ohlcStreamWs.on('error', (error) => {
  console.error('WebSocket connection error:', error);
});

wss.on('connection', (socket) => {
  console.log('Client connected.');
  clientSocket = socket;

  socket.on('close', () => {
    console.log('Client disconnected.');
    clientSocket = null;
  });
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
