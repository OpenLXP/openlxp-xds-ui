import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";

import InputPassword from "./InputPassword";

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

test("Should render label", () => {
    act(() => {
        render(<InputPassword />, container);
    });

    screen.getByText("Password");
});

test("Should render error message", () => {
    act(() => {
        render(<InputPassword error={"test error"} />, container);
    });

    screen.getByText("test error");
});

test("Should update input", () => {
    act(() => {
        render(<InputPassword />);

        const input = screen.getByPlaceholderText("Password");
        fireEvent.change(input, { target: { value: "test" } });
    });

    expect(screen.getByPlaceholderText("Password").value).toBe("test");
});
