import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMEIN, // service-domain は XXXX.microcms.io の XXXX 部分
  apiKey: import.meta.env.VITE_MICROCMS_API_KEY, // api-key
});

export default client;
