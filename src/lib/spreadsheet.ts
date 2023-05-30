import { GoogleApis, google } from 'googleapis';
import {ScheduleData} from '@/lib/types/content';

const getSheets = () => {
  const googleapis = new GoogleApis();
  const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
  const jwt = new googleapis.auth.JWT(
    process.env.GCP_SERVICEACCOUNT_EMAIL,
    undefined,
    (process.env.GCP_SERVICEACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes
  );
  return google.sheets({ version: 'v4', auth: jwt });
};

const formatContents = (rows: string[][]): ScheduleData => {
  const days = ["月〜金（水曜日除く）", "水曜日", "土曜日"];
  const formattedRows: ScheduleData = [];

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

export const getContents = async (range: string): Promise<ScheduleData> => {
  const sheets = getSheets();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: range,
  });

  if(!response.data.values) throw new Error('No data found.');

  const rows = response.data.values;

  if (rows.length === 0) {
    return [];
  }

  console.log(formatContents(rows));
  return formatContents(rows);
};
