import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';

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

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    })

    it("returns no results from API", async () => {
        const data = {
            hits: [],
            total: 0
        };
        const resp = {data: data};
        axios.get.mockResolvedValueOnce(resp);
        const noResultText = 
            'Sorry, we couldn\'t find any results for "business"'

        await act(async () => {
            render(
                <MemoryRouter initialEntries={["/search/?kw=business"]}>
                    <SearchResultsPage />
                </MemoryRouter>
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
                    }
                },
            ],
            total: 3
        };
        const resp = {data: data};
        axios.get.mockResolvedValueOnce(resp);

        await act(async () => {
            render(
                <MemoryRouter initialEntries={["/search/?kw=business"]}>
                    <SearchResultsPage />
                </MemoryRouter>
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
        axios.get.mockRejectedValueOnce({error: "error"});
        const errorText = 'Error Loading experiences.';

        await act(async () => {
            render(
                <MemoryRouter initialEntries={["/search/?kw=business"]}>
                    <SearchResultsPage />
                </MemoryRouter>
            , container);
        });

        //screen.debug();

        expect(await screen.findByText(errorText))
            .toBeInTheDocument();
    });
});
