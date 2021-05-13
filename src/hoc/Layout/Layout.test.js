import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Layout from './Layout';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../../store/store';


describe('<Layout />', () => {
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

    it("should display header", () => {

        act(() => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Layout />
                    </MemoryRouter>
                </Provider>
            , container);
        })

        expect(screen.getByText("DIGITAL LEARNING PORTAL", {exact: false}))
            .toBeInTheDocument();
        expect(screen.getByText("U.S. Department of Defense"))
            .toBeInTheDocument();
        expect(screen.getByText("Sign in"))
            .toBeInTheDocument();

    })

    it("should display navbar", () => {

        act(() => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Layout />
                    </MemoryRouter>
                </Provider>
            , container);
        })
    
        // expect(screen.getAllByText("Home", {exact: false}))
        //     .toBeInTheDocument();
        expect(screen.getByText("About"))
            .toBeInTheDocument();
        expect(screen.getByText("Resources"))
            .toBeInTheDocument();
        expect(screen.getByText("Help"))
            .toBeInTheDocument();
    });

    it("should display: footer with links", () => {

        act(() => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Layout />
                    </MemoryRouter>
                </Provider>
            , container);
        })
    
        // expect(screen.getAllByText("Home", {exact: false})).toBeInTheDocument();
        expect(screen.getByText("About DOD CIO")).toBeInTheDocument();
        expect(screen.getByText("Defense.gov")).toBeInTheDocument();
        expect(screen.getByText("FOIA")).toBeInTheDocument();
        expect(screen.getByText("Section 508")).toBeInTheDocument();
        expect(screen.getByText("Strategic Plans")).toBeInTheDocument();
        expect(screen.getByText("Information Quality")).toBeInTheDocument();
        expect(screen.getByText("No FEAR Act")).toBeInTheDocument();
        expect(screen.getByText("Open Government")).toBeInTheDocument();
        expect(screen.getByText("Plain Writing")).toBeInTheDocument();
        expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
        expect(screen.getByText("Privacy Program")).toBeInTheDocument();
        expect(screen.getByText("DoD Careers")).toBeInTheDocument();
        expect(screen.getByText("Web Policy")).toBeInTheDocument();
        expect(screen.getByText("Public Use Notice")).toBeInTheDocument();
        expect(screen.getByText("USA.gov")).toBeInTheDocument();
        expect(screen.getByText("External Links Disclaimer")).toBeInTheDocument();
        expect(screen.getByText("Contact US")).toBeInTheDocument();
    });

});
