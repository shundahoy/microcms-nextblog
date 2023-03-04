// libs/client.js
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.DOMAIN,
  apiKey: process.env.API_KEY,
});
