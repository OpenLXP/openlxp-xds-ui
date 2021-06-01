import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";

import CourseButton from "./CourseButton";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("CourseButton", () => {

  test("should click view course button", () => {
    let url = "www.google.com";
    act(() => {
        render(<CourseButton url={url} />);

        const pageLink = screen.getByText("View Course");
        pageLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(screen.getByText("View Course")).toBeInTheDocument();
    // expect(screen.getByText("View Course").href).toBe(url)
  });
});
