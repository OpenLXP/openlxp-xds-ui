import CreateButton from "./CreateButton";

import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";

let { getByText } = screen;

// for testing only
console.log = jest.fn();

let globalProps = {
  isUpdating: false,
  onClick: () => {
    console.log("Clicked");
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

describe("Create Button", () => {
  it("shows the green create button", () => {
    act(() => {
      render(
        <CreateButton
          isUpdating={globalProps.isUpdating}
          onClick={globalProps.onClick}
        />,
        container
      );
    });

    getByText("Create");
    expect(getByText("Create").className.includes("bg-green-100")).toBeTruthy();
    expect(
      getByText("Create").firstChild.className.includes("animate-spin")
    ).toBeFalsy();
  });

  it("shows the gray create button", () => {
    act(() => {
      render(
        <CreateButton isUpdating={true} onClick={globalProps.onClick} />,
        container
      );
    });

    getByText("Create");
    expect(getByText("Create").className.includes("bg-gray-200")).toBeTruthy();
    expect(
      getByText("Create").firstChild.className.includes("animate-spin")
    ).toBeTruthy();
  });

  it("runs the passed function", () => {
    act(() => {
      render(
        <CreateButton isUpdating={true} onClick={globalProps.onClick} />,
        container
      );
    });

    act(() => {
      fireEvent.click(getByText("Create"));
    });

    expect(console.log).toHaveBeenCalledWith("Clicked");
  });
});
