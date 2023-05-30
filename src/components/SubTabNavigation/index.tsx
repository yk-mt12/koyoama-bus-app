
import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedDirectionState } from '../../state/atoms';

const SubTabNavigation: React.FC = () => {
  const [selectedDirection, setSelectedDirection] = useRecoilState(selectedDirectionState);

  const handleDirectionChange = (direction: 'going' | 'returning') => {
    setSelectedDirection(direction);
  };

  return (
    <div className="flex justify-center space-x-4">
      <button
        className={`py-2 px-4 rounded-md ${
          selectedDirection === 'going' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => handleDirectionChange('going')}
      >
        行き
      </button>
      <button
        className={`py-2 px-4 rounded-md ${
          selectedDirection === 'returning' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => handleDirectionChange('returning')}
      >
        帰り
      </button>
    </div>
  );
};

export default SubTabNavigation;
