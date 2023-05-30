import { scheduleTypeState } from '../../state/atoms';
import React from 'react';
import { useRecoilValue } from 'recoil';

interface TimeTableProps {
  data: any;
}

const TimeTable: React.FC<TimeTableProps> = ({ data }) => {
  const day = useRecoilValue(scheduleTypeState);
  // Filter data based on the provided day
  const scheduleData = data.filter((item: any) => item.day === day);
  if(!scheduleData || scheduleData.length === 0) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{day}</div>
          {scheduleData.map((item: any, index: number) => {
            return (
              <div key={index} className="mt-1 text-gray-500 text-sm">
                <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{item.hour}時</h2>
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
