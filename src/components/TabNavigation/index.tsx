
import { useRecoilState } from 'recoil';
import { activeTabState } from'../../state/atoms';

export const TabNavigation = () => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const handleTabChange = (label: '上賀茂神社' | '二軒茶屋') => {
    setActiveTab(label);
  };

  return (
  <nav className="flex space-x-4 justify-center items-center">
        <button
          className={`${
            activeTab === '上賀茂神社' 
              ? 'bg-blue-500 text-white'
              : 'text-blue-500 bg-white'
          } px-4 py-2 rounded-md text-sm font-medium`}
          onClick={() => handleTabChange('上賀茂神社')}
        >
          上賀茂神社
        </button>
        <button
          className={`${
            activeTab === '二軒茶屋' 
              ? 'bg-blue-500 text-white'
              : 'text-blue-500 bg-white'
          } px-4 py-2 rounded-md text-sm font-medium`}
          onClick={() => handleTabChange('二軒茶屋')}
        >
          二軒茶屋 
        </button>

    </nav>
  );
};
