import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../../../store/store';


describe('<Navbar />', () => {
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

    it("should display navbar with home, about, resources, and help", () => {

        act(() => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Navbar />
                    </MemoryRouter>
                </Provider>
            , container);
        })

        expect(screen.getByText("Home", {exact: false}))
            .toBeInTheDocument();
        expect(screen.getByText("About"))
            .toBeInTheDocument();
        expect(screen.getByText("Resources"))
            .toBeInTheDocument();
        expect(screen.getByText("Help"))
            .toBeInTheDocument();
    })

    it("routes to About page", () => {
        let testHistory, testLocation;
        render(
            <MemoryRouter >
                <Navbar />
                <Route
                    path="*"
                    render={({ history, location }) => {
                    testHistory = history;
                    testLocation = location;
                    return null;
                    }}
                />
            </MemoryRouter>
        , container);
    
        act(() => {
            const pageLink = screen.getByText("About");
            pageLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(testLocation.pathname).toBe("/about");
    });

    it("routes to Resources page", () => {
        let testHistory, testLocation;
        render(
            <MemoryRouter >
                <Navbar />
                <Route
                    path="*"
                    render={({ history, location }) => {
                    testHistory = history;
                    testLocation = location;
                    return null;
                    }}
                />
            </MemoryRouter>
        , container);
    
        act(() => {
            const pageLink = screen.getByText("Resources");
            pageLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(testLocation.pathname).toBe("/resources");
    });

    it("routes to Help page", () => {
        let testHistory, testLocation;
        render(
            <MemoryRouter >
                <Navbar />
                <Route
                    path="*"
                    render={({ history, location }) => {
                    testHistory = history;
                    testLocation = location;
                    return null;
                    }}
                />
            </MemoryRouter>
        , container);
    
        act(() => {
            const pageLink = screen.getByText("Help");
            pageLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(testLocation.pathname).toBe("/help");
    });

});
