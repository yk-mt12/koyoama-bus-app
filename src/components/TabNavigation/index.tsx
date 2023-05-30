'use client'
import { useRecoilState } from 'recoil';
import { activeTabState } from '@/state/atoms';
import { useState } from 'react';

interface Tab {
  id: number;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const [state, setState] = useState(0);
  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
    console.log(activeTab);
  };

  const handleOnChange = () => {
    console.log('hello');
  };

  return (
    <nav className="flex space-x-4">
      {activeTab}
      {state}
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === tabs[0].id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          } hover:bg-blue-500 hover:text-white`}
          // onClick={() => handleTabChange(tabs[0].id)}
          onClick={() => handleOnChange()}
        >
          {tabs[0].label}
        </button>

        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === tabs[1].id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          } hover:bg-blue-500 hover:text-white`}
          // onClick={() => handleTabChange(tabs[1].id)}
          onClick={() => handleOnChange()}


        >
          {tabs[1].label}
        </button>
    </nav>
  );
};
