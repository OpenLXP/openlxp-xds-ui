import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import axios from "axios";

import store from "../../store/store";
import ManageInterestLists from "./ManageInterestLists";
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
    it("should display: lists and list data ", async () => {
        const list = {
            name: "Test list",
            courses: {
                id: "1234",
            },
            owner: {
                email: "test@test.com",
            },
            modified: "01/01/2021",
        
        };
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <ManageInterestLists list={list}/>
                    </MemoryRouter>
                </Provider>,
                container
            );
        });
        expect(screen.getByText("Manage Interest List")).toBeInTheDocument();
    }); 

});
