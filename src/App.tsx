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
import News from "./components/News/index.tsx";
import AdmaxSwitch from "./components/Adsense/AdmaxSwitch.tsx";

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
    <main className="flex flex-col min-h-screen bg-bg-main font-sans mb-8">
      <Header />
      <section className="flex justify-center mt-2">
        <AdmaxSwitch id="1b962015b33aff100281e431257ec174" />
      </section>
      <article className="flex-grow px-4 mt-2">
        <News news={news || []} />
      </article>
      <nav className="py-1">
        <TabNavigation />
      </nav>
      <nav className="py-1 mt-1">
        <SubTabNavigation />
      </nav>
      <nav className="py-1 mt-1">
        <SegmentControl />
      </nav>
      <section className="flex-grow px-4 mt-2">
        {isLoading ? (
          <div className="flex justify-center items-center mt-20">
            <Loading />
          </div>
        ) : (
          <section className="mt-4">
            <TimeTable data={scheduleData} />
          </section>
        )}
      </section>
    </main>
  );
};

export default App;
