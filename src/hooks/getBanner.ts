import client from "./client";

const getBanner = async () => {
  const banner = await client.get({ endpoint: "banner" });
  return banner;
};

export default getBanner;
