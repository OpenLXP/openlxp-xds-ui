import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import * as redux from "react-redux";

import store from "../../../store/store";
import InterestList from "./InterestList";

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
    it("should display: interest lists to subscribe and unsubscribe to", async () => {
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
        axios.patch.mockImplementation(() =>Promise.resolve({data: {}}));

        const owner = {
            email: "test@test.com",
        }
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter >
                        <InterestList owner={owner}/>
                    </MemoryRouter>
                </Provider>,
                container
            );
        });

        expect(screen.getByText("test@test.com")).toBeInTheDocument();
        expect(screen.getByText("Subscribe")).toBeInTheDocument();
        await act(async () => {
            axios.patch.mockImplementation(() =>Promise.resolve({data: {}}));
            const click = screen.getByText("Subscribe", { exact: false });
            fireEvent.click(click);
        });
        expect(screen.getByText("Unsubscribe")).toBeInTheDocument();
        await act(async () => {
            axios.patch.mockImplementation(() =>Promise.resolve({data: {}}));
            const click = screen.getByText("Unsubscribe", { exact: false });
            fireEvent.click(click);
        });
    });

    it("should test error catching", async () => {
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
        const owner = {
            email: "test@test.com",
        }
        const resp = { data: data };
        useSelectorMock.mockReturnValue(state);
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter >
                        <InterestList owner={owner}/>
                    </MemoryRouter>
                </Provider>,
                container
            );
        });

        expect(screen.getByText("test@test.com")).toBeInTheDocument();
        expect(screen.getByText("Subscribe")).toBeInTheDocument();
        await act(async () => {
            axios.patch.mockImplementationOnce(() => Promise.reject());
            const click = screen.getByText("Subscribe", { exact: false });
            fireEvent.click(click);
        });
        await act(async () => {
            axios.patch.mockImplementation(() =>Promise.resolve({data: {}}));
            const click = screen.getByText("Subscribe", { exact: false });
            fireEvent.click(click);
        });
        await act(async () => {
            axios.patch.mockImplementation(() =>Promise.reject());
            const click = screen.getByText("Unsubscribe", { exact: false });
            fireEvent.click(click);
        });
    });
});