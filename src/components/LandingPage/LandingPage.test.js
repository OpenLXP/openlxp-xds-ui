import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../../store/store';


describe('<LandingPage />', () => {
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

    it("should display: header, subheader, and popular section", () => {

        act(() => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <LandingPage />
                    </MemoryRouter>
                </Provider>
            , container);
        })

        expect(screen.getByText("Enterprise Course Catalog", {exact: false}))
            .toBeInTheDocument();
        expect(screen.getByText("This catalog lets you search for all DoD "
            + "unclassified training and education courses, seminars, "
            + "instructional resources and more."))
            .toBeInTheDocument();
        expect(screen.getByText("Popular"))
            .toBeInTheDocument();
    })

    it("should show user input on the search bar", async () => {

        act(() => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <LandingPage />
                    </MemoryRouter>
                </Provider>
            , container);
        });

        await userEvent.type(screen.getByTestId('landing-search'),
            'Hello');

        expect(screen.getByDisplayValue('Hello'))
            .toBeInTheDocument();
    });
});
