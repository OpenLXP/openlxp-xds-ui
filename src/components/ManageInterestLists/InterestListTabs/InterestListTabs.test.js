import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import axios from "axios";

import store from "../../../store/store";
import InterestListTabs from "./InterestListTabs";
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

jest.mock("axios");

describe("<InterestList />", () => {
    it("should display: my list and subscribed lists", async () => {
        const list = [];
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <InterestListTabs/>
                    </MemoryRouter>
                </Provider>,
                container
            );
        });
        expect(screen.getByText("My List")).toBeInTheDocument();
        expect(screen.getByText("Subscribed Lists")).toBeInTheDocument();
    });

});
