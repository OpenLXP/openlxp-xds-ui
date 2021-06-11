import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { StaticRouter, MemoryRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import * as redux from "react-redux";
import axios from "axios";

import store from "../../store/store";

import SignIn from "./SignIn";
import SignUp from "../SignUp/SignUp";
import LandingPage from "../LandingPage/LandingPage";

const useSelectorMock = jest.spyOn(redux, "useSelector");
jest.mock("axios");

let container = (
  <div>
    <Provider store={store}>
      <MemoryRouter initialEntries={["/signin"]}>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
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
            <Route path="/signup" component={SignUp} />
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
  test("Should render", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    screen.getByText("Sign in to your account");
    screen.getByText("Create an account");
    screen.getByText("Email");
    screen.getByText("Password");
    screen.getByText("Forgot password?");
    screen.getByText("Login");
  });

  test("Should render error for username", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByText("Login"));

    screen.getByText("This field is required");
  });

  test("Should render username error; not an email", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByText("Login"));

    screen.getByText("Username must be an email address.");
  });

  test("Should render error for password", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
      fireEvent.click(screen.getByText("Login"), {});
    });
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "" },
      });

      fireEvent.click(screen.getByText("Login"));
    });
    expect(screen.getAllByText("This field is required").length).toBe(2);
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
      fireEvent.keyPress(screen.getByPlaceholderText("Password"), {
        key: "Enter",
        charCode: 13,
      });
    });

    screen.getByText("Enterprise Course Catalog*");
  });

  test("should navigate to signup page", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });
    await act(async () => {
      fireEvent.click(screen.getByText("Create an account"));
    });
    screen.getByText("Sign up for your account");
  });
});
