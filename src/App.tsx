import { useRecoilValue } from "recoil";
import ReactGA from "react-ga4";
import { useEffect, useState } from "react";

// global state
import {
  activeTabState,
  scheduleTypeState,
  selectedDirectionState,
  selectedRouteState,
} from "./state/atoms.ts";

// component
import { TabNavigation } from "./components/Buttons/TabNavigation";
import SubTabNavigation from "./components/Buttons/SubTabNavigation";
import SegmentControl from "./components/Buttons/SegmentControl/index.tsx";
import TimeTable from "./components/TimeTable/";
import Header from "./components/Header/";
import Loading from "./components/Loading";
import Adsense from "./components/Adsense";
import News from "./components/News/index.tsx";

// hooks
import formatContents from "./hooks/formatContents.ts";
import useContent from "./hooks/useContent.ts";
import { NewsItem } from "./types/news.ts";
import getNews from "./hooks/client.ts";

const App = () => {
  // ローカルステート
  const [news, setNews] = useState<NewsItem[] | undefined>(undefined);

  // グローバルステート
  const activeTab = useRecoilValue(activeTabState);
  const selectedDirection = useRecoilValue(selectedDirectionState);
  const day = useRecoilValue(scheduleTypeState);
  const selectedRoute = useRecoilValue(selectedRouteState);

  // データ取得
  const { data, isLoading } = useContent();
  const formatedData = data ? formatContents(data?.values) : [];

  // Filter data based on the provided day, activeTab, and selectedDirection
  const scheduleData = formatedData.filter((item: any) => {
    return (
      item.day === day &&
      item.route === selectedRoute &&
      ((activeTab === "上賀茂神社" &&
        selectedDirection === "going" &&
        item.route === "上賀茂神社→大学") ||
        (activeTab === "上賀茂神社" &&
          selectedDirection === "returning" &&
          item.route === "大学→上賀茂神社") ||
        (activeTab === "二軒茶屋" &&
          selectedDirection === "going" &&
          item.route === "二軒茶屋→大学") ||
        (activeTab === "二軒茶屋" &&
          selectedDirection === "returning" &&
          item.route === "大学→二軒茶屋"))
    );
  });

  useEffect(() => {
    getNews().then((data: any) => {
      setNews(data.contents);
    });
  }, []);

  useEffect(() => {
    // Google Analytics 測定 ID を入力して設定
    ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);

    // ページビューイベントを処理
    ReactGA.send({
      hitType: "pageview",
      // アクセスしたパス (pathname) とクエリ文字列 (search) を送付する (必要に応じて編集する)
      page: location.pathname + location.search,
    });
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-bg-main">
      <Adsense />
      <Header />
      <News news={news || []} />
      <div className="flex-grow px-4 mt-2">
        <TabNavigation />
        <div className="p-1 mt-2">
          <SubTabNavigation />
        </div>
        <div className="p-1 mt-2">
          <SegmentControl />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center mt-20">
            <Loading />
          </div>
        ) : (
          <div className="mt-4">
            <TimeTable data={scheduleData} />
          </div>
        )}
      </div>
      <div className="mt-4">
        <Adsense />
      </div>
    </div>
  );
};

export default App;
