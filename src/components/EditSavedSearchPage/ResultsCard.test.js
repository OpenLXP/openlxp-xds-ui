import ResultsCard from "./ResultsCard";

import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";

let { getByText } = screen;

// mocking for test
console.log = jest.fn();

let globalProps = {
  title: null,
  provider: null,
  viewCourse: () => {
    console.log("Clicked");
  },
};

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  globalProps.title = "Test Title";
  globalProps.provider = "Test Provider";
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Results Card", () => {
  it("shows title passed to it", () => {
    act(() => {
      render(
        <ResultsCard
          title={globalProps.title}
          provider={globalProps.provider}
          viewCourse={globalProps.viewCourse}
        />,
        container
      );
    });

    getByText("Test Title");
  });
  it("shows the provider passed to it", () => {
    act(() => {
      render(
        <ResultsCard
          title={globalProps.title}
          provider={globalProps.provider}
          viewCourse={globalProps.viewCourse}
        />,
        container
      );
    });
    getByText("Test Provider");
  });
  it("shows the view button", () => {
    act(() => {
      render(
        <ResultsCard
          title={globalProps.title}
          provider={globalProps.provider}
          viewCourse={globalProps.viewCourse}
        />,
        container
      );
    });
    getByText("View");
  });
  it("runs the function passed to it", () => {
    act(() => {
      render(
        <ResultsCard
          title={globalProps.title}
          provider={globalProps.provider}
          viewCourse={globalProps.viewCourse}
        />,
        container
      );
    });

    act(() => {
      fireEvent.click(getByText("View"));
    });

    expect(console.log).toHaveBeenCalledWith("Clicked");
  });
});
