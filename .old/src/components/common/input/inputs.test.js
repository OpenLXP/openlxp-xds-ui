import { unmountComponentAtNode } from "react-dom";
import { act, render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { InputField, SearchField, Dropdown } from "./inputs.js";

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

describe("InputField.js", () => {
  it("renders correct id, type, name, and placeholder", () => {
    act(() => {
      render(
        <InputField type="text" name="test" placeholder="test" id="testID" />,
        container
      );
    });

    getByPlaceholderText("test");
    expect(getByPlaceholderText("test").type).toBe("text");
    expect(getByPlaceholderText("test").name).toBe("test");
    expect(getByPlaceholderText("test").id).toBe("testID");
  });

  it("renders the correct function on change", () => {
    console.log = jest.fn();
    act(() => {
      render(
        <InputField
          type="text"
          name="test"
          placeholder="test"
          id="testID"
          onChange={() => {
            console.log("Hello");
          }}
        />,
        container
      );
    });
    act(() => {
      userEvent.type(getByPlaceholderText("test"), "A");
    });

    expect(getByPlaceholderText("test").value).toBe("A");
    expect(console.log).toHaveBeenCalledWith("Hello");
  });
});

describe("SearchField.js", () => {
  it("renders correct value,and placeholder", () => {
    act(() => {
      render(
        <SearchField value="test" placeholder="test" onChange={() => {}} />,
        container
      );
    });
    getByPlaceholderText("test");
    expect(getByPlaceholderText("test").value).toBe("test");
  });

  it("renders correct function onKeyPress", () => {
    console.log = jest.fn();

    act(() => {
      render(
        <SearchField
          value="test"
          placeholder="test"
          onChange={() => {
            // console.log("Hello");
          }}
          onKeyPress={(e) => {
            if (e.charCode === 13 || e.key === "Enter") {
              console.log("Key Press");
            }
          }}
        />,
        container
      );
    });

    act(() => {
      fireEvent.keyPress(screen.getByPlaceholderText("test"), {
        key: "Enter",
        charCode: 13,
      });
    });
    expect(console.log).toHaveBeenCalledWith("Key Press");
  });
  it("renders correct function onKeyPress", () => {
    console.log = jest.fn();

    act(() => {
      render(
        <SearchField
          value="test"
          placeholder="test"
          onChange={() => {
            console.log("Key Press");
          }}
          onKeyPress={() => {}}
        />,
        container
      );
    });

    act(() => {
      userEvent.type(getByPlaceholderText("test"), "a");
      fireEvent.keyPress(getByPlaceholderText("test"), {
        key: "Enter",
        charCode: 13,
      });
    });
    expect(console.log).toHaveBeenCalledWith("Key Press");
  });
});
describe("Dropdown", () => {
  test("does render", () => {
    act(() => {
      render(<Dropdown placeholder="test placeholder" />);
    });
    getByPlaceholderText("test placeholder");
  });

  test("does show menu", () => {
    act(() => {
      const options = [
        { value: "test1", label: "test1" },
        { value: "test2", label: "test2" },
        { value: "test3", label: "test3" },
      ];
      render(<Dropdown placeholder="test placeholder" options={options} />);
    });
    act(() => {
      fireEvent.click(getByPlaceholderText("test placeholder"));
    });

    expect(getByPlaceholderText("test placeholder").childNodes.length).toBe(3);
    getByText("test1");
    getByText("test2");
    getByText("test3");
  });
});
