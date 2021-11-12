import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CourseDetails from "./CourseDetails";

// tools to test with
let { getByText, getByTestId } = screen;

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

describe("CourseDetails.js", () => {
  it("renders the correct label and value", () => {
    act(() => {
      render(
        <CourseDetails icon="user" label="user" value="test user" />,
        container
      );
    });
    getByText("user");
    getByText("test user");
  });
  it("renders N/A when no value is passed", () => {
    act(() => {
      render(<CourseDetails icon="user" label="user" />, container);
    });
    getByText("user");
    getByText("N/A");
  });
  it("renders N/A when an empty string is passed", () => {
    act(() => {
      render(<CourseDetails icon="user" label="user" value="" />, container);
    });
    getByText("user");
    getByText("N/A");
  });
  it("renders calendar when no value is passed for icon", () => {
    act(() => {
      render(<CourseDetails label="user" value="test user" />, container);
    });

    getByTestId('calendar-outline')
  });
});
