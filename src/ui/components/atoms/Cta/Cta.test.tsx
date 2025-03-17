import { fireEvent, render, screen } from "@testing-library/react";
import Cta, { CtaProps } from "./Cta";

const dummyData: CtaProps = {
  variant: "primary",
};

describe(Cta, () => {
  it("should render a button element if no href is specified", () => {
    const { getByRole } = render(<Cta {...dummyData} />);
    const cta = getByRole("button");
    expect(cta).toBeInTheDocument();
  });

  it("should render a Link element if a href is specified", () => {
    const { getByRole } = render(
      <Cta href="https://www.google.com" {...dummyData} />
    );
    const cta = getByRole("link");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "https://www.google.com");
  });

  it("should render the correct children text", () => {
    render(<Cta {...dummyData}>Submit</Cta>);
    render(
      <Cta href="www.google.com" {...dummyData}>
        Submit
      </Cta>
    );
    const button = screen.getByRole("button");
    const link = screen.getByRole("link");
    // Check if the button contains the correct text
    expect(button).toHaveTextContent("Submit");
    expect(link).toHaveTextContent("Submit");
  });

  it("should call the onClick callback when clicked", () => {
    const handleClick = jest.fn(); // Mock function
    render(<Cta onClick={handleClick} {...dummyData} />);
    render(<Cta href="www.google.com" onClick={handleClick} {...dummyData} />);
    const button = screen.getByRole("button");
    const link = screen.getByRole("link");
    fireEvent.click(button);
    fireEvent.click(link);
    // Expect the mock function to have been called twice
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  // it("should not display if isHidden property is set to true", () => {
  //   render(<Cta isHidden {...dummyData} />);
  //   render(<Cta isHidden href="www.google.com" {...dummyData} />);
  //   const button = screen.queryByRole("button");
  //   const link = screen.queryByRole("link");
  //   expect(button).toHaveClass("hidden");
  //   expect(link).toHaveClass("hidden");
  // });
});
