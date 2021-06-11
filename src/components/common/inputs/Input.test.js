import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";

import Button from "./Button";
import DefaultInput from "./DefaultInput";
import Dropdown from "./Dropdown";
import SearchInput from "./SearchInput";

describe("Button", () => {
  test("does render", () => {
    act(() => {
      render(<Button title="Test Title" />);
    });
    screen.getByText("Test Title");
  });
});

describe("DefaultInput", () => {
  test("does render", () => {
    act(() => {
      render(<DefaultInput placeholder="test placeholder" />);
    });

    screen.getByPlaceholderText("test placeholder");
  });

  test("does update on type change", () => {
    act(() => {
      render(<DefaultInput placeholder="test placeholder" />);
    });
    act(() => {
      fireEvent.change(screen.getByPlaceholderText("test placeholder"), {
        target: { value: "temp" },
      });
    });
    expect(screen.getByPlaceholderText("test placeholder").value).toBe("temp");
  });
});

describe("Dropdown", () => {
  test("does render", () => {
    act(() => {
      render(<Dropdown placeholder="test placeholder" />);
    });
    screen.getByPlaceholderText("test placeholder");
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
      fireEvent.click(screen.getByPlaceholderText("test placeholder"));
    });

    expect(
      screen.getByPlaceholderText("test placeholder").childNodes.length
    ).toBe(3);
    screen.getByText("test1");
    screen.getByText("test2");
    screen.getByText("test3");
  });
});

describe("SearchInput", () => {
  test("does render", () => {
    act(() => {
      render(<SearchInput placeholder="test placeholder" />);
    });

    screen.getByPlaceholderText("test placeholder");
  });

  test("does update on change", () => {
    act(() => {
      render(<SearchInput placeholder="test placeholder" />);
    });
    act(() => {
      fireEvent.change(screen.getByPlaceholderText("test placeholder"), {
        target: { value: "test" },
      });
    });

    expect(screen.getByPlaceholderText("test placeholder").value).toBe("test")
  });
});
