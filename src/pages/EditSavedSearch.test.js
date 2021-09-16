import EditSavedSearch from "./EditSavedSearch";

import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import * as redux from "react-redux";
import store from "../store/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

jest.mock("axios");
let useSelectorMock = jest.spyOn(redux, "useSelector");
// tools to use
let { getByText, getByLabelText } = screen;

let testData = {
  hits: [
    {
      Supplemental_Ledger: {
        Instance: 1718952,
      },
      Course: {
        CourseURL: "some location",
        CourseCode: "Test Code",
        CourseType: "Test Course Type",
        CourseTitle: "Test Course Title",
        CourseProviderName: "Test Provider",
        CourseShortDescription: "Course Description",
        EstimatedCompletionTime: 1,
      },
      meta: {
        index: "testing_workflow",
        id: "18fc75b9e74733ec0473477a32cb0894",
        score: 1,
        doc_type: "_doc",
      },
    },
  ],
  total: 1107,
  aggregations: {},
};

const state = {
  user: { email: "test@test.com" },
  configuration: {
    id: 1,
    search_sort_options: [
      {
        display_name: "Course Date",
        field_name: "Lifecycle.CourseDate",
        active: true,
        xds_ui_configuration: 1,
      },
    ],
    course_highlights: [
      {
        display_name: "Start Date",
        field_name: "GeneralInformation.StartDate",
        active: true,
        xds_ui_configuration: 1,
        highlight_icon: "clock",
      },
    ],
    created: "2021-05-20T01:24:29.082370Z",
    modified: "2021-05-20T13:10:35.608284Z",
    search_results_per_page: 10,
    course_img_fallback: "/media/images/elearning_KpJuxw0.jpeg",
  },
  status: "succeeded",
  error: null,
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

describe( "EditSavedSearch", () => {
  
  it("shows the correct labels, buttons, on first render for new list", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      render(
        <Provider store={store}>
          <MemoryRouter
            initialEntries={[
              "/filter-search?Course.CourseTitle=&Course.CourseProviderName=Provider&CourseInstance.CourseLevel=&p=1",
            ]}>
            <EditSavedSearch />
          </MemoryRouter>
        </Provider>,
        container
      );
    });
    getByText("Search");
    getByText("Total: 1107");
    getByText("Test Course Title");
    getByText("Next");
    getByLabelText("Course Title");
    getByLabelText("Course Provider");
    getByLabelText("Course Level");
    getByText("Editing:");
    getByText("Create");
  } );
  
  it("shows the correct labels, buttons, on first render for existing list", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      render(
        <Provider store={store}>
          <MemoryRouter
            initialEntries={[
              {
                pathname: "/filter-search",
                state: { name: "Test List", id: 1 },
              },
            ]}>
            <EditSavedSearch />
          </MemoryRouter>
        </Provider>,
        container
      );
    });
    getByText("Search");
    getByText("Total: 1107");
    getByText("Test Course Title");
    getByText("Next");
    getByLabelText("Course Title");
    getByLabelText("Course Provider");
    getByLabelText("Course Level");
    getByText("Editing:");
    getByText("Update");
  });

  it("does make axios call from existing list", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      render(
        <Provider store={store}>
          <MemoryRouter
            initialEntries={[
              {
                pathname: "/filter-search",
                state: { name: "Test List", id: 1 },
              },
            ]}>
            <EditSavedSearch />
          </MemoryRouter>
        </Provider>,
        container
      );
    });

    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      axios.patch.mockResolvedValueOnce({});
      fireEvent.click(getByText("Update"));
    });
    expect(axios.patch).toHaveBeenCalledTimes(1);
  });
});
