import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { StaticRouter } from "react-router-dom";
import * as redux from "react-redux";
import axios from "axios";
import { Provider } from "react-redux";

import store from "../store/store";

import Login from "./Login";

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

describe("Login", () => {
  it("renders elements", () => {
    act(() => {
      useSelectorMock.mockReturnValue(state);
      render(
        <Provider store={store}>
          <StaticRouter>
            <Login />
          </StaticRouter>
        </Provider>,
        container
      );
    });
    getByText("Sign in to your account");
    getByText("or");
    getByText("Create an account");
    getByText("Username");
    getByText("Password");
    getByText("Forgot Password?");
    getByPlaceholderText("Email");
    getByPlaceholderText("Password");
    getByText("Login");
  });
  it("navigates to new page", () => {
    act(() => {
      useSelectorMock.mockReturnValue(state);
      render(
        <Provider store={store}>
          <StaticRouter>
            <Login />
          </StaticRouter>
        </Provider>,
        container
      );
    });
    act(() => {
      fireEvent.click(getByText("Create an account"));
    });

    expect(!queryByText("Sign in to your account")).toBe(false);
  });
  it("console logs on click", () => {
    console.log = jest.fn();

    act(() => {
      useSelectorMock.mockReturnValue(state);
      render(
        <Provider store={store}>
          <StaticRouter>
            <Login />
          </StaticRouter>
        </Provider>,
        container
      );
    });
    act(() => {
      fireEvent.click(getByText("Forgot Password?"));
    });

    expect(console.log).toHaveBeenCalled();
  });
  it("does call axios and navigates away from page", async () => {
    console.log = jest.fn();

    act(() => {
      useSelectorMock.mockReturnValue(state);
      render(
        <Provider store={store}>
          <StaticRouter>
            <Login />
          </StaticRouter>
        </Provider>,
        container
      );
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
      state = {
        user: { email: "test@test.com" },
        status: "succeeded",
        error: null,
      };
      useSelectorMock.mockReturnValue(state);
      axios.post.mockImplementation(() =>
        Promise.resolve({ data: { user: { email: "test@test.com" } } })
      );
      fireEvent.click(getByText("Login"));
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(!queryByText("Sign in to your account")).toBe(false);
  });
});
