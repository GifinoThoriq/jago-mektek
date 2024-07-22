import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "../ui/EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "../ui/EmblaCarouseArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { SumberMateriClientTypes } from "../types/ClientTypes";
import Image from "next/image";
import Link from "next/link";

type PropType = {
  slides: SumberMateriClientTypes[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla" dir="rtl">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div key={slide._id} className="embla__slide">
              <Link
                href={slide.link}
                className="flex flex-col items-center"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="relative w-full h-64 hover:scale-110 transition-transform">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="text-base md:text-lg text-blue-dark font-medium text-center mt-4 cursor-pointer">
                  {slide.title}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        {/* turn off carousel dot */}
        {/* <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default EmblaCarousel;
