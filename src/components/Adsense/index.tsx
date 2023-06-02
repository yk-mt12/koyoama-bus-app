import { useEffect } from "react";

const hostname = import.meta.env.VITE_PRODUCTION_HOST; //本番サイトのホスト名

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    adsbygoogle: any;
  }
}

const Adsense = () => {
  useEffect(() => {
    if (window.location.hostname == hostname) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div>
      {window.location.hostname == hostname && (
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
          data-ad-slot={import.meta.env.VITE_ADSENSE_DIRECT}
        ></ins>
      )}
    </div>
  );
};

export default Adsense;
