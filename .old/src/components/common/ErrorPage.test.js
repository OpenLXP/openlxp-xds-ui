import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";

import ErrorPage from "./ErrorPage";

const { getByText } = screen;

let container = null;
const component = <ErrorPage>Test Value</ErrorPage>;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("ErrorPage", () => {
  it("renders child component", () => {
    act(() => {
      render(component, container);
    });

    getByText("Test Value");
  });
});
