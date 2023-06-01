import { ScheduleData, Route } from "../types/content";

function formatContents(rows: string[][]) {
  const days = ["月〜金（水曜日除く）", "水曜日", "土曜日"];
  const route = [
    "上賀茂神社→大学",
    "大学→上賀茂神社",
    "二軒茶屋→大学",
    "大学→二軒茶屋",
  ];
  const formattedRows: ScheduleData[] = [];

  let currentDay = "";
  let beforeRoute = "";
  let currentRoute = "";

  for (const row of rows) {
    if (days.includes(row[0])) {
      currentDay = row[0];
      continue;
    }

    if (route.includes(row[0])) {
      currentRoute = row[0];
      beforeRoute = currentRoute;
      continue;
    } else if (
      !isNaN(Number(row[0])) ||
      row[0] === undefined ||
      row[0] === "読み込んでいます..."
    ) {
      currentRoute = beforeRoute;
    }

    if (row.length > 0) {
      const [hour, ...minutes] = row;
      // Check if hour can be converted to a number
      const hourNumber = Number(hour);
      if (!isNaN(hourNumber)) {
        formattedRows.push({
          day: currentDay,
          hour: hourNumber,
          route: currentRoute as Route,
          minutes: minutes
            .map(Number)
            .filter((minutes) => 0 <= minutes && minutes <= 59),
        });
      }
    }
  }

  console.log(formattedRows);
  return formattedRows;
}

export default formatContents;
