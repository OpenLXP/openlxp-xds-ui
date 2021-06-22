import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";

import InputEmail from "./InputEmail";

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
        render(<InputEmail />, container);
    });

    screen.getByText("Email");
});

test("Should render error message", () => {
    act(() => {
        render(<InputEmail error={"test error"} />, container);
    });

    screen.getByText("test error");
});

test("Should update input", () => {
    act(() => {
        render(<InputEmail />);

        const input = screen.getByPlaceholderText("Email");
        fireEvent.change(input, { target: { value: "test" } });
    });
    
    expect(screen.getByPlaceholderText("Email").value).toBe("test");
});
