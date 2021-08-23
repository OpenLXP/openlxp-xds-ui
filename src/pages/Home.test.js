import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import axios from "axios";

import store from "../store/store";
import LandingPage from "./Home";
import SearchResultPage from "../components/SearchResultsPage/SearchResultsPage";

let container = null;
let spotlightRes = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  spotlightRes = [
    {
      Course: {
        CourseTitle: "Title1",
        CourseProviderName: "Provider1",
        DepartmentName: "Department1",
      },
      Technical_Information: {
        Thumbnail: "Test",
      },
      meta: {
        index: "test-index",
        id: "1",
        score: 1,
        doc_type: "_doc",
      },
    },
  ];
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

jest.mock("axios");

describe("<Home />", () => {
  it("should display: header, subheader, and spotlight section", async () => {
    axios.get.mockResolvedValueOnce({ data: spotlightRes });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LandingPage />
          </MemoryRouter>
        </Provider>,
        container
      );
    });
    expect(
      screen.getByText("Enterprise Course Catalog", { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "This catalog lets you search for all DoD " +
          "unclassified training and education courses, seminars, " +
          "instructional resources and more."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Spotlight")).toBeInTheDocument();
    expect(screen.getByText("Title1")).toBeInTheDocument();
  });

  it("should show user input on the search bar", async () => {
    axios.get.mockResolvedValueOnce({ data: spotlightRes });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <LandingPage />
          </MemoryRouter>
        </Provider>,
        container
      );
    });
    act(() => {
      const input = screen.getByPlaceholderText("Search for anything");

      expect(input.value).toBe("");
      fireEvent.change(input, { target: { value: "Hello" } });
    });

    screen.getByDisplayValue("Hello");
  });
  it("should show search on enter", async () => {
    axios.get.mockResolvedValueOnce({ data: spotlightRes });

    let data = {
      hits: [
        {
          Course: {
            CourseTitle: "test",
            CourseProviderName: "Provider1",
            DepartmentName: "Department1",
          },
          Technical_Information: {
            Thumbnail: "Test",
          },
          meta: {
            index: "test-index",
            id: "1",
            score: 1,
            doc_type: "_doc",
          },
        },
      ],
      total: 1,
    };

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Route path="/" component={LandingPage} />
            <Route path="/search/" component={SearchResultPage} />
          </MemoryRouter>
        </Provider>,
        container
      );
    });
    axios.get.mockResolvedValueOnce({ data: data });
    await act(async () => {
      const input = screen.getByPlaceholderText("Search for anything");

      fireEvent.change(input, { target: { value: "test" } });

      fireEvent.keyPress(screen.getByPlaceholderText("Search for anything"), {
        key: "Enter",
        charCode: 13,
      });
    });

    screen.getByDisplayValue("test");
  });
});
