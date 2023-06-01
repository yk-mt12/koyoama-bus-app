import {
  activeTabState,
  scheduleTypeState,
  selectedDirectionState,
  selectedRouteState,
} from "../../state/atoms";
import React from "react";
import { useRecoilValue } from "recoil";

import { ScheduleData } from "../../types/content";

type TimeTableProps = {
  data: ScheduleData[];
};

const TimeTable: React.FC<TimeTableProps> = ({ data }) => {
  const selectedRoute = useRecoilValue(selectedRouteState);
  const day = useRecoilValue(scheduleTypeState);
  const activeTab = useRecoilValue(activeTabState);
  const selectedDirection = useRecoilValue(selectedDirectionState);

  // Filter data based on the provided day, activeTab, and selectedDirection
  const scheduleData = data.filter((item: any) => {
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

  if (!scheduleData || scheduleData.length === 0) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex justify-center items-center">
        <div className="p-8">
          <div className="">
            <h2>{selectedRoute}</h2>
          </div>
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            <h2>{day}</h2>
          </div>
          {scheduleData &&
            scheduleData.map((item: any, index: number) => {
              return (
                <div key={index} className="mt-1 text-gray-500 text-sm">
                  <h3 className="block mt-1 text-lg leading-tight font-medium text-black">
                    {item.hour}時
                  </h3>
                  <p>{item.minutes.join(", ")}</p>
                  <div className="border-t border-gray-200 mt-1"></div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
