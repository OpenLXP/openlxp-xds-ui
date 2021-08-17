import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import * as redux from "react-redux";

import store from "../../../store/store";
import UserMenu from "./UserMenu";

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

describe("<InterestList />", () => {
    it("should display: lists and list data ", async () => {
        let state = { user: { email: "test@test.com" } };
        const userMenuItems = [
            {
              title: "Logout",
              url: "/",
              icon: "",
              func: () => {
                dispatch(logoutUser(user));
                dispatch(removeLists());
              },
            },
            { title: "Profile", url: "/", icon: "" },
            {
              title: "Search Interest Lists",
              url: "/searchinterestlists",
              icon: "",
              func: () => {
                history.push("/searchinterestlists");
              },
            },
            {
              title: "Manage Interests",
              url: "/",
              icon: "",
              func: () => {
                history.push("/manageinterestlists");
              },
            },
            {
              title: "Filter Search",
              url: "/",
              icon: "",
              func: () => {
                history.push("/filter-search");
              },
            },
            { title: "Favorites", url: "/", icon: "" },
        ];

        useSelectorMock.mockReturnValue(state);
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <UserMenu username={state.user.email} menuItems={userMenuItems} />
                    </MemoryRouter>
                </Provider>,
                container
            );
        });
        expect(screen.getByText("test@test.com")).toBeInTheDocument();
        await act(async () => {
            const click = screen.getByText("test@test.com", { exact: false });
            fireEvent.click(click);
        });
        expect(screen.getByText("Logout")).toBeInTheDocument();
        expect(screen.getByText("Profile")).toBeInTheDocument();
        expect(screen.getByText("Manage Interests")).toBeInTheDocument();
        expect(screen.getByText("Filter Search")).toBeInTheDocument();
        expect(screen.getByText("Favorites")).toBeInTheDocument();
        await act(async () => {
            const click = screen.getByText("Manage Interests", { exact: false });
            fireEvent.click(click);
        });
    });
    
});
