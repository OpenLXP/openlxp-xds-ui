import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom";

import CourseDetails from "./CourseDetails";

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

describe("CourseDetails", () => {
  test("should render course details.", () => {
    act(() => {
      const testDetails = [
        { icon: "calendar-outline", name: "test1", value: "1" },
        { icon: "calendar-outline", name: "test2", value: "2" },
        { icon: "calendar-outline", name: "test3", value: "3" },
      ];

      render(<CourseDetails details={testDetails} />);
    });

    screen.getByText("test1:");
    screen.getByText("1");
    screen.getByText("test2:");
    screen.getByText("2");
    screen.getByText("test3:");
    screen.getByText("3");
  });

  test("should render 2 courses in the first column, 1 in the second", () => {
    act(() => {
      const testDetails = [
        { icon: "calendar-outline", name: "test1", value: "1" },
        { icon: "calendar-outline", name: "test2", value: "2" },
        { icon: "calendar-outline", name: "test3", value: "3" },
      ];

      render(<CourseDetails details={testDetails} />);
    });

    const parent = screen.getByTestId("details");

    expect(parent.firstChild.childElementCount).toBe(2);
    expect(parent.lastChild.childElementCount).toBe(1);
  });
});
