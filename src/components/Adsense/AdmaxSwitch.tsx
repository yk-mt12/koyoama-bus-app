// インデックス式が型 'number' ではないため、要素に 'any' 型が暗黙的に指定されます。ts(7015)を無視
import { useEffect } from "react";

// windowオブジェクトに広告リストを追加
declare global {
  interface Window {
    admaxads?: AdmaxAdType[];
    __admax_tag__?: any;
  }
}

// 広告タイプの型
type AdmaxAdType = {
  admax_id: string; // 広告ID
  type: string; // PC/SP切替広告なら"switch"
};

// PC/SP切替広告のReactコンポーネント
const AdmaxSwitch: React.FC<{ id: string }> = (props) => {
  useEffect(() => {
    // windowオブジェクトの広告リストを初期化
    if (!window["admaxads"]) window["admaxads"] = [];
    // 広告リストを取得
    const admaxads: AdmaxAdType[] = window["admaxads"];
    // 広告リストになかったら追加
    if (!admaxads.some((ad) => ad.admax_id === props.id))
      admaxads.push({
        admax_id: props.id,
        type: "switch",
      });
    // 外部JSを読み込んで広告リストを実際に表示
    const tag = document.createElement("script");
    tag.src = "https://adm.shinobi.jp/st/t.js";
    tag.async = true;
    document.body.appendChild(tag);
    // アンマウント時にJSタグと広告情報を削除
    return () => {
      document.body.removeChild(tag);
      admaxads.splice(
        admaxads.findIndex((ad) => ad.admax_id === props.id),
        1
      );
      window["__admax_tag__"] = undefined;
    };
  }, []);
  return (
    <div
      className="admax-switch"
      data-admax-id={props.id}
      style={{ display: "inline-block" }}
    />
  );
};

export default AdmaxSwitch;
