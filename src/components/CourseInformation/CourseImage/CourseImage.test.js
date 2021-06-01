import { render, act, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";

import CourseImage from "./CourseImage";

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

describe("CourseImage", () => {

  test("should render course image", () => {
    act(() => {
      const img = "testImg";

      render(<CourseImage img={img} />);
    });

    expect(screen.getByAltText("Course Image")).toBeInTheDocument();
  });
});
