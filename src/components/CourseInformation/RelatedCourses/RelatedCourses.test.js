import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom";
import store from "../../../store/store";

import RelatedCourses from "./RelatedCourses";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("RelatedCourses", () => {
  test("should render loading if courses is undefined", () => {
    act(() => {
      render(<RelatedCourses data={undefined} />);
    });

    screen.getByText("Loading...");
  });

  test("should render related course when given data", () => {
    act(() => {
      const testRelatedCourses = {
        hits: [
          {
            Course: {
              CourseTitle: "Title1",
              CourseProviderName: "Provider1",
              DepartmentName: "Department1",
            },
            Technical_Information: {
              Thumbnail: "Test",
            },
          },
        ],
      };

      render(
        <Provider store={store}>
          <MemoryRouter>
            <RelatedCourses data={testRelatedCourses} />
          </MemoryRouter>
        </Provider>
      );
    });
    screen.getByText("Related");
    screen.getByText("Title1");
    screen.getByText("Provider1");
    screen.getByText("Department1");
  });

  test("should render the correct number of related courses", () => {
    act(() => {
      const testRelatedCourses = {
        hits: [
          {
            Course: {
              CourseTitle: "Title1",
              CourseProviderName: "Provider1",
              DepartmentName: "Department1",
            },
            Technical_Information: {
              Thumbnail: "Test",
            },
          },
          {
            Course: {
              CourseTitle: "Title2",
              CourseProviderName: "Provider2",
              DepartmentName: "Department2",
            },
            Technical_Information: {
              Thumbnail: "Test",
            },
          },
        ],
      };

      render(
        <Provider store={store}>
          <MemoryRouter>
            <RelatedCourses data={testRelatedCourses} />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(
      screen.getByText("Related").parentElement.lastChild.childElementCount
    ).toBe(2);

    screen.getByText("Title1");
    screen.getByText("Provider1");
    screen.getByText("Department1");

    screen.getByText("Title2");
    screen.getByText("Provider2");
    screen.getByText("Department2");
  });
});
