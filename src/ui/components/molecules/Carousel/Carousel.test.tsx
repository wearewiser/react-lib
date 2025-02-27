import { render } from "@testing-library/react";
import Carousel from "./Carousel";

const generateSlides = (numOfSlides: number) => {
  return Array.from({ length: numOfSlides }, (_, i) => {
    return <div>{`Slide ${i + 1}`}</div>;
  });
};

describe(Carousel, () => {
  it("should render correct number of slides", () => {
    const { queryAllByRole } = render(<Carousel slides={generateSlides(3)} />);
    const slides = queryAllByRole("tabpanel");
    expect(slides).toHaveLength(3);
  });
});
