import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
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
    it("should display: lists and list data ", async () => {
        let state = { user: { email: "test@test.com" } };
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
        const data = {
            Metadata_Ledger: {
                Course: {
                    CourseTitle: "Title",
                    CourseProviderName: "DAU",
                },
            },
        };
        const resp = { data: data };
        useSelectorMock.mockReturnValue(state);
        axios.get.mockResolvedValueOnce(resp);
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <InterestList list={list} />
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

    it("should display: change title and close list ", async () => {
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
        const data = {
            Metadata_Ledger: {
                Course: {
                    CourseTitle: "Title",
                    CourseProviderName: "DAU",
                },
            },
        };
        const resp = { data: data };
        useSelectorMock.mockReturnValue(state);
        axios.get.mockResolvedValueOnce(resp);
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <InterestList list={list} />
                    </MemoryRouter>
                </Provider>,
                container
            );
        });
        expect(screen.getByText("Test list")).toBeInTheDocument();
        await act(async () => {
            fireEvent.click(screen.getByText("Test list"));
        });
        await act(async () => {
            fireEvent.click(screen.getByText("Edit"));
        });
        await fireEvent.change(
            screen.getByPlaceholderText("Test list"),
            { target: { value: "new list" } }
        );

        expect(screen.getByPlaceholderText("new list"));
        await act(async () => {
            fireEvent.click(screen.getByText("new list"));
        });

    });

    it("should display: courses ", async () => {
        let state = { user: { email: "test@test.com" } };
        const list = {
            id: 12,
            name: "Test list",
            courses: {
                id: "1234",
            },
            owner: {
                email: "test@test.com",
            },
            modified: "01/01/2021",

        };
        const courseList = {
            "id": 3,
            "owner": {
                "id": 2,
                "email": "test@test.com",
                "first_name": "test",
                "last_name": "user"
            },
            "subscribers": [],
            "created": "2021-07-23T16:38:12.664612Z",
            "modified": "2021-07-26T18:20:25.460300Z",
            "description": "Data",
            "name": "Markings",
            "experiences": [
                {
                    "Metadata_Ledger": {
                        "Course": {
                            "CourseURL": "www.test.com",
                            "CourseCode": "1234",
                            "CourseType": "Test Type",
                            "CourseTitle": "Fake Title",
                            "CourseProviderName": "ECC",
                            "CourseShortDescription": "Fake desc",
                            "EstimatedCompletionTime": 5
                        }
                    },
                    "Supplemental_Ledger": {
                        "Instance": 1733998
                    },
                    "meta": {
                        "id": "000e893d-5741-4c07-8dd8-2e3d9fa4b862",
                        "metadata_key_hash": "7580c14f18ef647d99bbe9094e2fd35b"
                    }
                },
            ]
        };
        const resp = { data: courseList };
        useSelectorMock.mockReturnValue(state);
        axios.get.mockResolvedValue(resp);
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <InterestList list={list} />
                    </MemoryRouter>
                </Provider>,
                container
            );
        });
        expect(screen.getByText("Test list")).toBeInTheDocument();
        await act(async () => {
            fireEvent.click(screen.getByText("Test list"));
        });

        screen.getByText("Fake Title");
        screen.getByText("ECC");

        await act(async () => {
            fireEvent.click(screen.getByTestId("courseRemove"));
        }); 

    });
    it("should display: close modal ", async () => {
        let state = { user: { email: "test@test.com" } };
        const list = {
            name: "Test list",
            courses: {
                id: "1234",
                CourseTitle: "Title",
                CourseProviderName: "DAU",
            },
            owner: {
                email: "test@test.com",
            },
            modified: "01/01/2021",

        };
        const data = {
            "experiences": [
                {
                    "Metadata_Ledger": {
                        "Course": {
                            "CourseURL": "www.test.com",
                            "CourseCode": "1234",
                            "CourseType": "Test Type",
                            "CourseTitle": "Fake Title",
                            "CourseProviderName": "ECC",
                            "CourseShortDescription": "Fake desc",
                            "EstimatedCompletionTime": 5
                        }
                    },
                    "Supplemental_Ledger": {
                        "Instance": 1733998
                    },
                    "meta": {
                        "id": "000e893d-5741-4c07-8dd8-2e3d9fa4b862",
                        "metadata_key_hash": "7580c14f18ef647d99bbe9094e2fd35b"
                    }
                },
            ]
        };
        const resp = { data: data };
        useSelectorMock.mockReturnValue(state);
        axios.get.mockResolvedValueOnce(resp);
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <InterestList list={list} />
                    </MemoryRouter>
                </Provider>,
                container
            );
        });
        await act(async () => {
            fireEvent.click(screen.getByText("Test list"));
        });
        await act(async () => {
            fireEvent.click(screen.getByText("Test list"));
        });
    });

    it("should display and edit description", async () => {
        let state = { user: { email: "test@test.com" } };
        const list = {
            name: "Test list",
            description: "Course description",
            courses: {
                id: "1234",
                CourseTitle: "Title",
                CourseProviderName: "DAU",
            },
            owner: {
                email: "test@test.com",
            },
            modified: "01/01/2021",

        };
        const data = {
            "name": "test",
            "despription": "test desc",
            "experiences": [
                {
                    "Metadata_Ledger": {
                        "Course": {
                            "CourseURL": "www.test.com",
                            "CourseCode": "1234",
                            "CourseType": "Test Type",
                            "CourseTitle": "Fake Title",
                            "CourseProviderName": "ECC",
                            "CourseShortDescription": "Fake desc",
                            "EstimatedCompletionTime": 5
                        }
                    },
                    "Supplemental_Ledger": {
                        "Instance": 1733998
                    },
                    "meta": {
                        "id": "000e893d-5741-4c07-8dd8-2e3d9fa4b862",
                        "metadata_key_hash": "7580c14f18ef647d99bbe9094e2fd35b"
                    }
                },
                {
                    "Metadata_Ledger": {
                        "Course": {
                            "CourseURL": "www.test.com",
                            "CourseCode": "12345",
                            "CourseType": "Test Type",
                            "CourseTitle": "Fake Title 2",
                            "CourseProviderName": "ECC",
                            "CourseShortDescription": "Fake desc",
                            "EstimatedCompletionTime": 5
                        }
                    },
                    "Supplemental_Ledger": {
                        "Instance": 1733998
                    },
                    "meta": {
                        "id": "123test",
                        "metadata_key_hash": "test123"
                    }
                },
            ]
        };
        const resp = { data: data };
        useSelectorMock.mockReturnValue(state);
        axios.get.mockResolvedValue(resp);
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <InterestList list={list} />
                    </MemoryRouter>
                </Provider>,
                container
            );
        });
        expect(screen.getByText("Test list")).toBeInTheDocument();
        await act(async () => {
            fireEvent.click(screen.getByText("Test list"));
        });
        await act(async () => {
            fireEvent.click(screen.getByText("Edit"));
        });

        await act(async () => {
            let user = {
                email: "test@test.com"
            };
            const data = {
                "name": "test",
                "despription": "test desc",
                "experiences": [],
            }
            let state = { user: user, list: list };
            useSelectorMock.mockReturnValue(state);
            axios.patch.mockImplementationOnce(() => Promise.resolve({ data: data }));
            fireEvent.click(screen.getByText("Update"));
        });
    });
});
