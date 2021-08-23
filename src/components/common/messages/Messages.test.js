import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Loading, Error } from "./messages";

// tools to test with
let { getByText, getByPlaceholderText } = screen;

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

describe("Loading.js", () => {
  it("renders the correct message", () => {
    act(() => {
      render(<Loading />, container);
    });
    getByText("Loading...");
  });
});
describe("Error.js", () => {
  it("renders the correct message", () => {
    act(() => {
      render(<Error>Test Error</Error>, container);
    });
    getByText("Test Error");
  });
});
