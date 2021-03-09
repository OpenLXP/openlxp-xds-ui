import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils'
import FilterGroup from './FilterGroup';

describe('<FilterGroup />', () => {
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

    it("should render using the prop values", () => {
        const group = {
            title: "Personnel Type",
            values: ["Officer", "Enlisted", "Contractor", "Civilian"]
        };

        act(() => {
            render(<FilterGroup groupObj={group} />, container);
        })
        expect(container.querySelector("h3").textContent).toBe(group.title);

    })

    it("should render as many inputs as items in props.group.values", () => {
        const group = {
            title: "Personnel Type",
            values: ["Officer", "Enlisted", "Contractor", "Civilian"]
        };

        act(() => {
            render(<FilterGroup groupObj={group} />, container);
        })
        expect(container.querySelectorAll("input").length)
            .toEqual(group.values.length);
    })
});
