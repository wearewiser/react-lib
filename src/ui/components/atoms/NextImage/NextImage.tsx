import styles from "./NextImage.module.scss";
import { ImageDTO } from "@/models/image-dto";
import classNames from "classnames";
import Image from "next/image";
import { CSSProperties, FC } from "react";

export interface NextImageProps {
  className?: string;
  image: ImageDTO;
  width?: number;
  height?: number;
  fill?: boolean;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  objectPosition?: string;
  style?: CSSProperties;
  priority?: boolean;
}

const NextImage: FC<NextImageProps> = ({
  className = "",
  image,
  width,
  height,
  fill,
  objectFit,
  objectPosition,
  style = {},
  priority,
}) => {
  const fx = image.focalX ? image.focalX : 50;
  const fy = image.focalY ? image.focalY : 50;

  return (
    <div
      className={classNames(className, styles.imageWrapper, {
        [styles.noFill]: !fill,
      })}
    >
      <Image
        src={image.url}
        alt={image.alt}
        width={!fill ? (width ? width : image.width) : undefined}
        height={!fill ? (height ? height : image.height) : undefined}
        fill={fill}
        style={{
          objectFit: objectFit,
          objectPosition: objectPosition ? objectPosition : `${fx}% ${fy}%`,
          ...style,
        }}
        priority={priority}
        // onLoad={() => {
        //   ScrollTrigger.refresh();
        // }}
      />
    </div>
  );
};

export default NextImage;
