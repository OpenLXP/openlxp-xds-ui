import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExpPreviewPanel from './ExpPreviewPanel';

describe('<ExpPreviewPanel />', () => {
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

    it("should display: title, desc, and provider using props", () => {
        const courseObj = {
            Course: {
                CourseProviderName: "TEST",
                DepartmentName: "TEST",
                EducationalContext: " ",
                CourseCode: "Random_code",
                CourseTitle: "Test Course 1",
                CourseShortDescription: "Test Description",
                CourseAudience: "Test_audience",
                CourseSectionDeliveryMode: "Online"
            },
            Lifecycle: {
                Provider: "Test_Provider",
                Maintainer: "Test_maintainer",
                OtherRole: "Test"
            },
            meta: {
                index: "test-index",
                id: "2",
                score: 1,
                doc_type: "_doc"
            }
        }

        act(() => {
            render(
                <MemoryRouter initialEntries={["/search/?keyword=business"]}>
                    <ExpPreviewPanel
                        expObj={courseObj}
                        key={1}
                        imgLink="n/a" />
                </MemoryRouter>
            , container);
        })
        expect(screen.getByText(courseObj.Course.CourseTitle))
            .toBeInTheDocument();
        expect(screen.getByText(courseObj.Course.CourseShortDescription))
            .toBeInTheDocument();
        expect(screen.getByText(courseObj.Course.CourseProviderName))
            .toBeInTheDocument();
    })

    it("should display: N/A where prop value doesn't exist", () => {
        const courseObj = {
            Course: {
                DepartmentName: "TEST",
                EducationalContext: " ",
                CourseCode: "Random_code",
                CourseTitle: "Test Course 1",
                CourseAudience: "Test_audience",
                CourseSectionDeliveryMode: "Online"
            },
            Lifecycle: {
                Provider: "Test_Provider",
                Maintainer: "Test_maintainer",
                OtherRole: "Test"
            },
            meta: {
                index: "test-index",
                id: "2",
                score: 1,
                doc_type: "_doc"
            }
        }

        act(() => {
            render(
                <MemoryRouter initialEntries={["/search/?keyword=business"]}>
                    <ExpPreviewPanel
                        expObj={courseObj}
                        key={1}
                        imgLink="n/a" />
                </MemoryRouter>
            , container);
        })

        const descElement = screen.getByTestId("exp-prev-desc");
        const providerElement = screen.getByTestId("exp-prev-provider");

        expect(screen.queryByText(courseObj.Course.CourseTitle))
            .toBeInTheDocument();
        expect(descElement).toBeInTheDocument();
        expect(providerElement).toBeInTheDocument();
        expect(descElement.textContent).toEqual("N/A");
        expect(providerElement.textContent).toEqual("N/A")
    });
});
