import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeTabState,
  selectedDirectionState,
  selectedRouteState,
} from "../../../state/atoms";

export const TabNavigation = () => {
  const selectedDirection = useRecoilValue(selectedDirectionState);
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const setSelectedRoute = useSetRecoilState(selectedRouteState);

  const handleTabChange = (label: "上賀茂神社" | "二軒茶屋") => {
    if (label === "上賀茂神社" && selectedDirection === "going") {
      setActiveTab("上賀茂神社");
      setSelectedRoute("上賀茂神社→大学");
    } else if (label === "上賀茂神社" && selectedDirection === "returning") {
      setActiveTab("上賀茂神社");
      setSelectedRoute("大学→上賀茂神社");
    } else if (label === "二軒茶屋" && selectedDirection === "going") {
      setActiveTab("二軒茶屋");
      setSelectedRoute("二軒茶屋→大学");
    } else if (label === "二軒茶屋" && selectedDirection === "returning") {
      setActiveTab("二軒茶屋");
      setSelectedRoute("大学→二軒茶屋");
    }
  };

  return (
    <nav className="flex space-x-4 justify-center items-center text-xs sm:text-base">
      <button
        className={`${
          activeTab === "上賀茂神社"
            ? "bg-blue-500 text-white"
            : "text-blue-500 bg-white"
        } px-4 py-3 sm:py-2 rounded-lg font-semibold`}
        onClick={() => handleTabChange("上賀茂神社")}
      >
        上賀茂神社
      </button>
      <button
        className={`${
          activeTab === "二軒茶屋"
            ? "bg-blue-500 text-white"
            : "text-blue-500 bg-white"
        } px-4 py-3 sm:py-2 rounded-lg font-semibold`}
        onClick={() => handleTabChange("二軒茶屋")}
      >
        二軒茶屋
      </button>
    </nav>
  );
};
