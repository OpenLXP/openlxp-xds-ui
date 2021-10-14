import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";

// components to render
import { Button, ActionButton } from "./buttons";

// tools to test with
let { getByText } = screen;

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

describe("ActionButton.js", () => {
  it("renders correct title", () => {
    act(() => {
      render(<ActionButton title="test title" />, container);
    });

    getByText("test title");
  });
  it("renders correct href", () => {
    act(() => {
      render(<ActionButton title="test title" href="test" />, container);
    });

    expect(getByText("test title").parentElement.href).toBe(
      "http://localhost/test"
    );
  });
});

describe("Button.js", () => {
  it("renders correct child title", () => {
    act(() => {
      render(<Button>test title</Button>, container);
    });

    getByText("test title");
  });
  it("renders correct component when no fontWeight is provided", () => {
    act(() => {
      render(<Button>test title</Button>, container);
    });

    expect(
      getByText("test title").className.includes("font-semibold")
    ).toBeTruthy();
  });
  it("renders correct component when fontWeight is provided", () => {
    act(() => {
      render(<Button fontWeight="thin">test title</Button>, container);
    });

    expect(
      getByText("test title").className.includes("font-thin")
    ).toBeTruthy();
  });

  it("renders correct function", () => {
    console.log = jest.fn();
    act(() => {
      render(
        <Button
          onClick={() => {
            console.log("Hello");
          }}>
          test title
        </Button>
      );
    });

    act(() => {
      fireEvent.click(getByText("test title"));
    });
    expect(console.log).toHaveBeenCalledWith("Hello");
  });
});
