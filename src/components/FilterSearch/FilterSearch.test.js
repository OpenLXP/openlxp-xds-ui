import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import axios from "axios";
import * as redux from "react-redux";

import store from "../../store/store";
import FilterSearch from "./FilterSearch";

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

describe("<FilterSearch />", () => {
    it("should display: filter search fields", async () => {
        let state = { 
            user: { 
                email: "test@test.com" 
            },
            configuration: {
                search_results_per_page:10,
            },
        };
        const data = [{
            Metadata_Ledger: {
                Course: {
                    CourseTitle: "Title",
                    CourseProviderName: "DAU",
                },
            },
        }];
        const resp = { data: data };
        useSelectorMock.mockReturnValue(state);
        // axios.get.mockResolvedValueOnce(resp);
        axios.get.mockImplementation(() =>Promise.resolve({data: {}}));

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/filter-search?Course.CourseTitle=test&Course.CourseProviderName=DAU&CourseInstance.CourseLevel=&p=1"]}>
                        <FilterSearch />
                    </MemoryRouter>
                </Provider>,
                container
            );
        });

        await act(async () => {
            const resp = { data: data };
            useSelectorMock.mockReturnValue(state);
            // axios.get.mockResolvedValueOnce(resp);
            axios.get.mockImplementation(() =>Promise.resolve({data: {}}));
        });

        expect(screen.getByText("Course Title")).toBeInTheDocument();
        expect(screen.getByText("Course Provider")).toBeInTheDocument();
        expect(screen.getByText("Course Level")).toBeInTheDocument();
        expect(screen.getByText("Search")).toBeInTheDocument();
        // await act(async () => {
        //     const click = screen.getByText("Search", { exact: false });
        //     fireEvent.click(click);
        // });
    });
});