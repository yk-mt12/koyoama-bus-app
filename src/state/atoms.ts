import { BusStop, DayOfWeek, Route, IsGoing } from "../types/content";
import { atom } from "recoil";

export const selectedBusStopState = atom<BusStop>({
  key: "selectedBusStopState",
  default: "上賀茂神社", // 初期値は空文字列
});

export const selectedDirectionState = atom<IsGoing>({
  key: "selectedDirectionState",
  default: "going", // 初期値は'going'
});

// 行き→goingの場合は、上賀茂神社→大学
// 帰り→returningの場合は、大学→上賀茂神社
export const selectedRouteState = atom<Route>({
  key: "selectedRouteState",
  default: "上賀茂神社→大学", // 初期値は'上賀茂神社→大学'
});

export const activeTabState = atom<BusStop>({
  key: "activeTabState",
  default: "上賀茂神社", // 初期値は空文字列
});

export const scheduleTypeState = atom<DayOfWeek>({
  key: "scheduleTypeState", // unique ID (with respect to other atoms/selectors)
  default: "月〜金（水曜日除く）", // default value (aka initial value)
});
