export interface ImageDTO {
  // id: string;
  alt: string;
  // filename: string;
  // mimeType: string;
  // filesize: number;
  width: number;
  height: number;
  focalX?: number;
  focalY?: number;
  sizes?: {
    [key: string]: ResizedImage;
  };
  // createdAt: string;
  // updatedAt: string;
  url: string;
  // thumbnailURL: string;
}

export interface ResizedImage {
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
  url: string;
}
