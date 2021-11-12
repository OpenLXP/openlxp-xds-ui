import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, StaticRouter } from "react-router-dom";
import * as redux from "react-redux";
import axios from "axios";
import { Provider } from "react-redux";

import Course from "./Course";
import store from "../store/store";

const { getByText } = screen;

// MOCKS
const useSelectorMock = jest.spyOn(redux, "useSelector");
jest.mock("axios");

// Test Data
const courseObj = {
  Course: {
    CourseTitle: "Title1",
    CourseFullDescription: "Random Course Description",
    DepartmentName: "Department1",
  },
  meta: {
    id: 51,
  },
};

const courseData = {
  hits: [
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
  ],
  total: 1,
};

let state = {
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
    course_information: {
      course_title: "Course.CourseTitle",
      course_description: "Course.CourseDescription",
      course_url: "CourseInstance.CourseURL",
    },
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

describe("Course", () => {
  it("renders the correct course title", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      axios.get.mockImplementation(() => Promise.resolve({ data: courseData }));

      render(
        <Provider store={store}>
          <StaticRouter location={{ pathname: "/course" }}>
            <Course />
          </StaticRouter>
        </Provider>
      );
    });
    getByText("Title1");
    getByText("Provider1");
    getByText("Department1");
  });
  it("renders the an error when api fails", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      axios.get.mockImplementation(() =>
        Promise.reject({ error: "Contact an administrator" })
      );

      render(
        <Provider store={store}>
          <StaticRouter location={{ pathname: "/course" }}>
            <Course />
          </StaticRouter>
        </Provider>
      );
    });
    getByText("Contact an administrator");
  });
});
