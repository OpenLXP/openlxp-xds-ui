import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import * as redux from "react-redux";
import axios from "axios";

import InterestGroupPopup from "./InterestGroupPopup";
import store from "../../../store/store";

const useSelectorMock = jest.spyOn(redux, "useSelector");
jest.mock("axios");

let container = null;
beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
  container = (
    <div>
      <Provider store={store}>
        <InterestGroupPopup courseId={1} />
      </Provider>
    </div>
  );
});
afterEach(() => {
  container = null;
});

test("does render", async () => {
  await act(async () => {
    let lists = [
      {
        id: 1,
        owner: {
          id: 2,
          email: "test@test.com",
          first_name: "test",
          last_name: "user",
        },
        subscribers: [],
        created: "2021-07-23T14:30:08.814573Z",
        modified: "2021-07-23T14:40:45.576233Z",
        description: "New Test List Desc",
        name: "Test List",
        courses: ["4765692fbbeb11a0033cf39aea8ece8f"],
      },
    ];
    let user = {
      email: "test@test.com",
      first_name: "test",
      last_name: "test",
      token: "tokeneything",
    };

    useSelectorMock.mockReturnValue({ lists: lists });
    axios.get.mockReturnValue({ lists: lists });
    useSelectorMock.mockReturnValue({ user: user });
    axios.get.mockResolvedValueOnce({ user: user });
    render(container);
  });
  screen.getByText("Add to list");
});

test("does open new modal on click", async () => {
  await act(async () => {
    let lists = [
      {
        id: 1,
        owner: {
          id: 2,
          email: "test@test.com",
          first_name: "test",
          last_name: "user",
        },
        subscribers: [],
        created: "2021-07-23T14:30:08.814573Z",
        modified: "2021-07-23T14:40:45.576233Z",
        description: "New Test List Desc",
        name: "Test List",
        courses: ["4765692fbbeb11a0033cf39aea8ece8f"],
      },
    ];
    let user = {
      email: "test@test.com",
      first_name: "test",
      last_name: "test",
      token: "tokeneything",
    };
    let state = { lists: lists, user: user };

    useSelectorMock.mockReturnValue(state);
    axios.get.mockReturnValue({ lists: lists });
    axios.get.mockResolvedValueOnce({ user: user });
    render(container);
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Add to list"));
  });
  screen.getByText("Add");
  screen.getByText("Test List");
  screen.getByText("1");
  screen.getByText("List Title");
  screen.getByText("List Description");
  screen.getByText("Create New List");
  screen.getByPlaceholderText("New List Title");
  screen.getByPlaceholderText("New List Description");
  await act(async () => {
    const check = screen.getByText("Test List", { exact: false });
    fireEvent.click(check);
    fireEvent.click(check);
  });
  await act(async () => {
    let lists = ["1234", "2345"];
    let user = {
      email: "test@test.com",
      first_name: "test",
      last_name: "test",
      token: "tokeneything",
    };
    let state = { lists: lists, user: user };

    useSelectorMock.mockReturnValue(state);
    axios.post.mockImplementationOnce(() =>Promise.resolve({data: {}}));
    axios.get.mockImplementationOnce(() =>Promise.resolve({data: lists}));
    fireEvent.click(screen.getByText("Add"));
  });
});

test("does add new list", async () => {
  await act(async () => {
    let lists = [
      {
        id: 1,
        owner: {
          id: 2,
          email: "test@test.com",
          first_name: "test",
          last_name: "user",
        },
        subscribers: [],
        created: "2021-07-23T14:30:08.814573Z",
        modified: "2021-07-23T14:40:45.576233Z",
        description: "New Test List Desc",
        name: "Test List",
        courses: ["4765692fbbeb11a0033cf39aea8ece8f"],
      },
    ];
    let user = {
      email: "test@test.com",
      first_name: "test",
      last_name: "test",
      token: "tokeneything",
    };
    let state = { lists: lists, user: user };

    useSelectorMock.mockReturnValue(state);
    axios.get.mockReturnValue({ lists: lists });
    axios.get.mockResolvedValueOnce({ user: user });
    render(container);
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Add to list"));
  });
  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText("New List Title"), {
      target: { value: "New Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("New List Description"), {
      target: { value: "New Title" },
    });
    let lists = [
      {
        id: 1,
        owner: {
          id: 2,
          email: "test@test.com",
          first_name: "test",
          last_name: "user",
        },
        subscribers: [],
        created: "2021-07-23T14:30:08.814573Z",
        modified: "2021-07-23T14:40:45.576233Z",
        description: "New Test List Desc",
        name: "Test List",
        courses: ["4765692fbbeb11a0033cf39aea8ece8f"],
      },
      {
        id: 2,
        owner: {
          id: 2,
          email: "test@test.com",
          first_name: "test",
          last_name: "user",
        },
        subscribers: [],
        created: "2021-07-23T14:30:08.814573Z",
        modified: "2021-07-23T14:40:45.576233Z",
        description: "New Test List Desc",
        name: "Test List",
        courses: [],
      },
    ];
    let user = {
      email: "test@test.com",
      first_name: "test",
      last_name: "test",
      token: "tokeneything",
    };
    let state = { lists: lists, user: user };
    
    useSelectorMock.mockReturnValue(state);
    axios.post.mockImplementationOnce(() =>Promise.resolve({data: {}}));
    fireEvent.click(screen.getByText("Create New List"));
  });
  await act(async () => {
    fireEvent.click(screen.getByTestId("listTitle"));
  });
});
