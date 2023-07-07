import { useState, useEffect } from "react";
import { BannerItem } from "../../types/banner";

type Props = {
  banners: BannerItem[];
};

const Banner = ({ banners }: Props) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // バナーが自動的に切り替わる間隔

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className="">
      {banners.map((banner, index) => (
        <div
          key={index}
          style={{ display: index === currentAdIndex ? "block" : "none" }} //現在のバナーのみ表示
          // バナー広告が切り替わる際にフェードイン・フェードアウト
          className={` w-full h-full transition-opacity duration-2000 ease-in-out ${
            index === currentAdIndex
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          {/* <!-- banner - start --> */}
          <div className="mx-auto max-w-screen-2xl">
            <div className="relative flex flex-wrap sm:flex-nowrap sm:items-center justify-center hover:">
              <a href={banner.url}>
                <img
                  src={banner.image.url}
                  alt={banner.alt}
                  className="w-full"
                />
              </a>
            </div>
          </div>
          {/* <!-- banner - end --> */}
        </div>
      ))}
    </div>
  );
};

export default Banner;
