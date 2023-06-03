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
          data-ad-client="ca-pub-1360067821500263"
          data-ad-slot=""
        ></ins>
      )}
    </div>
  );
};

export default Adsense;
