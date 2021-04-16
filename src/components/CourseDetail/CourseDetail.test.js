import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../store/store';
import CourseDetail from './CourseDetail';
import dummyJSON from '../../resources/dummy.json'

jest.mock('axios');

describe('<CourseDetail />', () => {
    let container = null;
    let courseObj = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        courseObj = {
            Course: {
                CourseTitle: "Title1",
                CourseFullDescription: "Random Course Description",
                DepartmentName: "Department1"
            },
            meta: {
                id: 51
            }
        }
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        courseObj = null;
    });

    it("should render prop data on the screen", async () => {
        const data = {
            hits: [],
            total: 0
        };
        const resp = { data: data };
        axios.get.mockResolvedValueOnce(resp);

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter
                        initialEntries={[{
                            pathname: "/course/51",
                            state: {
                                expObj: courseObj
                            }
                        }]}>
                        <CourseDetail />
                    </MemoryRouter>
                </Provider>
                , container);
        });

        expect(screen.getByText("Title1")).toBeInTheDocument();
        expect(screen.getByText("Random Course Description"))
            .toBeInTheDocument();
        expect(screen.getByText("Related")).toBeInTheDocument();
    });

    it("should display an error message when api call fails", async () => {
        const errorText = "Error Loading Related card.";

        axios.get.mockRejectedValueOnce({ error: "error" });

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter
                        initialEntries={[{
                            pathname: "/course/51",
                            state: {
                                expObj: courseObj
                            }
                        }]}>
                        <CourseDetail />
                    </MemoryRouter>
                </Provider>
                , container);
        });

        expect(screen.getByText(errorText)).toBeInTheDocument();
    });

    it("should display 5 experience cards as for each object in our JSON obj" +
        "result object", async () => {
            const data = {
                hits: dummyJSON,
                total: 0
            };
            const resp = { data: data };
            axios.get.mockResolvedValueOnce(resp);

            await act(async () => {
                render(
                    <Provider store={store}>
                        <MemoryRouter
                            initialEntries={[{
                                pathname: "/course/51",
                                state: {
                                    expObj: courseObj
                                }
                            }]}>
                            <CourseDetail />
                        </MemoryRouter>
                    </Provider>
                    , container);
            });

            dummyJSON.map((course, idx) => {
                expect(screen.getByText(course.Course.CourseTitle))
                    .toBeInTheDocument();
            });
        });
});
