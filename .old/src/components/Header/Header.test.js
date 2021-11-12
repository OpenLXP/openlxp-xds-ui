import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { StaticRouter, MemoryRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import * as redux from "react-redux";
import axios from "axios";

import store from "../../store/store";
import Header from "./Header";
import Home from "../../pages/Home";
import SearchResultPage from "../../pages/SearchResults";
import SearchInterestLists from "../../pages/SearchInterestLists";

const useSelectorMock = jest.spyOn(redux, "useSelector");
// const useDipatchMock = jest.spyOn(redux, "useDispatch");

jest.mock("axios");

let container = null;

beforeEach(() => {
  container = (
    <div>
      <Provider store={store}>
        <MemoryRouter initialEntries={["/signin"]}>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/searchinterestlists"
              exact
              component={SearchInterestLists}
            />

            <Route path="/search/" component={SearchResultPage} />
          </Switch>
        </MemoryRouter>
      </Provider>
    </div>
  );
});

afterEach(() => {
  container = null;
});

describe("Header", () => {
  test("Does render icon", () => {
    let state = { user: null };
    useSelectorMock.mockReturnValue(state);
    act(() => {
      render(container);
    });

    screen.getByText("DIGITAL LEARNING PORTAL");
    screen.getByText("U.S. Department of Defense");
  });

  test("Does navigate to homepage", () => {
    let state = { user: null };
    useSelectorMock.mockReturnValue(state);
    axios.get.mockImplementationOnce(() => Promise.reject());
    act(() => {
      render(container);
    });
    act(() => {
      fireEvent.click(screen.getByText("DIGITAL LEARNING PORTAL"));
    });
    screen.getByText("Enterprise Course Catalog*");
  });

  test("Does search for courses on search page", () => {
    let state = { user: null };
    useSelectorMock.mockReturnValue(state);

    axios.get.mockImplementationOnce(() => Promise.reject());
    act(() => {
      render(container);
    });
    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "test" },
    });

    fireEvent.click(screen.getByTestId("search-button"));
    screen.getByText("test", { exact: false });
  });

  test("Does search for courses on enter", () => {
    let state = { user: null };
    useSelectorMock.mockReturnValue(state);

    axios.get.mockImplementationOnce(() => Promise.reject());
    act(() => {
      render(container);
    });

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "test" },
    });

    fireEvent.keyPress(screen.getByPlaceholderText("Search"), {
      key: "Enter",
      charCode: 13,
    });
    screen.getByText("test", { exact: false });
  });

  test("Does render sign in button", () => {
    let state = { user: null };
    useSelectorMock.mockReturnValue(state);
    act(() => {
      render(container);
    });

    screen.getByText("Sign in");
  });

  test("Does render user button", async () => {
    let state = { user: { email: "test@test.com" } };
    useSelectorMock.mockReturnValue(state);
    act(() => {
      render(container);
    });
    screen.getByText("test@test.com");
  });

  test("Does render user info", async () => {
    let state = { user: { email: "test@test.com" } };
    useSelectorMock.mockReturnValue(state);
    act(() => {
      render(container);
    });
    screen.getByText("test@test.com");
  });

  test("Does render sign in after sign out", async () => {
    let state = { user: { email: "test@test.com", token: "sometoken" } };
    useSelectorMock.mockReturnValueOnce(state);
    await act(async () => {
      render(container);
    });

    act(() => {
      fireEvent.click(screen.getByText("test@test.com"));
    });

    axios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));
    useSelectorMock.mockReturnValue({ user: null });

    await act(async () => {
      fireEvent.click(screen.getByText("Logout"));
    });

    // console.log(axios);

    expect(axios.post).toBeCalled();
  });

  test("Does render search", async () => {
    let state = { user: { email: "test@test.com" } };
    useSelectorMock.mockReturnValue(state);
    await act(async () => {
      render(container);
    });

    act(() => {
      fireEvent.change(screen.getByPlaceholderText("Search"), {
        target: { value: "test" },
      });
    });

    expect(screen.getByPlaceholderText("Search").value).toBe("test");
  });

  test("does navigate to Search Interest Lists", async () => {
    let state = { user: { email: "test@test.com" } };
    useSelectorMock.mockReturnValue(state);
    await act(async () => {
      render(container);
    });

    act(() => {
      fireEvent.click(screen.getByText("test@test.com"));
    });

    act(() => {
      fireEvent.click(screen.getByText("Search Interest Lists"));
    });

    screen.getByPlaceholderText("Search");
  });
});
