import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const createButton = screen.getByText("create");

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");

  await user.type(title, "testtitle");
  await user.type(author, "testauthor");
  await user.type(url, "testurl");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testtitle");
});
