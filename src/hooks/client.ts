import { createClient } from "microcms-js-sdk";

const getNews = async () => {
  const client = createClient({
    serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMEIN, // service-domain は XXXX.microcms.io の XXXX 部分
    apiKey: import.meta.env.VITE_MICROCMS_API_KEY, // api-key
  });

  const news = await client.get({ endpoint: "news" });
  return news;
};

export default getNews;
