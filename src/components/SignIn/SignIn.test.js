import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { StaticRouter, MemoryRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import * as redux from "react-redux";
import axios from "axios";

import store from "../../store/store";

import SignIn from "./SignIn";
import LandingPage from "../LandingPage/LandingPage";
const useSelectorMock = jest.spyOn(redux, "useSelector");
jest.mock("axios");

const useDispatchMock = jest.spyOn(redux, "useDispatch");

let container = (
  <div>
    <Provider store={store}>
      <MemoryRouter initialEntries={["/signin"]}>
        <Route path="/signin" component={SignIn} />
        <Route path="/" component={LandingPage} />
      </MemoryRouter>
    </Provider>
  </div>
);

beforeEach(() => {
  container = (
    <div>
      <Provider store={store}>
        <MemoryRouter initialEntries={["/signin"]}>
          <Switch>
            <Route Route path="/signin" component={SignIn} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </MemoryRouter>
      </Provider>
    </div>
  );
});

afterEach(() => {
  container = null;
});

describe("SignIn", () => {
  test("Should render email label", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    screen.getByText("Email");
  });

  test("Should render password label", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    screen.getByText("Password");
  });

  test("Should render sign in button", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    screen.getByText("Login");
  });

  test("Should render forgot password button", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    screen.getByText("Forgot password?");
  });

  test("Should render create button", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });
    screen.getByText("Create an account");
  });

  test("Should render error for username", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    expect(screen.getAllByText("This field is required").length).toBe(2);
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: test },
      });
    });

    screen.getByText("Username must be an email address.");
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "test@test.com" },
      });
    });

    expect(screen.getAllByText("This field is required").length).toBe(1);
  });

  test("Should render error for password", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    expect(screen.getAllByText("This field is required").length).toBe(2);
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: test },
      });
    });

    expect(screen.getAllByText("This field is required").length).toBe(1);
  });

  test("Should login user", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);

      axios.get.mockResolvedValueOnce({
        user: {
          email: "test@test.com",
          first_name: "test",
          last_name: "test",
          token: "tokeneything",
        },
      });

      render(container);
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "test@test.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "test" },
      });
      const state = {
        user: {
          email: "test@test.com",
          first_name: "test",
          last_name: "test",
          token: "tokeneything",
        },
      };
      useSelectorMock.mockReturnValue(state);
      fireEvent.click(screen.getByText("Login"));
    });

    screen.getByText("Enterprise Course Catalog*");
  });

  test("Should login user on enter", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);

      axios.get.mockResolvedValueOnce({
        user: {
          email: "test@test.com",
          first_name: "test",
          last_name: "test",
          token: "tokeneything",
        },
      });

      render(container);
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "test@test.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "test" },
      });
      const state = {
        user: {
          email: "test@test.com",
          first_name: "test",
          last_name: "test",
          token: "tokeneything",
        },
      };
      useSelectorMock.mockReturnValue(state);
      fireEvent.keyPress(screen.getByPlaceholderText("Password").parentNode, {
        key: "Enter",
        code: 13,
      });
    });

    screen.getByText("Enterprise Course Catalog*");
  });
});
