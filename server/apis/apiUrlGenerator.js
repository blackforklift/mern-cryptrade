import createSignature from './signature.js';
import querystring from 'querystring';
import { queryParams } from './signature.js';

export default function apiCall(endpoint, payload = {}) {
  const baseUrl = 'https://testnet.binancefuture.com';
  const query = querystring.stringify({ ...queryParams, ...payload });
  const signature = createSignature(payload);
  return `${baseUrl}${endpoint}?${query}&signature=${signature}`;
}

export  function apiCall2(endpoint) {
  const baseUrl = 'https://testnet.binancefuture.com';
  const query = querystring.stringify(queryParams)
  return `${baseUrl}${endpoint}?${query}`;
}