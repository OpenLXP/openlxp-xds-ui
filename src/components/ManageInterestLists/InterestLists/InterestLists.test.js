import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import axios from "axios";

import store from "../../../store/store";
import InterestLists from "./InterestLists";
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

describe("<InterestLists />", () => {
    it("should display: lists and list data ", async () => {
        const list = {
            name: "Test list",
            courses: ["12344342br3","300ff07edb21c0c013d53c9e5c76fb96","3241553c74928e80c1b82aca212c8e8a"],
            owner: {
                email: "test@test.com",
            },
            modified: "01/01/2021",
        
        };
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <InterestLists list={list}/>
                    </MemoryRouter>
                </Provider>,
                container
            );
        });
        // expect(screen.getByText("Test list")).toBeInTheDocument();
        // await act(async () => {
        //     const click = screen.getByText("Test list", { exact: false });
        //     fireEvent.click(click);
        // });
    }); 

});
