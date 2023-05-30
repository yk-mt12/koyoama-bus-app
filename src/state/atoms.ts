
import { DayOfWeek } from '@/lib/types/content';
import { atom, selector, RecoilValueReadOnly } from 'recoil';

export const selectedBusStopState = atom<string>({
  key: 'selectedBusStopState',
  default: '', // 初期値は空文字列
});

export const selectedDirectionState = atom<'going' | 'returning'>({
    key: 'selectedDirectionState',
    default: 'going', // 初期値は'going'
  });

  export const activeTabState = atom<number>({
    key: 'activeTabState',
    default: 1, // 初期値は空文字列
  });

  export const scheduleTypeState = atom<DayOfWeek>({
    key: 'scheduleTypeState', // unique ID (with respect to other atoms/selectors)
    default: '月〜金（水曜日除く）', // default value (aka initial value)
  });

export const kamigamoToUniState = atom({
  key: 'kamigamoToUniState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const uniToKamigamoState = atom({
  key: 'uniToKamigamoState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const nikenToUniState = atom({
  key: 'nikenToUniState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const uniToNikenState = atom({
  key: 'uniToNikenState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});