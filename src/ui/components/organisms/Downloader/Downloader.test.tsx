import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import Downloader from "./Downloader";

describe("Downloader", () => {
  it("should render a link", () => {
    const { baseElement, getByRole } = render(<Downloader />);
    const linkElement = getByRole('link');
    expect(baseElement).toContainElement(linkElement);
  });
});