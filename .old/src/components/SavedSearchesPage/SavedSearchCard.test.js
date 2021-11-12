import SavedSearchCard from "./SavedSearchCard";

import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import * as redux from "react-redux";
import store from "../../store/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

jest.mock("axios");
let useSelectorMock = jest.spyOn(redux, "useSelector");
// tools to use
let { getByText, getByLabelText, getByTestId } = screen;

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

let savedSearch = {
    name: "test name",
    query: "test query",
    id: "1234",
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

describe( "SavedSearchCard", () => {
  
  it("shows the correct labels, buttons, on first render for new list", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      render(
        <Provider store={store}>
          <MemoryRouter >
            <SavedSearchCard savedSearch={savedSearch}/>
          </MemoryRouter>
        </Provider>,
        container
      );
    });
    getByText("test name");
    getByText("test query");
  } );

  it("View button click", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      const test = () => { };
      render(
        <Provider store={store}>
          <MemoryRouter >
            <SavedSearchCard savedSearch={savedSearch} getSavedSearches={test}/>
          </MemoryRouter>
        </Provider>,
        container
      );
    });

    getByTestId('view-button')
    await act(async () => {
      fireEvent.click(getByTestId('view-button'));
    });
  });

  it("Edit button click", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      const test = () => { };
      render(
        <Provider store={store}>
          <MemoryRouter >
            <SavedSearchCard savedSearch={savedSearch} getSavedSearches={test}/>
          </MemoryRouter>
        </Provider>,
        container
      );
    });

    getByTestId('edit-button')
    await act(async () => {
      fireEvent.click(getByTestId('edit-button'));
    });
  });

  it("Delete button click", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      const test = () => { };
      render(
        <Provider store={store}>
          <MemoryRouter >
            <SavedSearchCard savedSearch={savedSearch} getSavedSearches={test}/>
          </MemoryRouter>
        </Provider>,
        container
      );
    });

    getByTestId('delete-button')
    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      axios.delete.mockResolvedValueOnce({});
      fireEvent.click(getByTestId('delete-button'));
    });
  }); 

});
