import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import * as redux from "react-redux";

import store from "../../store/store";
import SearchInterestLists from "./SearchInterestLists";

let container = null;
const useSelectorMock = jest.spyOn(redux, "useSelector");
let state = { user: { email: "test@test.com" } };

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

jest.mock("axios");

describe("<SearchInterestLists />", () => {
  it("should display: interest lists to subscribe and unsubscribe to", async () => {
    let state = {
      user: {
        email: "test@test.com",
      },
      configuration: {
        search_results_per_page: 10,
      },
    };
    const data = [{
      id: 1,
      owner: {
        id: 2,
        email: "test@test.com",
        first_name: "T",
        last_name: "T",
      },
      subscribers: [],
      description: "Description",
      name: "Interest List",
      experiences: ["12345", "undefined"],
    }];
    const resp = { data: data };
    useSelectorMock.mockReturnValue(state);
    // axios.get.mockResolvedValueOnce(resp);
    axios.get.mockImplementation(() => Promise.resolve({ data: data}));
    axios.get.mockImplementation(() => Promise.resolve({ data: data}));

    const owner = {
      email: "test@test.com",
    };
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <SearchInterestLists />
          </MemoryRouter>
        </Provider>,
        container
      );
    });

    expect(screen.getByText("prev")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("next")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Search for interest lists")
    ).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText("Search for interest lists"), {
      target: { value: "test" },
    });
  });
  
  it("should error in api call", async () => {
    let state = {
      user: {
        email: "test@test.com",
      },
      configuration: {
        search_results_per_page: 1,
      },
    };
    const data = [{
        id: 1,
        owner: {
          id: 2,
          email: "test@test.com",
          first_name: "T",
          last_name: "T",
        },
        subscribers: [],
        description: "Description",
        name: "Interest List",
        experiences: ["12345", "undefined"],
      },
      {
        id: 1,
        owner: {
          id: 2,
          email: "test@test.com",
          first_name: "T",
          last_name: "T",
        },
        subscribers: [],
        description: "Description",
        name: "Interest List 2",
        experiences: ["12345", "undefined"],
      }
    ];
    const resp = { data: data };
    useSelectorMock.mockReturnValue(state);
    // axios.get.mockResolvedValueOnce(resp);
    axios.get.mockImplementation(() => Promise.reject({ data: data}));
    axios.get.mockImplementation(() => Promise.reject({ data: data}));

    const owner = {
      email: "test@test.com",
    };
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <SearchInterestLists />
          </MemoryRouter>
        </Provider>,
        container
      );
    });

    expect(screen.queryByText("Interst List")).not.toBeInTheDocument();
    expect(axios.get).toHaveBeenCalled();
  });

  it("should render next/prev buttons and functionality", async () => {
    let state = {
      user: {
        email: "test@test.com",
      },
      configuration: {
        search_results_per_page: 1,
      },
    };
    const data = [{
        id: 1,
        owner: {
          id: 2,
          email: "test@test.com",
          first_name: "T",
          last_name: "T",
        },
        subscribers: [],
        description: "Description",
        name: "Interest List",
        experiences: ["12345", "undefined"],
      },
      {
        id: 1,
        owner: {
          id: 2,
          email: "test@test.com",
          first_name: "T",
          last_name: "T",
        },
        subscribers: [],
        description: "Description",
        name: "Interest List 2",
        experiences: ["12345", "undefined"],
      }
    ];
    const resp = { data: data };
    useSelectorMock.mockReturnValue(state);
    // axios.get.mockResolvedValueOnce(resp);
    axios.get.mockImplementation(() => Promise.reject({ data: data}));
    axios.get.mockImplementation(() => Promise.reject({ data: data}));

    const owner = {
      email: "test@test.com",
    };
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <SearchInterestLists />
          </MemoryRouter>
        </Provider>,
        container
      );
    });

    await act(async () => {
        axios.get.mockImplementation(() =>resolve({ data: data}));
        const click = screen.getByText("Next", { exact: false });
        fireEvent.click(click);
    });
    expect(screen.getByText("2")).toBeInTheDocument();

    await act(async () => {
        axios.get.mockImplementation(() =>resolve({ data: data}));
        const click = screen.getByText("prev", { exact: false });
        fireEvent.click(click);
    });
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
