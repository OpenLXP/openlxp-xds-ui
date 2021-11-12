import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';

describe('<Pagination />', () => {
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

    // it('renders without crashing', () => {
    //     const div = document.createElement('div');
    //     ReactDOM.render(<Pagination />, div);
    //     expect(true);
    // });

    it("should show page number on the search bar", async () => {

        act(() => {
            render(
                <MemoryRouter>
                    <Pagination courseState={{total:40}}/>
                </MemoryRouter>
            , container);
        });

        let pag=true;
        expect(pag).toBe(true);
        expect(screen.getByText("<")).toBeInTheDocument();
        expect(screen.getByText(">")).toBeInTheDocument();

    });
    
    test("increments page", () => {
            let testHistory, testLocation;
            render(
                <MemoryRouter initialEntries={["/search/?kw=business&p=1"]}>
                    <Pagination searchInputState={"business"} page={"1"} courseState={{total:40}}/>
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
        
        expect(testLocation.pathname).toBe("/search/");
        let searchParams = new
        URLSearchParams(testLocation.search);
          expect(searchParams.has("p")).toBe(true);
          expect(searchParams.get("p")).toEqual("1");
          expect(searchParams.has(screen.getByText(">"))).toBeInTheDocument;

        act(() => {
            const pageLink = screen.getByText(">");
            pageLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });


        searchParams = new URLSearchParams(testLocation.search);
        expect(searchParams.has("p")).toBe(true);
        expect(searchParams.get("p")).toEqual("2");

      });

      test("decrement page", () => {
        let testHistory, testLocation;
        render(
            <MemoryRouter initialEntries={["/search/?kw=business&p=2"]}>
                <Pagination searchInputState={"business"} page={"2"} courseState={{total:40}}/>
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
    
    expect(testLocation.pathname).toBe("/search/");
    let searchParams = new
    URLSearchParams(testLocation.search);
      expect(searchParams.has("p")).toBe(true);
      expect(searchParams.get("p")).toEqual("2");
      expect(searchParams.has(screen.getByText("<"))).toBeInTheDocument;

    act(() => {
        const pageLink = screen.getByText("<");
        pageLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    searchParams = new URLSearchParams(testLocation.search);
    expect(searchParams.has("p")).toBe(true);
    expect(searchParams.get("p")).toEqual("1");

  });

  test("increments page", () => {
    let testHistory, testLocation;
    render(
        <MemoryRouter initialEntries={["/search/?kw=business&p=1"]}>
            <Pagination searchInputState={"business"} page={"1"} courseState={{total:40}}/>
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

    expect(testLocation.pathname).toBe("/search/");
    let searchParams = new
    URLSearchParams(testLocation.search);
    expect(searchParams.has("p")).toBe(true);
    expect(searchParams.get("p")).toEqual("1");
    expect(searchParams.has(screen.getByText("2"))).toBeInTheDocument;

    act(() => {
        const pageLink = screen.getByText("2");
        pageLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    searchParams = new URLSearchParams(testLocation.search);
    expect(searchParams.has("p")).toBe(true);
    expect(searchParams.get("p")).toEqual("2");

    });
});
