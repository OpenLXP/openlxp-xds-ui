import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import * as redux from "react-redux";

import store from "../store/store";
import ManageSubscriptions from "./ManageSubscriptions";
import Login from "./Login";

const state = {
  configuration: {
    configuration: {
      id: 1,
      search_sort_options: [
        {
          display_name: "Course Date",
          field_name: "LifeCycle.CourseDate",
          active: true,
          xds_ui_configuration: 1,
        },
        {
          display_name: "Course Title",
          field_name: "Course.CourseTitle",
          active: true,
          xds_ui_configuration: 1,
        },
      ],
      course_highlights: [
        {
          display_name: "Provider",
          field_name: "Course.CourseProviderName",
          active: true,
          xds_ui_configuration: 1,
          highlight_icon: "location",
        },
        {
          display_name: "Duration",
          field_name: "General_Information.Duration",
          active: true,
          xds_ui_configuration: 1,
          highlight_icon: "clock",
        },
      ],
      course_information: {
        course_title: "Course.CourseTitle",
        course_description: "Course.CourseShortDescription",
        course_url: "Course.CourseURL",
      },
      created: "2021-08-18T15:31:39.953438Z",
      modified: "2021-08-18T15:31:39.953438Z",
      search_results_per_page: 10,
      course_img_fallback: null,
    },
    status: "succeeded",
    error: null,
  },
  user: {
    user: {
      email: "admin@example.com",
      firstName: "",
      lastName: "",
      token: "e312888daa172bfd1c88a70869ffdf54e04a073cdd87a940af025e7902f0af60",
    },
    status: "succeeded",
    error: null,
  },
  lists: {
    lists: [
      {
        id: 1,
        owner: {
          id: 1,
          email: "admin@example.com",
          first_name: "",
          last_name: "",
        },
        subscribers: [
          {
            id: 1,
            email: "admin@example.com",
            first_name: "",
            last_name: "",
          },
        ],
        created: "2021-08-19T14:19:41.006330Z",
        modified: "2021-08-19T14:21:10.523438Z",
        description: "Test List 1",
        name: "Test List 1",
        experiences: ["9921bdb80770cb47f9d5da70dd4061a5"],
      },
    ],
    subs: [
      {
        id: 1,
        owner: {
          id: 1,
          email: "admin@example.com",
          first_name: "",
          last_name: "",
        },
        subscribers: [
          {
            id: 1,
            email: "admin@example.com",
            first_name: "",
            last_name: "",
          },
        ],
        created: "2021-08-19T14:19:41.006330Z",
        modified: "2021-08-19T14:21:10.523438Z",
        description: "Test List 1",
        name: "Test List 1",
        experiences: ["9921bdb80770cb47f9d5da70dd4061a5"],
      },
    ],
    status: "succeeded",
    error: null,
  },
};

const { getByText, queryByText } = screen;

// MOCKS
jest.mock("axios");
const useSelectorMock = jest.spyOn(redux, "useSelector");

let container = null;
let component = (
  <div>
    <Provider store={store}>
      <MemoryRouter initialEntries={["/managesubscriptions"]}>
        <Route path="/managesubscriptions" component={ManageSubscriptions} />
        <Route path="/signin" component={Login} />
      </MemoryRouter>
    </Provider>
  </div>
);

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Manage Subscriptions", () => {
  it("renders title", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: userLists })
      );

      render(component, container);
    });
    getByText("Subscribed Lists");
  });
});
