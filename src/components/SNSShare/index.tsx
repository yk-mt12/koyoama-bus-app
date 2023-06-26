import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LineIcon,
  LineShareButton,
} from "react-share";

const SNSShare = () => {
  const url = "https://kyoto-su-bus.vercel.app/";
  const title =
    "京都産業大学 神山シャトルン 上賀茂シャトルバス・二軒茶屋シャトルバス時刻表";
  const iconSize = 45;

  return (
    // コンポーネントを中央揃えにする
    <div className="space-x-4">
      <FacebookShareButton url={url} title={title}>
        <FacebookIcon size={iconSize} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        title={title}
        via="kyosan_bus"
        related={["kyosan_bus"]}
        hashtags={["京都産業大学", "京産", "神山シャトルン"]}
      >
        <TwitterIcon size={iconSize} round />
      </TwitterShareButton>
      <LineShareButton title={title} url={url}>
        <LineIcon size={iconSize} round />
      </LineShareButton>
    </div>
  );
};

export default SNSShare;
