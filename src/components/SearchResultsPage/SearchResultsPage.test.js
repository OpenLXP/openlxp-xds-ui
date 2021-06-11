import React from "react";
import { unmountComponentAtNode } from "react-dom";
import {
    act,
    render,
    screen,
    fireEvent,
    queryByAttribute,
} from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as redux from "react-redux";
import userEvent from "@testing-library/user-event";
import { domNode } from "react-dom";

import SearchResultsPage from "../SearchResultsPage/SearchResultsPage";
import {
    getKeywordParam,
    getPage,
    getUpdatedSearchQuery
} from "../SearchResultsPage/SearchResultsPage";
import store from "../../store/store";

jest.mock("axios");
// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useLocation: () => ({
//       pathname: "localhost:3000/search/",
//       search: "?kw=business"
//     })
//   }));

describe("<SearchResultsPage />", () => {
    let container = null;
    let state = null;
    const useSelectorMock = jest.spyOn(redux, "useSelector");

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
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
        state = null;
    });

    it("returns no results from API", async () => {
        const data = {
            hits: [],
            total: 0,
        };
        const resp = { data: data };
        useSelectorMock.mockReturnValue(state);
        axios.get.mockResolvedValueOnce(resp);
        const noResultText =
            'Sorry, we couldn\'t find any results for "business"';

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter
                        initialEntries={["/search/?keyword=business"]}
                    >
                        <SearchResultsPage />
                    </MemoryRouter>
                </Provider>,

                container
            );
        });
        expect(
            screen.getByText('0 results for "business"', { exact: false })
        ).toBeInTheDocument();
        expect(
            screen.getByText(noResultText, { exact: false })
        ).toBeInTheDocument();
    });

    it("should show user input on the search bar", async () => {
        const data = {
            hits: [],
            total: 0,
        };
        const resp = { data: data };
        useSelectorMock.mockReturnValue(state);
        axios.get.mockResolvedValueOnce(resp);
        const noResultText =
            'Sorry, we couldn\'t find any results for "business"';

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <SearchResultsPage />
                    </MemoryRouter>
                </Provider>,

                container
            );
        });

        await userEvent.type(
            screen.getByPlaceholderText("Search for anything"),
            "Hello"
        );
        const input = screen.getByPlaceholderText("Search for anything");
        fireEvent.keyPress(input, { key: "Enter", code: 13 });

        expect(screen.getByDisplayValue("Hello")).toBeInTheDocument();
    });
    
    it("should show user input on the search bar", async () => {
        const data = {
            hits: [],
            total: 0,
        };
        const resp = { data: data };
        useSelectorMock.mockReturnValue(state);
        axios.get.mockResolvedValueOnce(resp);
        const noResultText =
            'Sorry, we couldn\'t find any results for "business"';

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <SearchResultsPage />
                    </MemoryRouter>
                </Provider>,

                container
            );
        });

        await userEvent.type(
            screen.getByPlaceholderText("Search for anything"),
            "Hello"
        );
        const input = screen.getByPlaceholderText("Search for anything");
        fireEvent.keyPress(input, { key: "Enter", code: 13 });

        expect(screen.getByDisplayValue("Hello")).toBeInTheDocument();
    });

    it("should display exp preview panels when API returns data", async () => {
        const data = {
            hits: [
                {
                    Course: {
                        CourseProviderName: "TEST",
                        DepartmentName: "TEST",
                        EducationalContext: " ",
                        CourseCode: "Random_code",
                        CourseTitle: "Test Course 1",
                        CourseDescription: "Test Description",
                        CourseAudience: "Test_audience",
                        CourseSectionDeliveryMode: "Online",
                    },
                    Lifecycle: {
                        Provider: "Test_Provider",
                        Maintainer: "Test_maintainer",
                        OtherRole: "Test",
                    },
                    meta: {
                        index: "test-index",
                        id: "1",
                        score: 1,
                        doc_type: "_doc",
                    },
                },
                {
                    Course: {
                        CourseProviderName: "TEST",
                        DepartmentName: "TEST",
                        EducationalContext: " ",
                        CourseCode: "Random_code",
                        CourseTitle: "Test Course 1",
                        CourseDescription: "Test Description",
                        CourseAudience: "Test_audience",
                        CourseSectionDeliveryMode: "Online",
                    },
                    Lifecycle: {
                        Provider: "Test_Provider",
                        Maintainer: "Test_maintainer",
                        OtherRole: "Test",
                    },
                    meta: {
                        index: "test-index",
                        id: "2",
                        score: 1,
                        doc_type: "_doc",
                    },
                },
                {
                    Course: {
                        CourseProviderName: "TEST",
                        DepartmentName: "TEST",
                        EducationalContext: " ",
                        CourseCode: "Random_code",
                        CourseTitle: "Test Course 1",
                        CourseDescription: "Test Description",
                        CourseAudience: "Test_audience",
                        CourseSectionDeliveryMode: "Online",
                    },
                    Lifecycle: {
                        Provider: "Test_Provider",
                        Maintainer: "Test_maintainer",
                        OtherRole: "Test",
                    },
                    meta: {
                        index: "test-index",
                        id: "3",
                        score: 1,
                        doc_type: "_doc",
                    },
                },
            ],
            total: 3,
            aggregations: {},
        };
        const resp = { data: data };
        useSelectorMock.mockReturnValue(state);
        axios.get.mockResolvedValueOnce(resp);

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter
                        initialEntries={["/search/?keyword=business"]}
                    >
                        <SearchResultsPage />
                    </MemoryRouter>
                </Provider>,

                container
            );
        });

        //screen.debug();

        expect(
            screen.getByText('3 results for "business"', { exact: false })
        ).toBeInTheDocument();
        expect(screen.queryAllByText("Test Course 1").length).toEqual(
            data.total
        );
    });

    it("should display filter groups and check functionality", async () => {
        await act(async () => {
            const data = {
                hits: [
                    {
                        Course: {
                            CourseProviderName: "TEST",
                            DepartmentName: "TEST",
                            EducationalContext: " ",
                            CourseCode: "Random_code",
                            CourseTitle: "Test Course 1",
                            CourseDescription: "Test Description",
                            CourseAudience: "Test_audience",
                            CourseSectionDeliveryMode: "Online",
                        },
                        Lifecycle: {
                            Provider: "Test_Provider",
                            Maintainer: "Test_maintainer",
                            OtherRole: "Test",
                        },
                        meta: {
                            index: "test-index",
                            id: "1",
                            score: 1,
                            doc_type: "_doc",
                        },
                    },
                    {
                        Course: {
                            CourseProviderName: "TEST",
                            DepartmentName: "TEST",
                            EducationalContext: " ",
                            CourseCode: "Random_code",
                            CourseTitle: "Test Course 1",
                            CourseDescription: "Test Description",
                            CourseAudience: "Test_audience",
                            CourseSectionDeliveryMode: "Online",
                        },
                        Lifecycle: {
                            Provider: "Test_Provider",
                            Maintainer: "Test_maintainer",
                            OtherRole: "Test",
                        },
                        meta: {
                            index: "test-index",
                            id: "2",
                            score: 1,
                            doc_type: "_doc",
                        },
                    },
                    {
                        Course: {
                            CourseProviderName: "DAU",
                            DepartmentName: "TEST",
                            EducationalContext: " ",
                            CourseCode: "Random_code",
                            CourseTitle: "Test Course 1",
                            CourseDescription: "Test Description",
                            CourseAudience: "Test_audience",
                            CourseSectionDeliveryMode: "Online",
                        },
                        Lifecycle: {
                            Provider: "DAU",
                            Maintainer: "Test_maintainer",
                            OtherRole: "Test",
                        },
                        meta: {
                            index: "test-index",
                            id: "3",
                            score: 1,
                            doc_type: "_doc",
                        },
                    },
                ],
                total: 3,

                aggregations: {
                    Provider: {
                        doc_count_error_upper_bound: 0,
                        sum_other_doc_count: 0,
                        buckets: [
                            {
                                key: "edX",
                                doc_count: 24,
                            },
                            {
                                key: "DAU",
                                doc_count: 3,
                            },
                            {
                                key: "TEST",
                                doc_count: 3,
                            },
                        ],
                        field_name: "Course.CourseProviderName",
                    },
                },
            };

            const resp = { data: data };
            useSelectorMock.mockReturnValue(state);
            axios.get.mockResolvedValueOnce(resp);
            axios.get.mockResolvedValueOnce(resp);

            render(
                <Provider store={store}>
                    <MemoryRouter
                        initialEntries={["/search/?keyword=business"]}
                    >
                        <SearchResultsPage />
                    </MemoryRouter>
                </Provider>,

                container
            );
        });

        await act(async () => {
            const check = screen.getByText("DAU (3)", { exact: false });
            fireEvent.click(check);
        });

        // expect(screen.getByText('Provider')).toBeInTheDocument();
        // expect(screen.getByLabelText('searchKeyword')).toBeInTheDocument();
    });

    it("Should display error message if API returns an Error", async () => {
        const data = {
            hits: [],
            total: 0,
        };
        const resp = { data: data };
        useSelectorMock.mockReturnValue(state);
        axios.get.mockRejectedValueOnce({ error: "error" });
        const errorText =
            "Error Loading experiences. Please contact an administrator.";

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter
                        initialEntries={["/search/?keyword=business"]}
                    >
                        <SearchResultsPage />
                    </MemoryRouter>
                </Provider>,

                container
            );
        });

        expect(await screen.findByText(errorText)).toBeInTheDocument();
    });

    it("Should display a functional dropdown for sort", async () => {
        await act(async () => {
            const data = {
                hits: [
                    {
                        Course: {
                            CourseProviderName: "TEST",
                            DepartmentName: "TEST",
                            EducationalContext: " ",
                            CourseCode: "Random_code",
                            CourseTitle: "Test Course 1",
                            CourseDescription: "Test Description",
                            CourseAudience: "Test_audience",
                            CourseSectionDeliveryMode: "Online",
                        },
                        Lifecycle: {
                            Provider: "Test_Provider",
                            Maintainer: "Test_maintainer",
                            OtherRole: "Test",
                        },
                        meta: {
                            index: "test-index",
                            id: "1",
                            score: 1,
                            doc_type: "_doc",
                        },
                    },
                    {
                        Course: {
                            CourseProviderName: "TEST",
                            DepartmentName: "TEST",
                            EducationalContext: " ",
                            CourseCode: "Random_code",
                            CourseTitle: "Test Course 1",
                            CourseDescription: "Test Description",
                            CourseAudience: "Test_audience",
                            CourseSectionDeliveryMode: "Online",
                        },
                        Lifecycle: {
                            Provider: "Test_Provider",
                            Maintainer: "Test_maintainer",
                            OtherRole: "Test",
                        },
                        meta: {
                            index: "test-index",
                            id: "2",
                            score: 1,
                            doc_type: "_doc",
                        },
                    },
                    {
                        Course: {
                            CourseProviderName: "TEST",
                            DepartmentName: "TEST",
                            EducationalContext: " ",
                            CourseCode: "Random_code",
                            CourseTitle: "Test Course 1",
                            CourseDescription: "Test Description",
                            CourseAudience: "Test_audience",
                            CourseSectionDeliveryMode: "Online",
                        },
                        Lifecycle: {
                            Provider: "Test_Provider",
                            Maintainer: "Test_maintainer",
                            OtherRole: "Test",
                        },
                        meta: {
                            index: "test-index",
                            id: "3",
                            score: 1,
                            doc_type: "_doc",
                        },
                    },
                ],
                total: 3,

                aggregations: {
                    "Course Type": {
                        doc_count_error_upper_bound: 0,
                        sum_other_doc_count: 0,
                        buckets: [
                            {
                                key: "SCORM 2004",
                                doc_count: 3,
                            },
                        ],
                        field_name: "Course.CourseType",
                    },
                    Provider: {
                        doc_count_error_upper_bound: 0,
                        sum_other_doc_count: 0,
                        buckets: [
                            {
                                key: "edX",
                                doc_count: 24,
                            },
                            {
                                key: "DAU",
                                doc_count: 18,
                            },
                            {
                                key: "TEST",
                                doc_count: 3,
                            },
                        ],
                        field_name: "Course.CourseProviderName",
                    },
                },
            };

            const resp = { data: data };
            useSelectorMock.mockReturnValue(state);
            axios.get.mockResolvedValueOnce(resp);

            render(
                <Provider store={store}>
                    <MemoryRouter
                        initialEntries={["/search/?keyword=business"]}
                    >
                        <SearchResultsPage />
                    </MemoryRouter>
                </Provider>,

                container
            );
        });

        // screen.debug();
        expect(screen.getByText("Most Relevant")).toBeInTheDocument();
    });
});

describe("Tests helper methods", () => {
    test("does return keyword", () => {
        const location = {
            pathname: "/search/",
            search: "?keyword=key&p=1",
            hash: "",
            key: "i9n5t9",
        };
        expect(getKeywordParam(location)).toBe("key");
    });

    test("does return page", () => {
        const location = {
            pathname: "/search/",
            search: "?keyword=key&p=1",
            hash: "",
            key: "i9n5t9",
        };
        expect(getPage(location)).toBe("1");
    });

    test("does get updated search query", () => {
        const location = {
            pathname: "/search/",
            search: "?keyword=key&p=1",
            hash: "",
            key: "i9n5t9",
        };
        const paramObj = { p: 2 };

        expect(getUpdatedSearchQuery(location, paramObj, null)).toEqual({
            keyword: "key",
            p: 2,
        });
    });
});
