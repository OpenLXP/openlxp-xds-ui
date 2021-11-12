import TitleInput from "./TitleInput";

import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";

let { getByText, getByPlaceholderText } = screen;

// mocking for test
console.log = jest.fn();

let globalProps = {
  titleValue: "Test Title",
  onChange: () => {
    console.log("Changed");
  },
};

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

describe("Title Input", () => {
  it("shows editing tag", () => {
    act(() => {
      render(
        <TitleInput
          titleValue={globalProps.titleValue}
          onChange={globalProps.onChange}
        />,
        container
      );
    });
    getByText("Editing:");
  });

  it("shows passed title", () => {
    act(() => {
      render(
        <TitleInput
          titleValue={globalProps.titleValue}
          onChange={globalProps.onChange}
        />,
        container
      );
    });

    expect(getByPlaceholderText("Custom Search Name").value).toBe("Test Title");
  });

  it("runs passed function on change", () => {
    act(() => {
      render(
        <TitleInput
          titleValue={globalProps.titleValue}
          onChange={globalProps.onChange}
        />,
        container
      );
    });

    act(() => {
      fireEvent.change(getByPlaceholderText("Custom Search Name"), {
        target: { value: "a" },
      });
    });

    expect(console.log).toHaveBeenCalledWith("Changed");
  });
});
