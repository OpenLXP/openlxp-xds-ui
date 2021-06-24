import { render, act, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";

import InputName from "./InputName";

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
        render(<InputName nameType="First Name"/>, container);
    });

    screen.getByText("First Name");
});

test("Should render error message", () => {
    act(() => {
        render(<InputName error={"test error"} nameType="First Name" />, container);
    });

    screen.getByText("test error");
});

test("Should update input", () => {
    act(() => {
        render(<InputName nameType="First Name"  />);

        const input = screen.getByPlaceholderText("First Name");
        fireEvent.change(input, { target: { value: "test" } });
    });
    
    expect(screen.getByPlaceholderText("First Name").value).toBe("test");
});
