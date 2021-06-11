import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";

import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  test("does render", () => {
    act(() => {
      render(<ErrorMessage error="Test Error" />);
    });
    screen.getByText("Test Error");
  });
});
