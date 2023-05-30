import './App.css'
import { TabNavigation } from './components/TabNavigation'
import SubTabNavigation from './components/SubTabNavigation'
import SegmentControl from './components/SegmentControl.tsx'
import TimeTable from './components/TimeTable/index.tsx'
import useSWR from 'swr'
import { ScheduleData } from './lib/types/content.ts'

//fetcher関数の作成
const fetcher = url => fetch(url).then(r => r.json())

//ユーザー情報の取得
function useContent () {
  const { data, error } =  useSWR(`https://sheets.googleapis.com/v4/spreadsheets/${import.meta.env.VITE_SPREADSHEET_ID}/values/上賀茂神社→大学?key=${import.meta.env.VITE_API_KEY}`, fetcher)
  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

function App() {
  const { data, isLoading } = useContent()

  if (isLoading) return <div>loading...</div>
  
  
  const formattedData = data ?  formatContents(data.values) : [];
  console.log('整形したデータ', formattedData);
  return (
    <>
       <TabNavigation tabs={
          [
            {
            id: 1,
            label: "上賀茂神社",
            },
            {
              id: 2,
              label: "二軒茶屋",
            }
          ]
        } />
        <SubTabNavigation />
        <SegmentControl />
        {isLoading && <div>loading...</div>}
        {data && <TimeTable data={formattedData} />}
    </>
  )
}

export default App

function formatContents(rows: string[][]) {
  const days = ["月〜金（水曜日除く）", "水曜日", "土曜日"];
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
        minutes: minutes.map(Number).filter(minutes =>
          0 <= minutes && minutes <= 59
          ),
      });
    }
  }

  return formattedRows;
};
