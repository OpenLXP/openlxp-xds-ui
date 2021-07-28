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
let state = {user: {email: "test@test.com"}};

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
        let state = {user: {email: "test@test.com"}};
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
                        <InterestList list={list}/>
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
            {target:{value:"new list"}}
        );

        expect(screen.getByPlaceholderText("new list"));
        await act(async () => {
            fireEvent.click(screen.getByText("new list"));
        });
        
    }); 

    it("should display: courses ", async () => {
        let state = {user: {email: "test@test.com"}};
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
                            "CourseURL": "https://jkodirect.jten.mil/html/COI.xhtml?course_prefix=CES&course_number=-103",
                            "CourseCode": "CES-103",
                            "CourseType": "SCORM 2004",
                            "CourseTitle": "Cyber Excepted Service (CES) Department of Defense (DoD) HR Elements (5 hrs)",
                            "CourseProviderName": "JKO",
                            "CourseShortDescription": "The Cyber Excepted Service (CES) Department of Defense (DoD) HR Elements Course is a ten-hour interactive module-based course that has been designed to provide HR Practitioners with the knowledge and tools to operationalize the new CES policies and procedures.  Along with providing an overview of key attributes and implementation process for the new personnel system, this course includes the following lesson modules:  Occupational Structure (CES-103-1), Employment and Placement (CES-103-2), Compensation Administration (CES-103-3), Performance Management (CES-103-4), and Performance and Conduct Actions (CES-103-5).  This course will equip the HR Practitioners (HR Officers, Specialists, Personnel Action Processors, and Liaisons) with the requisite knowledge to serve as a CES advisor for leaders, managers/supervisors, and employees in their organizations.",
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
        useSelectorMock.mockReturnValue({ courseList: courseList });
        axios.get.mockReturnValue({ courseList: courseList });
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
            fireEvent.click(screen.getByText("Test list"));
        });
        
        // screen.getByText("Title");
        // screen.getByText("DAU");
    }); 
    it("should display: close modal ", async () => {
        let state = {user: {email: "test@test.com"}};
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
            "courses": [
                {
                    "Metadata_Ledger": {
                        "Course": {
                            "CourseURL": "https://jkodirect.jten.mil/html/COI.xhtml?course_prefix=CES&course_number=-103",
                            "CourseCode": "CES-103",
                            "CourseType": "SCORM 2004",
                            "CourseTitle": "Cyber Excepted Service (CES) Department of Defense (DoD) HR Elements (5 hrs)",
                            "CourseProviderName": "JKO",
                            "CourseShortDescription": "The Cyber Excepted Service (CES) Department of Defense (DoD) HR Elements Course is a ten-hour interactive module-based course that has been designed to provide HR Practitioners with the knowledge and tools to operationalize the new CES policies and procedures.  Along with providing an overview of key attributes and implementation process for the new personnel system, this course includes the following lesson modules:  Occupational Structure (CES-103-1), Employment and Placement (CES-103-2), Compensation Administration (CES-103-3), Performance Management (CES-103-4), and Performance and Conduct Actions (CES-103-5).  This course will equip the HR Practitioners (HR Officers, Specialists, Personnel Action Processors, and Liaisons) with the requisite knowledge to serve as a CES advisor for leaders, managers/supervisors, and employees in their organizations.",
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
                        <InterestList list={list}/>
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
});
