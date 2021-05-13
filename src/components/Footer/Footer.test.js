import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../../store/store';


describe('<Footer />', () => {
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

    it("should display: footer with links", () => {

        act(() => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Footer />
                    </MemoryRouter>
                </Provider>
            , container);
        })

        expect(screen.getByText("Home", {exact: false})).toBeInTheDocument();
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
    })

});
