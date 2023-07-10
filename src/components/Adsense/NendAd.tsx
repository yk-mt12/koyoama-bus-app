import { useEffect } from "react";

declare global {
  interface Window {
    nend_params: {
      media: number;
      site: number;
      spot: number;
      type: number;
      oriented: number;
    };
  }
}

const NendAd = () => {
  useEffect(() => {
    // スクリプトが既に読み込まれているかを確認
    if (document.getElementById("nendAdLoader")) return;

    // nend_params を設定
    window.nend_params = {
      media: 72599,
      site: 397027,
      spot: 1137350,
      type: 1,
      oriented: 1,
    };

    // スクリプトを作成
    const script = document.createElement("script");
    script.src = "https://js1.nend.net/js/nendAdLoader.js";
    script.async = true;
    script.id = "nendAdLoader"; // スクリプトを特定するためのIDを設定

    // スクリプトを body タグの最後に追加
    document.body.appendChild(script);

    // コンポーネントのアンマウント時にスクリプトを削除
    return () => {
      document.body.removeChild(script);
    };
  }, []); // 空の依存配列を指定して、この useEffect が一度だけ実行されるようにします

  return <div id="nend_ad"></div>; // ここに広告が表示されます
};

export default NendAd;
