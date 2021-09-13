import ControlsBar from "./ControlsBar";
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";

// tools to use
let { getByText, queryByText } = screen;

let container = null;
let globalProps = {
  total: null,
  page: null,
  numberResultsPerPage: null,
  onClickNext: () => {},
  onClickBack: () => {},
};
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  globalProps = {
    total: 1337,
    page: 1,
    numberResultsPerPage: 10,
  };
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  // resetting the global props
  globalProps = {
    total: null,
    page: null,
    numberResultsPerPage: null,
  };
});

describe("Controls bar", () => {
  it("shows the correct total", () => {
    act(() => {
      render(
        <ControlsBar
          total={globalProps.total}
          page={globalProps.page}
          numberResultsPerPage={globalProps.numberResultsPerPage}
          onClickNext={globalProps.onClickNext}
          onClickBack={globalProps.onClickBack}
        />,
        container
      );
    });
    getByText("Total: 1337");
    getByText("1");
    getByText("Next");
  });

  it("shows the correct page", () => {
    act(() => {
      render(
        <ControlsBar
          total={globalProps.total}
          page={globalProps.page}
          numberResultsPerPage={globalProps.numberResultsPerPage}
          onClickNext={globalProps.onClickNext}
          onClickBack={globalProps.onClickBack}
        />,
        container
      );
    });
    getByText("1");
  });
  it("shows the next button", () => {
    act(() => {
      render(
        <ControlsBar
          total={globalProps.total}
          page={globalProps.page}
          numberResultsPerPage={globalProps.numberResultsPerPage}
          onClickNext={globalProps.onClickNext}
          onClickBack={globalProps.onClickBack}
        />,
        container
      );
    });
    getByText("Next");
  });
  it("hides the next button when no more pages", () => {
    act(() => {
      render(
        <ControlsBar
          total={2}
          page={1}
          numberResultsPerPage={globalProps.numberResultsPerPage}
          onClickNext={globalProps.onClickNext}
          onClickBack={globalProps.onClickBack}
        />,
        container
      );
    });
    expect(getByText("Next").className.includes("invisible")).toBeTruthy();
  });

  it("shows the back button", () => {
    act(() => {
      render(
        <ControlsBar
          total={globalProps.total}
          page={2}
          numberResultsPerPage={globalProps.numberResultsPerPage}
          onClickNext={globalProps.onClickNext}
          onClickBack={globalProps.onClickBack}
        />,
        container
      );
    });
    getByText("Back");
  });

  it("hides the back button when no more pages", () => {
    act(() => {
      render(
        <ControlsBar
          total={globalProps.total}
          page={globalProps.page}
          numberResultsPerPage={globalProps.numberResultsPerPage}
          onClickNext={globalProps.onClickNext}
          onClickBack={globalProps.onClickBack}
        />,
        container
      );
    });
    expect(getByText("Back").className.includes("invisible")).toBeTruthy();
  });

  it("next button runs the passed function", () => {
    console.log = jest.fn();
    act(() => {
      render(
        <ControlsBar
          total={globalProps.total}
          page={globalProps.page}
          numberResultsPerPage={globalProps.numberResultsPerPage}
          onClickNext={() => {
            console.log("Clicked Next!");
          }}
          onClickBack={globalProps.onClickBack}
        />,
        container
      );
    });

    act(() => {
      fireEvent.click(getByText("Next"));
    });

    expect(console.log).toHaveBeenCalledWith("Clicked Next!");
  });

  it("back button runs the passed function", () => {
    console.log = jest.fn();
    act(() => {
      render(
        <ControlsBar
          total={globalProps.total}
          page={2}
          numberResultsPerPage={globalProps.numberResultsPerPage}
          onClickNext={globalProps.onClickNext}
          onClickBack={() => {
            console.log("Clicked Back!");
          }}
        />,
        container
      );
    });

    act(() => {
      fireEvent.click(getByText("Back"));
    });
    expect(console.log).toHaveBeenCalledWith("Clicked Back!");
  });
});
