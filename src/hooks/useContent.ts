import useSWR from "swr";

// fetcher関数の作成
const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());

// ユーザー情報の取得
function useContent() {
  const { data, error } = useSWR(
    `https://sheets.googleapis.com/v4/spreadsheets/${
      import.meta.env.VITE_SPREADSHEET_ID
    }/values/all?key=${import.meta.env.VITE_API_KEY}`,
    fetcher
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useContent;
