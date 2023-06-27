import { LineIcon } from "react-share";

const Header = () => {
  return (
    <header className="bg-white shadow flex items-center pr-4">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900">
          京都産業大学 神山シャトルン
        </h1>
        <h2 className="text-xs md:text-lg text-gray-500 mt-1">
          上賀茂シャトルバス・二軒茶屋シャトルバス時刻表
        </h2>
      </div>
      <a href="https://lin.ee/oWjPFcc">
        <LineIcon borderRadius={12} size={42} />
      </a>
    </header>
  );
};

export default Header;
