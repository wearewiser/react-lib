"use client";

import styles from "./Carousel.module.scss";
import { FC, JSX } from "react";
import classNames from "classnames";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css/core";
import Cta from "@/ui/components/atoms/Cta/Cta";
import SvgArrowRight from "@/ui/components/atoms/Svg/SvgArrowRight";
import HorizontalWheel from "@/utils/splide/horizontal-wheel";

export interface CarouselProps {
  splideRef?: any;
  className?: string;
  ariaLabel?: string;
  slides: JSX.Element[];
  options?: Record<string, any>;
}

const Carousel: FC<CarouselProps> = ({
  splideRef,
  className = "",
  ariaLabel,
  slides,
  options = {},
}) => {
  const defaultOptions = {
    arrows: true,
    autoHeight: true,
    autoWidth: true,
    gap: 12,
    keyboard: true,
    pagination: true,
    updateOnMove: true,
    wheelMinThreshold: 10,
    wheelSleep: 350,
  };

  return (
    <Splide
      ref={splideRef}
      className={classNames(className, styles.carousel)}
      hasTrack={false}
      aria-label={ariaLabel}
      options={{ ...defaultOptions, ...options }}
      extensions={{ HorizontalWheel }}
    >
      <div className={styles.carouselGrid}>
        <SplideTrack>
          {slides.map((slide, index) => {
            return <SplideSlide key={index}>{slide}</SplideSlide>;
          })}
        </SplideTrack>

        <div className="splide__arrows">
          <div className="splide__arrow__wrapper splide__arrow__wrapper--prev">
            <Cta className="splide__arrow splide__arrow--prev" variant="icon">
              <SvgArrowRight />
            </Cta>
          </div>
          <div className="splide__arrow__wrapper splide__arrow__wrapper--next">
            <Cta className="splide__arrow splide__arrow--next" variant="icon">
              <SvgArrowRight />
            </Cta>
          </div>
        </div>
      </div>

      <ul className="splide__pagination"></ul>
    </Splide>
  );
};

export default Carousel;
