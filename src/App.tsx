import "./App.css";

import { TabNavigation } from "./components/TabNavigation";
import SubTabNavigation from "./components/SubTabNavigation";
import SegmentControl from "./components/SegmentControl.tsx";
import TimeTable from "./components/TimeTable/index.tsx";

import { Header } from "./components/Header/index.tsx";
import formatContents from "./hooks/formatContents.ts";
import useContent from "./hooks/useContent.ts";
import Loading from "./components/Loading/index.tsx";

function App() {
  const { data, isLoading } = useContent();
  const formatedData = data ? formatContents(data?.values) : [];
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
          <TimeTable data={formatedData} />
        )}
      </div>
    </div>
  );
}

export default App;
