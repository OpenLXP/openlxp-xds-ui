import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { StaticRouter, MemoryRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import * as redux from "react-redux";
import axios from "axios";

import store from "../../store/store";

import SignUp from "./SignUp";
import SignIn from "../SignIn/SignIn";
import LandingPage from "../LandingPage/LandingPage";

const useSelectorMock = jest.spyOn(redux, "useSelector");
jest.mock("axios");

let container = null;

beforeEach(() => {
  container = (
    <div>
      <Provider store={store}>
        <MemoryRouter initialEntries={["/signup"]}>
          <Switch>
            <Route Route path="/signup" component={SignUp} />
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

describe("SignUp", () => {
  test("Should render email label", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    screen.getByText("Email");
  });

  test("Should render First name label", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    screen.getByText("First Name");
  });

  test("Should render Last name label", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    screen.getByText("Last Name");
  });

  test("Should render password label", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    screen.getByText("Password");
  });

  test("Should render Sign in button", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    screen.getByText("Sign in");
  });

  test("Should render create account button", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });
    screen.getByText("Create account");
  });

  test("Should render error for username", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
      fireEvent.click(screen.getByText("Create account"), {});
    });

    expect(screen.getAllByText("This field is required").length).toBe(2);
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "test" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "test@test.com" },
      });

      fireEvent.click(screen.getByText("Create account"));
    });

    screen.getByText("Email must be an email address.");
    expect(screen.getAllByText("This field is required").length).toBe(1);
  });

  test("Should render error for password", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "" },
      });

      fireEvent.click(screen.getByText("Create account"));
    });
    // screen.getByText('This field is required.')

    expect(screen.getAllByText("This field is required").length).toBe(2);
  });

  test("Should create user", async () => {
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
      fireEvent.click(screen.getByText("Create account"));
    });

    screen.getByText("Enterprise Course Catalog*");
  });

  test("Should create user on enter", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    act(() => {
      fireEvent.keyPress(screen.getByPlaceholderText("Password"), {
        key: "Enter",
        charCode: 13,
      });
    });

    expect(screen.getAllByText("This field is required").length).toBe(2);
  });

  test("Should navigate user to signin page", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    act(() => {
      fireEvent.click(screen.getByText("Sign in"));
    });

    screen.getByText("Sign in to your account");
  });
  test("Should show error for password being less than 8 chars", async () => {
    await act(async () => {
      let state = { user: null };
      useSelectorMock.mockReturnValue(state);
      render(container);
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByText("Create account"));

    screen.getByText("The password must contain at least 8 characters", {
      exact: false,
    });
  });
});
