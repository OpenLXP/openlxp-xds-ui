import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import store from "../../store/store";
import { MemoryRouter, StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as redux from "react-redux";

import CourseInformation from "./CourseInformation";
import axios from "axios";

let container = null;
let state = null;
let courseObj = null;
const useSelectorMock = jest.spyOn(redux, "useSelector");

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    courseObj = {
        Course: {
            CourseTitle: "Title1",
            CourseFullDescription: "Random Course Description",
            DepartmentName: "Department1",
        },
        meta: {
            id: 51,
        },
    };
    state = {
        configuration: {
            id: 1,
            search_sort_options: [
                {
                    display_name: "Course Date",
                    field_name: "Lifecycle.CourseDate",
                    active: true,
                    xds_ui_configuration: 1,
                },
            ],
            course_highlights: [
                {
                    display_name: "Start Date",
                    field_name: "GeneralInformation.StartDate",
                    active: true,
                    xds_ui_configuration: 1,
                    highlight_icon: "clock",
                },
            ],
            course_information: {
                course_title: "Course.CourseTitle",
                course_description: "Course.CourseDescription",
                course_url: "CourseInstance.CourseURL",
            },
            created: "2021-05-20T01:24:29.082370Z",
            modified: "2021-05-20T13:10:35.608284Z",
            search_results_per_page: 10,
            course_img_fallback: "/media/images/elearning_KpJuxw0.jpeg",
        },
        status: "succeeded",
        error: null,
    };
    useSelectorMock.mockClear();
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

jest.mock("axios");

describe("CourseInformation", () => {
    it("should render course when given data", async () => {
        let data = {
            hits: [
                {
                    Course: {
                        CourseTitle: "Title1",
                        CourseProviderName: "Provider1",
                        DepartmentName: "Department1",
                    },
                    Technical_Information: {
                        Thumbnail: "Test",
                    },
                    meta: {
                        index: "test-index",
                        id: "1",
                        score: 1,
                        doc_type: "_doc",
                    },
                },
            ],
            total: 1,
        };
        const resp = { data: data };
      useSelectorMock.mockReturnValue(state);
      
      axios.get.mockImplementationOnce(() => Promise.resolve());
        axios.get.mockResolvedValueOnce(resp);

        await act(async () => {
            render(
                <Provider store={store}>
                    <StaticRouter
                        location={{
                            pathname: "/course",
                            state: { expObj: data.hits[0] },
                        }}
                    >
                        <CourseInformation />
                    </StaticRouter>
                </Provider>,
                container
            );
        });

        screen.getByText("Related");
        expect(screen.getAllByText("Title1").length).toBe(2);
        expect(screen.getAllByText("Provider1").length).toBe(1);
        expect(screen.getAllByText("Department1").length).toBe(1);
    });
});
