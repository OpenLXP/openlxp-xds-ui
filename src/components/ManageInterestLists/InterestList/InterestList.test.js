import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import axios from "axios";

import store from "../../../store/store";
import InterestList from "./InterestList";
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
                        <InterestList list={list}/>
                    </MemoryRouter>
                </Provider>,
                container
            );
        });
        expect(screen.getByText("Test list")).toBeInTheDocument();
        await act(async () => {
            const click = screen.getByText("Test list", { exact: false });
            fireEvent.click(click);
        });
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("Owner")).toBeInTheDocument();
        expect(screen.getByText("test@test.com")).toBeInTheDocument();
        expect(screen.getAllByText("Updated").length).toBe(2);
        expect(screen.getByText("01/01/2021")).toBeInTheDocument();
        expect(screen.getByText("Course Title")).toBeInTheDocument();
        expect(screen.getByText("Provider")).toBeInTheDocument();
        expect(screen.getByText("remove")).toBeInTheDocument();
    }); 

});
