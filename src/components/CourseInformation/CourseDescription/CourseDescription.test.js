import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom";

import CourseDescription from "./CourseDescription";

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

describe("CourseDescription", () => {
  test("should render null", () => {
    act(() => {
      const testDesc = "this is a test desc";
      render(<CourseDescription desc={testDesc} />);
    });

    screen.getByText("Course Description");
    screen.getByText("this is a test desc");
  });

  test("should not render if no description is present", () => {
    act(() => {
      render(
        <div data-testid="test">
          <CourseDescription />
        </div>
      );
    });

    expect(screen.getByTestId("test").childElementCount).toBe(0);
  });
});
