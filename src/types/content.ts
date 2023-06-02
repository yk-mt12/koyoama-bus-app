export type DayOfWeek = "月〜金（水曜日除く）" | "水曜日" | "土曜日";

export type BusStop = "上賀茂神社" | "二軒茶屋" | "大学";

export type Route =
  | "上賀茂神社→大学"
  | "大学→上賀茂神社"
  | "二軒茶屋→大学"
  | "大学→二軒茶屋";

export type IsGoing = "going" | "returning";

export type ScheduleData = {
  route: string;
  day: string;
  hour: number;
  minutes: number[];
}[];

export type TimeTableProps = {
  data: ScheduleData;
};

export type ScheduleValueType = {
  id: DayOfWeek;
  label: DayOfWeek;
}[];
