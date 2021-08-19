import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import * as redux from "react-redux";

import store from "../../store/store";
import FilterSearch from "./FilterSearch";

const state = {
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
const testData = {
  hits: [
    {
      Supplemental_Ledger: {
        Instance: 1718952,
      },
      Course: {
        CourseTitle: "Test Title",
        CourseProviderName: "Test Provider",
      },
      meta: {
        id: "18fc75b9e74733ec0473477a32cb0894",
      },
    },
  ],
  total: 1,
  aggregations: {},
};

// Destructuring the common functions.
const { getByText, getByPlaceholderText, getAllByText, queryByText } = screen;

// MOCKS
jest.mock("axios");
const useSelectorMock = jest.spyOn(redux, "useSelector");

let container = null;
const component = (
  <div>
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[
          "/filter-search?Course.CourseTitle=TestTitle&Course.CourseProviderName=TestProvider&CourseInstance.CourseLevel=TestLevel&p=1",
        ]}>
        <Route path="/filter-search" component={FilterSearch} />
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

describe("Filter-Search", () => {
  it("renders search button", async () => {
    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });

    getByText("Search");
  });
  it("renders input lables", async () => {
    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });

    getByText("Course Title");
    getByText("Course Provider");
    getByText("Course Level");
    getByText("Total: 1");
  });
  it("renders correct input values", async () => {
    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });

    expect(getByPlaceholderText("Title").value).toBe("TestTitle");
    expect(getByPlaceholderText("Provider Name").value).toBe("TestProvider");
    expect(getByPlaceholderText("Course Level").value).toBe("TestLevel");
  });
  it("renders no input values when nothing is provided", async () => {
    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });

    act(() => {
      fireEvent.change(getByPlaceholderText("Title"), {
        target: { value: "" },
      });
    });
    act(() => {
      fireEvent.change(getByPlaceholderText("Provider Name"), {
        target: { value: "" },
      });
    });
    act(() => {
      fireEvent.change(getByPlaceholderText("Course Level"), {
        target: { value: "" },
      });
    });

    await act(async() => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);
      fireEvent.click(getByText("Search"));
    });

    expect(getByPlaceholderText("Title").value).toBe("");
    expect(getByPlaceholderText("Provider Name").value).toBe("");
    expect(getByPlaceholderText("Course Level").value).toBe("");
  });
  it("renders correct page value shown", async () => {
    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });
    getByText("1");
  });
  it("does not render next or back", async () => {
    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });

    expect(getByText("Next").className.includes("invisible")).toBe(true);
    expect(getByText("Back").className.includes("invisible")).toBe(true);
  });
  it("renders course title, provider and view button", async () => {
    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });

    getByText("Test Title");
    getByText("Test Provider");
    getByText("View");
  });
  it("renders no course data when noting is present", async () => {
    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.reject({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });

    expect(queryByText("Test Title")).not.toBeInTheDocument();
    expect(queryByText("Test Provider")).not.toBeInTheDocument();
    expect(queryByText("View")).not.toBeInTheDocument();
  });
  it("renders next when pages more than one", async () => {
    await act(async () => {
      let customData = { ...testData };

      for (let i = 0; i < 20; i++) {
        customData.hits.push({
          Supplemental_Ledger: {
            Instance: 1718952,
          },
          Course: {
            CourseTitle: `Test Title ${i + 1}`,
            CourseProviderName: "Test Provider",
          },
          meta: {
            id: "18fc75b9e74733ec0473477a32cb0894",
          },
        });
      }
      customData.total = 20;

      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: customData })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });

    expect(getByText("Next").className.includes("invisible")).toBe(false);
  });
  it("renders back when page number greater than one", async () => {
    function createData(start, end) {
      let customData = { ...testData };
      customData.hits = [];
      for (let i = start; i < end; i++) {
        customData.hits.push({
          Supplemental_Ledger: {
            Instance: 1718952,
          },
          Course: {
            CourseTitle: `Test Title ${i + 1}`,
            CourseProviderName: "Test Provider",
          },
          meta: {
            id: "18fc75b9e74733ec0473477a32cb0894",
          },
        });
      }
      customData.total = 19;
      return customData;
    }
    let customTestData1 = createData(10, 19);
    let customTestData2 = createData(10, 19);
    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: customTestData1 })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });

    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: customTestData2 })
      );

      fireEvent.click(getByText("Next"));
    });

    expect(getByText("Next").className.includes("invisible")).toBe(true);
    expect(getByText("Back").className.includes("invisible")).toBe(false);

    getByText("Test Title 11");
    getByText("Test Title 19");
  });
  it("renders new page with correct data after submit", async () => {
    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });

    act(() => {
      fireEvent.change(getByPlaceholderText("Title"), {
        target: { value: "New Title" },
      });
    });
    act(() => {
      fireEvent.change(getByPlaceholderText("Provider Name"), {
        target: { value: "New Provider" },
      });
    });

    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);
      fireEvent.click(getByText("Search"));
    });

    expect(getByPlaceholderText("Title").value).toBe("New Title");
    expect(getByPlaceholderText("Provider Name").value).toBe("New Provider");
    // expect(getByPlaceholderText("Course Level").value).toBe("New Level");
  });
  it("renders new page on click of view", async () => {
    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });

    act(() => {
      fireEvent.click(getAllByText("View")[0]);
    });

    expect(queryByText("Search")).not.toBeInTheDocument();
  });
  it("renders navigates back when back is clicked", async () => {
    function createData(start, end) {
      let customData = { ...testData };
      customData.hits = [];
      for (let i = start; i < end; i++) {
        customData.hits.push({
          Supplemental_Ledger: {
            Instance: 1718952,
          },
          Course: {
            CourseTitle: `Test Title ${i + 1}`,
            CourseProviderName: "Test Provider",
          },
          meta: {
            id: "18fc75b9e74733ec0473477a32cb0894",
          },
        });
      }
      customData.total = 19;
      return customData;
    }
    let customTestData1 = createData(0, 9);
    let customTestData2 = createData(10, 19);

    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: customTestData1 })
      );
      useSelectorMock.mockReturnValue(state);

      render(component, container);
    });

    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: customTestData2 })
      );

      fireEvent.click(getByText("Next"));
    });

    await act(async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: customTestData1 })
      );

      fireEvent.click(getByText("Back"));
    });
    expect(getByText("Next").className.includes("invisible")).toBe(false);
    expect(getByText("Back").className.includes("invisible")).toBe(true);

    getByText("Test Title 1");
    getByText("Test Title 9");
  });
});
