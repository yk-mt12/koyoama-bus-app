import { TabNavigation } from "./components/TabNavigation";
import SubTabNavigation from "./components/SubTabNavigation";
import SegmentControl from "./components/SegmentControl";
import TimeTable from "./components/TimeTable/";

import Header from "./components/Header/";
import formatContents from "./hooks/formatContents.ts";
import useContent from "./hooks/useContent.ts";
import Loading from "./components/Loading";
import { useRecoilValue } from "recoil";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import {
  activeTabState,
  scheduleTypeState,
  selectedDirectionState,
  selectedRouteState,
} from "./state/atoms.ts";
import Adsense from "./components/Adsense/index.tsx";

const App = () => {
  const activeTab = useRecoilValue(activeTabState);
  const selectedDirection = useRecoilValue(selectedDirectionState);
  const day = useRecoilValue(scheduleTypeState);
  const selectedRoute = useRecoilValue(selectedRouteState);

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
    <div className="flex flex-col min-h-screen">
      <Adsense />
      <Header />
      <div className="flex-grow p-4 mt-2">
        <TabNavigation />
        <div className="p-1 mt-2">
          <SubTabNavigation />
        </div>
        <div className="p-1">
          <SegmentControl />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center mt-20">
            <Loading />
          </div>
        ) : (
          <TimeTable data={scheduleData} />
        )}
      </div>
      <div className="mt-4">
        <Adsense />
      </div>
    </div>
  );
};

export default App;
