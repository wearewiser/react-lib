import { render } from "@testing-library/react";
import NextImage, { NextImageProps } from "./NextImage";

describe("NextImage", () => {
  it("should render an image ", () => {
    const dummyData: NextImageProps = {
      image: {
        url: "/wiser.svg",
        alt: "wiser logo",
        height: 100,
        width: 100,
      },
    };
    const { getByRole } = render(<NextImage {...dummyData} />);
    const imageElement = getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", dummyData.image.url);
    expect(imageElement).toHaveAttribute("alt", dummyData.image.alt);
  });

  it("should render an image with original image width and image height if width, height and fill are not specified", () => {
    const dummyData: NextImageProps = {
      image: {
        url: "/wiser.svg",
        alt: "wiser logo",
        height: 100,
        width: 100,
      },
    };
    const { getByRole } = render(<NextImage {...dummyData} />);
    const imageElement = getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("width", `${dummyData.image.width}`);
    expect(imageElement).toHaveAttribute("height", `${dummyData.image.height}`);
  });

  it("should render an image with specified width and height if they are passed in as attributes", () => {
    const dummyData: NextImageProps = {
      image: {
        url: "/wiser.svg",
        alt: "wiser logo",
        height: 100,
        width: 100,
      },
      width: 25,
      height: 50,
    };
    const { getByRole } = render(<NextImage {...dummyData} />);
    const imageElement = getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("width", `${dummyData.width}`);
    expect(imageElement).toHaveAttribute("height", `${dummyData.height}`);
  });

  it("should render an image with width and height of parent wrapper when 'fill' is specified", () => {
    const dummyData: NextImageProps = {
      image: {
        url: "/wiser.svg",
        alt: "wiser logo",
        height: 100,
        width: 100,
      },
      fill: true,
    };
    const { getByRole } = render(
      <div style={{ width: "25px", height: "50px" }}>
        <NextImage {...dummyData} />
      </div>
    );
    const imageElement = getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(getComputedStyle(imageElement).width).toBe("100%");
    expect(getComputedStyle(imageElement).height).toBe("100%");
    expect(
      getComputedStyle(imageElement.parentElement!.parentElement!).width
    ).toBe("25px");
    expect(
      getComputedStyle(imageElement.parentElement!.parentElement!).height
    ).toBe("50px");
  });
});
