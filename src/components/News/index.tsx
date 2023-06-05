import { memo } from "react";
import { NewsItem } from "../../types/news";

type Props = {
  news: NewsItem[];
};

const News: React.FC<Props> = ({ news }) => {
  return (
    <div className="flex flex-col items-center">
      {news.map((item: NewsItem) => (
        <div
          key={item.id}
          className="rounded-lg shadow p-4 my-4 max-w-full bg-bg-card md:max-w-full"
        >
          <h2
            className={`text-lg font-bold mb-2 ${getCategoryColor(
              item.category.name
            )}`}
          >
            {item.category.name}
          </h2>
          <h3 className="text-base font-semibold mb-1">{item.title}</h3>
          {item.content1 && (
            <p
              className={`text-sm text-gray-700 transition-colors duration-300 hover:text-blue-500`}
              dangerouslySetInnerHTML={{ __html: item.content1 }}
            />
          )}
          {item.content2 && (
            <p
              className={`text-sm text-gray-700 transition-colors duration-300 hover:text-blue-500`}
              dangerouslySetInnerHTML={{ __html: item.content2 }}
            />
          )}
          {item.content3 && (
            <p
              className={`text-sm text-gray-700 transition-colors duration-300 hover:text-blue-500 `}
              dangerouslySetInnerHTML={{ __html: item.content3 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// バックグラウンドカラーを取得するヘルパー関数
const getCategoryColor = (category: string) => {
  if (category === "Info") {
    return "text-red-500";
  } else if (category === "Update") {
    return "text-green-500";
  }
  return "text-black-500";
};

export default memo(News);
