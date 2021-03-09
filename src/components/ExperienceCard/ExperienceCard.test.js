import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExperienceCard from './ExperienceCard';
import userEvent from '@testing-library/user-event';

describe('<ExperienceCard />', () => {
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

    it("should display: title, provider name, and dept name from props", () => {

        const courseObj = {
            Course: {
                CourseTitle: "Title1",
                CourseProviderName: "Provider1",
                DepartmentName: "Department1"
            }
        }

        act(() => {
            render(
                <ExperienceCard courseObj={courseObj} />
            , container);
        })

        expect(screen.getByText("Title1")).toBeInTheDocument();
        expect(screen.getByText("Provider1")).toBeInTheDocument();
        expect(screen.getByText("Department1")).toBeInTheDocument();
    });

    it("should display: N/A when props are missing", () => {

        const courseObj = {
            Course: {}
        };

        act(() => {
            render(
                <ExperienceCard courseObj={courseObj} />
            , container);
        })

        expect(screen.getByText("Missing Course Title")).toBeInTheDocument();
        expect(screen.getAllByText("N/A").length).toEqual(2);
    });

    it("should display: Error when courseObj prop isn't passed", () => {

        act(() => {
            render(
                <ExperienceCard />
            , container);
        })

        expect(screen.getByText("Error Loading Course Card."))
            .toBeInTheDocument();
    });
});
