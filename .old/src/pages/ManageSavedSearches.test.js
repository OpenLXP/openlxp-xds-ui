import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { StaticRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import * as redux from "react-redux";
import axios from "axios";
import { Provider } from "react-redux";

import store from "../store/store";

import ManageSavedSearches from "./ManageSavedSearches";

let state = { user: null, status: "idle", error: null };

//MOCKS
const useSelectorMock = jest.spyOn(redux, "useSelector");
jest.mock("axios");

// tools to test with
let { getByText, getByPlaceholderText, queryByText } = screen;

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

describe("ManageSavedSearches", () => {
  it("renders correct elements", () => {
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

    act(() => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: testData })
      );
      useSelectorMock.mockReturnValue(state);
      render(
        <Provider store={store}>
          <StaticRouter>
            <ManageSavedSearches />
          </StaticRouter>
        </Provider>,
        container
      );
      
    });
    getByText("Your Saved Searches");
    
  });
  
});
