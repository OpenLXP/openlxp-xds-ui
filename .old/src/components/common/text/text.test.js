import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ErrorText, Link, Section, Title } from "./text";

// tools to test with
let { getByText, getByPlaceholderText } = screen;

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

describe("ErrorText.js", () => {
  it("renders the correct children", () => {
    act(() => {
      render(<ErrorText>test error</ErrorText>, container);
    });

    getByText("test error");
  });
});
describe("Link.js", () => {
  it("renders the correct children", () => {
    act(() => {
      render(<Link>test link</Link>, container);
    });

    getByText("test link");
  });
  it("renders the correct function", () => {
    console.log = jest.fn();

    act(() => {
      render(
        <Link
          onClick={() => {
            console.log("Hello");
          }}>
          test link
        </Link>,
        container
      );
    });
    act(() => {
      fireEvent.click(getByText("test link"));
    });

    expect(console.log).toHaveBeenCalledWith("Hello");
  });
  it("renders the correct size: lg", () => {
    act(() => {
      render(<Link size="lg">test link</Link>, container);
    });
    expect(getByText("test link").className.includes("text-lg"));
  });
  it("renders the correct size when no size is provided", () => {
    act(() => {
      render(<Link>test link</Link>, container);
    });
    expect(getByText("test link").className.includes("text-base"));
  });
});
describe("Title.js", () => {
  it("renders the correct title", () => {
    act(() => {
      render(<Title title="test title" />);
    });

    getByText("test title");
  });
});
describe("Section.js", () => {
  it("renders the correct title", () => {
    act(() => {
      render(<Section title="test section" />);
    });

    getByText("test section");
  });
});
