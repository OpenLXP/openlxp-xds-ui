import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../../store/store';


describe('<Header />', () => {
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

    it("should display: header with title, subtilte, searchbar, and sign in", () => {

        act(() => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </Provider>
            , container);
        })

        expect(screen.getByText("DIGITAL LEARNING PORTAL", {exact: false}))
            .toBeInTheDocument();
        expect(screen.getByText("U.S. Department of Defense"))
            .toBeInTheDocument();
        // expect(screen.getByText("Keyword Search"))
        //     .toBeInTheDocument();
        expect(screen.getByText("Sign in"))
            .toBeInTheDocument();
    })

    it("should show user input on the search bar", async () => {

        act(() => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </Provider>
            , container);
        });

        await userEvent.type(screen.getByTestId('header-search'),
            'Hello');

        expect(screen.getByDisplayValue('Hello'))
            .toBeInTheDocument();
    });
});
