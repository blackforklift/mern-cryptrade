import crypto from 'crypto';
import * as querystring from 'querystring';
import { fsecretKey } from './api.js';

const timestamp = Date.now();
const recvWindow = 6000;

export const queryParams = {
  timestamp: timestamp,
  recvWindow: recvWindow,
};

export default function createSignature(payload = {}) {
  const params = { ...queryParams, ...payload };
  const signature = crypto
    .createHmac('sha256', fsecretKey)
    .update(querystring.stringify(params))
    .digest('hex');
  return signature;
}

