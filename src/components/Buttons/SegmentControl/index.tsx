// src/components/SegmentControl.tsx
import { useRecoilState } from "recoil";
import { scheduleTypeState } from "../../../state/atoms";
import { ScheduleValueType } from "../../../types/content";

export const SegmentControl = () => {
  const [scheduleType, setScheduleType] = useRecoilState(scheduleTypeState);

  const scheduleTypes: ScheduleValueType = [
    { id: "月〜金（水曜日除く）", label: "月〜金（水曜日除く）" },
    { id: "水曜日", label: "水曜日" },
    { id: "土曜日", label: "土曜日" },
  ];

  return (
    <div className="flex justify-center space-x-4 text-xs sm:text-base">
      {scheduleTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => setScheduleType(type.id)}
          className={`px-4 py-3 sm:py-2 rounded-lg font-semibold ${
            scheduleType === type.id
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentControl;
