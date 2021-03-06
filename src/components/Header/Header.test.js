import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { StaticRouter, MemoryRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import * as redux from "react-redux";

import store from "../../store/store";

import Header from "./Header";
import LandingPage from "../LandingPage/LandingPage";
import SearchResultPage from "../SearchResultsPage/SearchResultsPage";

const useSelectorMock = jest.spyOn(redux, "useSelector");

let container = null;

beforeEach(() => {
    container = (
        <div>
            <Provider store={store}>
                <MemoryRouter initialEntries={["/signin"]}>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={LandingPage} />

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

    test("Does render sign out button", async () => {
        let state = { user: { email: "test@test.com" } };
        useSelectorMock.mockReturnValue(state);
        act(() => {
            render(container);
        });
        screen.getByText("Sign out");
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
        let state = { user: { email: "test@test.com" } };
        useSelectorMock.mockReturnValue(state);
        await act(async () => {
            render(container);
        });

        act(() => {
            fireEvent.click(screen.getByText("Sign out"));
        });
        screen.getByText("Sign in");
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
});