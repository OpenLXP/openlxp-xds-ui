import SearchForm from "./SearchForm";

import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";

let { getByText, getByPlaceholderText } = screen;

// mocking for test
console.log = jest.fn();

let globalProps = {
  params: {},
  handleChange: () => {
    console.log("Change");
  },
  handleSubmit: () => {
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

describe("Search Form", () => {
  it("shows the labels and inputs when no params are passed", () => {
    act(() => {
      render(
        <SearchForm
          params={globalProps.params}
          handleChange={globalProps.handleChange}
          handleSubmit={globalProps.handleSubmit}
        />,
        container
      );
    });

    getByText("Course Title");
    getByPlaceholderText("Title");

    getByText("Course Provider");
    getByPlaceholderText("Provider");

    getByText("Course Level");
    getByPlaceholderText("Level");
  });
  it("shows the labels and inputs when params are passed", () => {
    let params = {
      "CourseInstance.CourseLevel": "Advanced",
      "Course.CourseProviderName": "Test Provider",
      "Course.CourseTitle": "Test Title",
    };
    act(() => {
      render(
        <SearchForm
          params={params}
          handleChange={globalProps.handleChange}
          handleSubmit={globalProps.handleSubmit}
        />,
        container
      );
    });

    expect(getByPlaceholderText("Title").value).toBe("Test Title");
    expect(getByPlaceholderText("Provider").value).toBe("Test Provider");
    expect(getByPlaceholderText("Level").value).toBe("Advanced");
  });
  it("shows the search button", () => {
    act(() => {
      render(
        <SearchForm
          params={globalProps.params}
          handleChange={globalProps.handleChange}
          handleSubmit={globalProps.handleSubmit}
        />,
        container
      );
    });

    getByText("Search");
  });
  it("runs the passed function to submit", () => {
    act(() => {
      render(
        <SearchForm
          params={globalProps.params}
          handleChange={globalProps.handleChange}
          handleSubmit={globalProps.handleSubmit}
        />,
        container
      );
    });
    act(() => {
      fireEvent.click(getByText("Search"));
    });

    expect(console.log).toHaveBeenCalledWith("Clicked");
  });
  it("runs the passed function on change of an input", () => {
    act(() => {
      render(
        <SearchForm
          params={globalProps.params}
          handleChange={globalProps.handleChange}
          handleSubmit={globalProps.handleSubmit}
        />,
        container
      );
    });
    act(() => {
      fireEvent.change(getByPlaceholderText("Title"), {
        target: { value: "a" },
      });
    });

    expect(console.log).toHaveBeenCalledWith("Change");
  });
});
