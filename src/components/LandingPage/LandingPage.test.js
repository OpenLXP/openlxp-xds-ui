import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "./LandingPage";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import store from "../../store/store";

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


describe("<LandingPage />", () => {

    it("should display: header, subheader, and spotlight section", () => {
        act(() => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <LandingPage />
                    </MemoryRouter>
                </Provider>,
                container
            );
        });
        expect(
            screen.getByText("Enterprise Course Catalog", { exact: false })
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                "This catalog lets you search for all DoD " +
                    "unclassified training and education courses, seminars, " +
                    "instructional resources and more."
            )
        ).toBeInTheDocument();
        expect(screen.getByText("Spotlight")).toBeInTheDocument();
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should show user input on the search bar", async () => {
        act(() => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <LandingPage />
                    </MemoryRouter>
                </Provider>,
                container
            );

            const input = screen.getByTestId("landing-search");

            expect(input.value).toBe("");
            fireEvent.change(input, { target: { value: "Hello" } });
        });

        screen.getByDisplayValue("Hello")
    });
});
