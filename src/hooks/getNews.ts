import client from "./client";

const getNews = async () => {
  const news = await client.get({ endpoint: "news" });
  return news;
};

export default getNews;
