import './App.css';
import { TabNavigation } from './components/TabNavigation';
import SubTabNavigation from './components/SubTabNavigation';
import SegmentControl from './components/SegmentControl.tsx';
import TimeTable from './components/TimeTable/index.tsx';
import useSWR from 'swr';
import { Route, ScheduleData } from './types/content.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  activeTabState,
  selectedDirectionState,
  selectedRouteState,
  kamigamoToUniState,
  uniToKamigamoState,
  nikenchayaToUniState,
  uniToNikenchayaState,
} from './state/atoms.ts';
import { Header } from './components/Header/index.tsx';
import { useEffect, useState } from 'react';

// fetcher関数の作成
const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());

// ユーザー情報の取得
function useContent(selectedRoute: Route) {
  const { data, error } = useSWR(
    `https://sheets.googleapis.com/v4/spreadsheets/${import.meta.env.VITE_SPREADSHEET_ID}/values/${selectedRoute}?key=${import.meta.env.VITE_API_KEY}`,
    fetcher
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function App() {
  const activeTab = useRecoilValue(activeTabState);
  const selectedDirection = useRecoilValue(selectedDirectionState);

  const [selectedRoute, setSelectedRoute] = useRecoilState<Route>(selectedRouteState);
  const { data, isLoading } = useContent(selectedRoute);
  const formatedData = formatContents(data?.values);

  if (isLoading) return <div>loading...</div>;

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
        {isLoading && <div>loading...</div>}
        {data && <TimeTable data={formatedData} />}
      </div>
    </div>
  );
}

export default App;

function formatContents(rows: string[][]) {
  const days = ['月〜金（水曜日除く）', '水曜日', '土曜日'];
  const formattedRows: ScheduleData[] = [];

  let currentDay = '';
  for (let row of rows) {
    if (days.includes(row[0])) {
      currentDay = row[0];
      continue;
    }

    if (row.length > 0) {
      const [hour, ...minutes] = row;
      formattedRows.push({
        day: currentDay,
        hour: Number(hour),
        minutes: minutes
          .map(Number)
          .filter((minutes) => 0 <= minutes && minutes <= 59),
      });
    }
  }

  return formattedRows;
}
