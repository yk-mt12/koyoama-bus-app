import { useState } from 'react'
import './App.css'
import { TabNavigation } from './components/TabNavigation'
import SubTabNavigation from './components/SubTabNavigation'
import SegmentControl from './components/SegmentControl.tsx'
import TimeTable from './components/TimeTable/index.tsx'

function App() {
  const [data, setData] = useState([ ])


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
        <TimeTable data={data} />
    </>
  )
}

export default App
