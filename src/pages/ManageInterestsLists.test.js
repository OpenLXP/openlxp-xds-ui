import axios from "axios";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import { unmountComponentAtNode } from "react-dom";
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, StaticRouter } from "react-router-dom";

import store from "../store/store";
import ManageInterestLists from "./ManageInterestsLists";

const { getByText } = screen;

// GLOBAL TESTING DATA
let state = {
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
      token: "testtoken",
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
        modified: "2021-08-20T20:32:21.857470Z",
        description: "Test List 1",
        name: "Test List 1",
        experiences: [
          "9921bdb80770cb47f9d5da70dd4061a5",
          "e17827f4238c43da520ebf281a4196f3",
          "eba3cbb19108922e9ec7cb4c3fdd15ff",
        ],
      },
      {
        id: 2,
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
        created: "2021-08-20T16:42:34.372432Z",
        modified: "2021-08-20T20:32:22.481365Z",
        description: "Test desc",
        name: "Test List 2",
        experiences: [],
      },
      {
        id: 3,
        owner: {
          id: 1,
          email: "admin@example.com",
          first_name: "",
          last_name: "",
        },
        subscribers: [],
        created: "2021-08-20T16:42:44.330661Z",
        modified: "2021-08-20T16:42:44.330661Z",
        description: "Test Desc 3",
        name: "Test List 3",
        experiences: [],
      },
    ],
    subs: null,
    status: "idle",
    error: null,
  },
};
// Get UserLists
const userLists = [
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
    modified: "2021-08-20T20:32:21.857470Z",
    description: "Test Description",
    name: "Test List 1",
    experiences: [
      "9921bdb80770cb47f9d5da70dd4061a5",
      "e17827f4238c43da520ebf281a4196f3",
      "eba3cbb19108922e9ec7cb4c3fdd15ff",
    ],
  },
  {
    id: 2,
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
    created: "2021-08-20T16:42:34.372432Z",
    modified: "2021-08-20T20:32:22.481365Z",
    description: "Test desc",
    name: "Test List 2",
    experiences: [],
  },
  {
    id: 3,
    owner: {
      id: 1,
      email: "admin@example.com",
      first_name: "",
      last_name: "",
    },
    subscribers: [],
    created: "2021-08-20T16:42:44.330661Z",
    modified: "2021-08-20T16:42:44.330661Z",
    description: "Test Desc 3",
    name: "Test List 3",
    experiences: [],
  },
];
// Course List data
let courseData = {
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
  modified: "2021-08-20T20:32:21.857470Z",
  description: "Test description",
  name: "Test List 1",
  experiences: [
    {
      Course: {
        CourseTitle: "AHLTA-T: Data Manager (1 hr)",
        CourseProviderName: "JKO",
      },
      Supplemental_Ledger: {
        Instance: 1748413,
      },
      meta: {
        id: "6dc2ec49-f4c7-4ce0-9b37-be87183feaeb",
        metadata_key_hash: "9921bdb80770cb47f9d5da70dd4061a5",
      },
    },
    {
      Course: {
        CourseTitle:
          "Department of Defense (DoD) Cyber Awareness Challenge (1 hr) ",
        CourseProviderName: "JKO",
      },
      Supplemental_Ledger: {
        Instance: 1731234,
      },
      meta: {
        id: "6fce081f-64e1-41d3-885f-f123bf3b8333",
        metadata_key_hash: "e17827f4238c43da520ebf281a4196f3",
      },
    },
    {
      Course: {
        CourseTitle: "DoD Cyber Awareness Challenge 2020 (1 hr)",
        CourseProviderName: "JKO",
      },
      Supplemental_Ledger: {
        Instance: 1741008,
      },
      meta: {
        id: "780b58ac-0459-4a9d-bb68-3605c0cad475",
        metadata_key_hash: "eba3cbb19108922e9ec7cb4c3fdd15ff",
      },
    },
  ],
};

// MOCKS
const useSelectorMock = jest.spyOn(redux, "useSelector");
jest.mock("axios");

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

describe("ManageInterestLists.js", () => {
  it("renders the title", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValue(state);
      axios.get.mockImplementation(() => Promise.resolve({ data: userLists }));
      render(
        <Provider store={store}>
          <MemoryRouter>
            <ManageInterestLists />
          </MemoryRouter>
        </Provider>,
        container
      );
    });
    await act(async () => {
      axios.get.mockImplementation(() => Promise.resolve(courseData));
    });

    getByText("Manage Interest Lists");
  });
  it("renders the lists provided", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValueOnce({ user: { token: 1234 } });
      useSelectorMock.mockReturnValueOnce({
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
            modified: "2021-08-20T20:32:21.857470Z",
            description: "Test List 1",
            name: "Test List 1",
            experiences: [
              "9921bdb80770cb47f9d5da70dd4061a5",
              "e17827f4238c43da520ebf281a4196f3",
              "eba3cbb19108922e9ec7cb4c3fdd15ff",
            ],
          },
          {
            id: 2,
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
            created: "2021-08-20T16:42:34.372432Z",
            modified: "2021-08-20T20:32:22.481365Z",
            description: "Test desc",
            name: "Test List 2",
            experiences: [],
          },
          {
            id: 3,
            owner: {
              id: 1,
              email: "admin@example.com",
              first_name: "",
              last_name: "",
            },
            subscribers: [],
            created: "2021-08-20T16:42:44.330661Z",
            modified: "2021-08-20T16:42:44.330661Z",
            description: "Test Desc 3",
            name: "Test List 3",
            experiences: [],
          },
        ],
        subs: null,
        status: "idle",
        error: null,
      });
      axios.get.mockImplementation(() => Promise.resolve({ data: courseData }));
      render(
        <Provider store={store}>
          <MemoryRouter>
            <ManageInterestLists />
          </MemoryRouter>
        </Provider>,
        container
      );
    });

    await act(async () => {
      axios.get.mockImplementation(() => Promise.resolve(courseData));
    });
    await waitFor(() => {
      expect(getByText("Test List 1")).toBeInTheDocument();
    });
  });
  it("renders the loading component", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValueOnce({ user: { token: 1234 } });
      useSelectorMock.mockReturnValueOnce({
        lists: null,
        subs: null,
        status: "loading",
        error: null,
      });
      axios.get.mockImplementation(() => Promise.resolve({ data: courseData }));
      render(
        <Provider store={store}>
          <MemoryRouter>
            <ManageInterestLists />
          </MemoryRouter>
        </Provider>,
        container
      );
    });

    await act(async () => {
      axios.get.mockImplementation(() => Promise.resolve(courseData));
    });
    expect(getByText("Loading...")).toBeInTheDocument();
  });
  it("renders the error component", async () => {
    await act(async () => {
      useSelectorMock.mockReturnValueOnce({ user: { token: 1234 } });
      useSelectorMock.mockReturnValueOnce({
        lists: null,
        subs: null,
        status: "failed",
        error: "failed",
      });
      axios.get.mockImplementation(() => Promise.resolve({ data: courseData }));
      render(
        <Provider store={store}>
          <MemoryRouter>
            <ManageInterestLists />
          </MemoryRouter>
        </Provider>,
        container
      );
    });

    await act(async () => {
      axios.get.mockImplementation(() => Promise.resolve(courseData));
    });
    expect(getByText("Contact a system administrator.")).toBeInTheDocument();
  });
});
