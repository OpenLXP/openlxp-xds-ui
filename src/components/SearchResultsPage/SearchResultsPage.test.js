import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen, fireEvent, queryByAttribute } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';

import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';
import store from '../../store/store';

jest.mock('axios');
// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useLocation: () => ({
//       pathname: "localhost:3000/search/",
//       search: "?kw=business"
//     })
//   }));

describe('<SearchResultsPage />', () => {
    let container = null;
    let state = null;
    const useSelectorMock = jest.spyOn(redux, 'useSelector')

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
                        xds_ui_configuration: 1
                    }
                ],
                course_highlights: [
                    {
                        display_name: "Start Date",
                        field_name: "GeneralInformation.StartDate",
                        active: true,
                        xds_ui_configuration: 1,
                        highlight_icon: "clock"
                    }
                ],
                created: "2021-05-20T01:24:29.082370Z",
                modified: "2021-05-20T13:10:35.608284Z",
                search_results_per_page: 10,
                course_img_fallback: "/media/images/elearning_KpJuxw0.jpeg"
            },
            status: 'succeeded',
            error: null
        }
        useSelectorMock.mockClear();
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        state = null;
    })

    it("returns no results from API", async () => {
        const data = {
            hits: [],
            total: 0
        };
        const resp = {data: data};
        useSelectorMock.mockReturnValue(state);
        axios.get.mockResolvedValueOnce(resp);
        const noResultText = 
            'Sorry, we couldn\'t find any results for "business"'

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/search/?keyword=business"]}>
                        <SearchResultsPage />
                    </MemoryRouter>
                </Provider>
                
            , container);
        });
        expect(screen.getByText('0 results for "business"', {exact: false}))
            .toBeInTheDocument();
        expect(screen.getByText(noResultText, {exact: false}))
            .toBeInTheDocument();
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
                        CourseSectionDeliveryMode: "Online"
                    },
                    Lifecycle: {
                        Provider: "Test_Provider",
                        Maintainer: "Test_maintainer",
                        OtherRole: "Test"
                    },
                    meta: {
                        index: "test-index",
                        id: "1",
                        score: 1,
                        doc_type: "_doc"
                    }
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
                        CourseSectionDeliveryMode: "Online"
                    },
                    Lifecycle: {
                        Provider: "Test_Provider",
                        Maintainer: "Test_maintainer",
                        OtherRole: "Test"
                    },
                    meta: {
                        index: "test-index",
                        id: "2",
                        score: 1,
                        doc_type: "_doc"
                    }
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
                        CourseSectionDeliveryMode: "Online"
                    },
                    Lifecycle: {
                        Provider: "Test_Provider",
                        Maintainer: "Test_maintainer",
                        OtherRole: "Test"
                    },
                    meta: {
                        index: "test-index",
                        id: "3",
                        score: 1,
                        doc_type: "_doc"
                    }
                },
            ],
            total: 3,
            aggregations: {}
        };
        const resp = {data: data};
        useSelectorMock.mockReturnValue(state);
        axios.get.mockResolvedValueOnce(resp);

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/search/?keyword=business"]}>
                        <SearchResultsPage />
                    </MemoryRouter>
                </Provider>
                
            , container);
        });

        //screen.debug();

        expect(screen.getByText('3 results for "business"', {exact: false}))
            .toBeInTheDocument();
        expect(screen.queryAllByText("Test Course 1").length)
            .toEqual(data.total);
    });

    it("Should display error message if API returns an Error", async () => {
        const data = {
            hits: [],
            total: 0
        };
        const resp = {data: data};
        useSelectorMock.mockReturnValue(state);
        axios.get.mockRejectedValueOnce({error: "error"});
        const errorText = 
            'Error Loading experiences. Please contact an administrator.';

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/search/?keyword=business"]}>
                        <SearchResultsPage />
                    </MemoryRouter>
                </Provider>
                
            , container);
        });

        //screen.debug();

        expect(await screen.findByText(errorText))
            .toBeInTheDocument();
    });

    // it("Should display a functional dropdown for sort", async () => {
    //     const data = {
    //         hits: [
    //             {
    //                 Course: {
    //                     CourseProviderName: "TEST",
    //                     DepartmentName: "TEST",
    //                     EducationalContext: " ",
    //                     CourseCode: "Random_code",
    //                     CourseTitle: "Test Course 1",
    //                     CourseDescription: "Test Description",
    //                     CourseAudience: "Test_audience",
    //                     CourseSectionDeliveryMode: "Online"
    //                 },
    //                 Lifecycle: {
    //                     Provider: "Test_Provider",
    //                     Maintainer: "Test_maintainer",
    //                     OtherRole: "Test"
    //                 },
    //                 meta: {
    //                     index: "test-index",
    //                     id: "1",
    //                     score: 1,
    //                     doc_type: "_doc"
    //                 }
    //             },
    //             {
    //                 Course: {
    //                     CourseProviderName: "TEST",
    //                     DepartmentName: "TEST",
    //                     EducationalContext: " ",
    //                     CourseCode: "Random_code",
    //                     CourseTitle: "Test Course 1",
    //                     CourseDescription: "Test Description",
    //                     CourseAudience: "Test_audience",
    //                     CourseSectionDeliveryMode: "Online"
    //                 },
    //                 Lifecycle: {
    //                     Provider: "Test_Provider",
    //                     Maintainer: "Test_maintainer",
    //                     OtherRole: "Test"
    //                 },
    //                 meta: {
    //                     index: "test-index",
    //                     id: "2",
    //                     score: 1,
    //                     doc_type: "_doc"
    //                 }
    //             },
    //             {
    //                 Course: {
    //                     CourseProviderName: "TEST",
    //                     DepartmentName: "TEST",
    //                     EducationalContext: " ",
    //                     CourseCode: "Random_code",
    //                     CourseTitle: "Test Course 1",
    //                     CourseDescription: "Test Description",
    //                     CourseAudience: "Test_audience",
    //                     CourseSectionDeliveryMode: "Online"
    //                 },
    //                 Lifecycle: {
    //                     Provider: "Test_Provider",
    //                     Maintainer: "Test_maintainer",
    //                     OtherRole: "Test"
    //                 },
    //                 meta: {
    //                     index: "test-index",
    //                     id: "3",
    //                     score: 1,
    //                     doc_type: "_doc"
    //                 }
    //             },
    //         ],
    //         total: 3,
    //         aggregations: {}
    //     };
    //     const data2 = {
            
    //         "id": 1,
    //         "search_sort_options": [
    //             {
    //                 "display_name": "Course Title",
    //                 "field_name": "Course.CourseTitlte",
    //                 "active": true,
    //                 "xds_ui_configuration": 1
    //             },
    //             {
    //                 "display_name": "Course Date",
    //                 "field_name": "Lifecycle.CourseDate",
    //                 "active": true,
    //                 "xds_ui_configuration": 1
    //             }
    //         ],
    //         "search_results_per_page": 10
    //     };
    //     const resp = {data: data};
    //     axios.get.mockResolvedValueOnce(resp);

    //     let wrapper;
    //     await act(async () => {
    //         render(
    //             <MemoryRouter initialEntries={["/search/?keyword=business&p=1"]}>
    //                 <SearchResultsPage />
    //             </MemoryRouter>
    //         , container);
    //     });

    //     let getById = queryByAttribute.bind(null, 'id');
    //     let dropdown = getById(container, 'sortDropdown');
    //     console.log(dropdown);
    //     expect(dropdown).toBeInTheDocument(); 
    // });
});
