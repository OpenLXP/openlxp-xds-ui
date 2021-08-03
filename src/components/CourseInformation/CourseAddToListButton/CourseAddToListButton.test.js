import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";

import Button from "./CourseAddToListButton"

describe("Button", () => {
    test("does render", () => {
      act(() => {
        render(<Button />);
      });
      screen.getByText("Add to list");
    });
  });
  