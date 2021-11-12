import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import * as redux from "react-redux";

import store from "../../store/store";
import SubscriptionLists from "./SubscriptionLists";

// Mocks
/**
 * MOCKS for resolving / rejecting values async axios
 * mockRestore: [Function],
 * mockReturnValueOnce: [Function],
 * mockResolvedValueOnce: [Function],
 * mockRejectedValueOnce: [Function],
 * mockReturnValue: [Function],
 * mockResolvedValue: [Function],
 * mockRejectedValue: [Function],
 * mockImplementationOnce: [Function],
 * mockImplementation: [Function],
 * mockReturnThis: [Function],
 */
jest.mock("axios");
const useSelectorMock = jest.spyOn(redux, "useSelector");

// Screen functions
const { getByText, queryByText } = { ...screen };

// Data
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
        modified: "2021-08-19T14:21:10.523438Z",
        description: "Test List Description",
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
        description: "Test List Description",
        name: "Test List 1",
        experiences: ["9921bdb80770cb47f9d5da70dd4061a5"],
      },
    ],
    status: "succeeded",
    error: null,
  },
};
const tableData = {
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
  experiences: [
    {
      Course: {
        CourseURL:
          "https://jkodirect.jten.mil/html/COI.xhtml?course_prefix=DHA&course_number=-US691-D",
        CourseCode: "DHA-US691-D",
        CourseType: "SCORM 2004",
        CourseTitle: "AHLTA-T: Data Manager (1 hr)",
        CourseProviderName: "JKO",
        CourseShortDescription:
          "This course describes the process of transfer of AHLTA-T encounters from one instance to another via removable media. This course is recommended for all single users of an AHLTA-T instance, system administrators, and providers. This course functions best using the Chrome or Firefox browsers.",
        EstimatedCompletionTime: 1,
      },
      Supplemental_Ledger: {
        Instance: 1748413,
      },
      meta: {
        id: "6dc2ec49-f4c7-4ce0-9b37-be87183feaeb",
        metadata_key_hash: "9921bdb80770cb47f9d5da70dd4061a5",
      },
    },
  ],
};

// Setup
let container = null;
const component = (
  <div>
    <Provider store={store}>
      <SubscriptionLists
        list={state.lists.subs[0]}
        token={state.user.user.token}
      />
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

describe("Subscription Lists", () => {
  it("1. does render the list title", async () => {
    await act(async () => {
      render(component, container);
    });

    getByText("Test List 1");
  });
  it("2. does render list info on click", async () => {
    await act(async () => {
      render(component, container);
    });

    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: tableData })
      );
      fireEvent.click(getByText("Test List 1"));
    });

    getByText("Unsubscribe");

    getByText("Owner");
    getByText("admin@example.com");

    getByText("Description");
    getByText("Test List Description");

    getByText("AHLTA-T: Data Manager (1 hr)");
    getByText("JKO");
  });
  it("3. does make api call on click", async () => {
    await act(async () => {
      render(component, container);
    });

    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: tableData })
      );
      fireEvent.click(getByText("Test List 1"));
    });

    await act(async () => {
      axios.patch.mockImplementationOnce(() => Promise.resolve());
      fireEvent.click(getByText("Unsubscribe"));
    });

    expect(axios.patch).toHaveBeenCalled();
  });
});
