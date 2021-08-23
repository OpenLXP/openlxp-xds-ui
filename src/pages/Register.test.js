import { render, act, screen, fireEvent } from "@testing-library/react";
import { StaticRouter, MemoryRouter, Switch, Route } from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import * as redux from "react-redux";
import axios from "axios";

import Register from "./Register";

import store from "../store/store";

const component = (
  <div>
    <Provider store={store}>
      <MemoryRouter initialEntries={['/signup']}>
        <Register />
      </MemoryRouter>
    </Provider>
  </div>
);
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

describe("Register.js", () => {
  it("renders correct elements", () => {
    act(() => {
      useSelectorMock.mockReturnValue(state);
      render(component, container);
    });

    getByText("Sign up for your account");
    getByText("Already have an accout?");
    getByText("Sign in");
    getByText("Email");
    getByPlaceholderText("Email");
    getByText("Password");
    getByPlaceholderText("First Name");
    getByText("Last Name");
    getByPlaceholderText("Last Name");
    getByText("Password");
    getByPlaceholderText("Password");
    getByText("Create Account");
  });
  it("creates a new axios call on create account", async () => {
    act(() => {
      useSelectorMock.mockReturnValue(state);
      render(component, container);
    });
    act(() => {
      fireEvent.change(getByPlaceholderText("Email"), {
        target: { value: "test@test.com" },
      });
      fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "Password" },
      });
    });
    await act(async () => {
      let localState = {
        user: { email: "test@test.com" },
        status: "succeeded",
        error: null,
      };
      useSelectorMock.mockReturnValue(localState);
      axios.post.mockImplementation(() =>
        Promise.resolve({ data: { user: { email: "test@test.com" } } })
      );
      fireEvent.click(getByText("Create Account"));
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(!queryByText("Create Account")).toBe(false);
  } );
  
  it("triggers path change", () => {
    const history = createMemoryHistory();

    act(() => {
      useSelectorMock.mockReturnValue(state);
      render(component, container);
    });

    act(() => {
      fireEvent.click(getByText("Sign in"));
    });
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });
});
