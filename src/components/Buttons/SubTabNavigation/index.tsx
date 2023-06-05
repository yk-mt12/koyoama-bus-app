import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeTabState,
  selectedDirectionState,
  selectedRouteState,
} from "../../../state/atoms";
import { IsGoing } from "../../../types/content";

const SubTabNavigation: React.FC = () => {
  const [selectedDirection, setSelectedDirection] = useRecoilState(
    selectedDirectionState
  );
  const activeTab = useRecoilValue(activeTabState);
  const setSelectedRoute = useSetRecoilState(selectedRouteState);

  const handleDirectionChange = (direction: IsGoing) => {
    if (direction === "going" && activeTab === "上賀茂神社") {
      setSelectedDirection("going");
      setSelectedRoute("上賀茂神社→大学");
    } else if (direction === "returning" && activeTab === "上賀茂神社") {
      setSelectedDirection("returning");
      setSelectedRoute("大学→上賀茂神社");
    } else if (direction === "going" && activeTab === "二軒茶屋") {
      setSelectedDirection("going");
      setSelectedRoute("二軒茶屋→大学");
    } else if (direction === "returning" && activeTab === "二軒茶屋") {
      setSelectedDirection("returning");
      setSelectedRoute("大学→二軒茶屋");
    }
  };

  return (
    <div className="flex justify-center space-x-4 text-xs sm:text-base">
      <button
        className={`py-3 sm:py-2 px-6 rounded-lg font-medium  ${
          selectedDirection === "going"
            ? "bg-blue-500 text-white"
            : "bg-white text-blue-500"
        }`}
        onClick={() => handleDirectionChange("going")}
      >
        行き
      </button>
      <button
        className={`py-3 sm:py-2 px-6 rounded-lg font-medium ${
          selectedDirection === "returning"
            ? "bg-blue-500 text-white"
            : "bg-white text-blue-500"
        }`}
        onClick={() => handleDirectionChange("returning")}
      >
        帰り
      </button>
    </div>
  );
};

export default SubTabNavigation;
