import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import Header, { HeaderProps } from "./Header";

describe("Header", () => {
  it("should render hello", () => {
    const dummyData: HeaderProps = {
      user: { email: "john.fedoruk@wearewiser.com", name: "John", id: 0},
    };
    const { baseElement } = render(<Header {...dummyData} />);
    expect(baseElement).toBeInTheDocument();
    expect(baseElement).toHaveTextContent("Hello");
  });
  it("should render user's name", () => {
    const dummyData: HeaderProps = {
      user: { email: "john.fedoruk@wearewiser.com", name: "John", id: 0},
    };
    const { baseElement } = render(<Header {...dummyData} />);
    expect(baseElement).toBeInTheDocument();
    expect(baseElement).toHaveTextContent("John");
  });
});