import UpdateButton from "./UpdateButton";

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

describe("Update Button", () => {
  it("shows the green update button", () => {
    act(() => {
      render(
        <UpdateButton
          isUpdating={globalProps.isUpdating}
          onClick={globalProps.onClick}
        />,
        container
      );
    });

    getByText("Update");
    expect(getByText("Update").className.includes("bg-green-100")).toBeTruthy();
  });
  it("shows the gray update button", () => {
    act(() => {
      render(
        <UpdateButton isUpdating={true} onClick={globalProps.onClick} />,
        container
      );
    });

    expect(getByText("Update").className.includes("bg-gray-200")).toBeTruthy();
  });
  it("runs the passed function", () => {
    act(() => {
      render(
        <UpdateButton
          isUpdating={globalProps.isUpdating}
          onClick={globalProps.onClick}
        />,
        container
      );
    });
    act(() => {
      fireEvent.click(getByText("Update"));
    });

    expect(console.log).toHaveBeenCalledWith("Clicked");
  });
});
