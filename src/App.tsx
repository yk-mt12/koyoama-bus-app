import React from "react";

import { TabNavigation } from "./components/TabNavigation";
import SubTabNavigation from "./components/SubTabNavigation";
import SegmentControl from "./components/SegmentControl";
import TimeTable from "./components/TimeTable/";

import Header from "./components/Header/";
import formatContents from "./hooks/formatContents.ts";
import useContent from "./hooks/useContent.ts";
import Loading from "./components/Loading";
import { useRecoilValue } from "recoil";
import {
  activeTabState,
  scheduleTypeState,
  selectedDirectionState,
  selectedRouteState,
} from "./state/atoms.ts";

const App = () => {
  const activeTab = useRecoilValue(activeTabState);
  const selectedDirection = useRecoilValue(selectedDirectionState);
  const day = useRecoilValue(scheduleTypeState);
  const selectedRoute = useRecoilValue(selectedRouteState);

  const { data, isLoading } = useContent();
  const formatedData = data ? formatContents(data?.values) : [];

  // Filter data based on the provided day, activeTab, and selectedDirection
  const scheduleData = formatedData.filter((item: any) => {
    console.log(activeTab, selectedDirection, selectedRoute);
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

  return (
    <div className="flex flex-col min-h-screen">
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
    </div>
  );
};

export default App;
