interface Image {
  url: string;
  height: number;
  width: number;
}

export interface BannerItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  image: Image;
  url: string;
  alt: string;
  description: string;
}
