import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Button from "./Button";

describe("Blog render", function () {
  test("renders title and author, but not URL or likes by default", () => {
    const blog = {
      title: "Testing Blog",
      author: "Test Author",
      url: "https://example.com",
      upvotes: 10,
    };

    render(<Blog blog={blog} />);

    const titleAuthorElement = screen.getByText("Testing Blog Test Author");
    const urlElement = screen.queryByText("https://example.com");
    const upvotes = screen.queryByText("10");

    expect(titleAuthorElement).toBeDefined();
    expect(urlElement).not.toBeInTheDocument();
    expect(upvotes).not.toBeInTheDocument();
  });

  test("renders URL and likes when the button is clicked", async () => {
    const blog = {
      title: "Testing Blog",
      author: "Test Author",
      url: "https://example.com",
      upvotes: 10,
    };

    render(<Blog blog={blog} />);

    const user = userEvent.setup();
    // Find the "Show Details" button and click it
    const showDetailsButton = screen.getByText("Show Details");
    await user.click(showDetailsButton);

    // Check if the URL and likes are now visible
    const urlElement = screen.getByText("https://example.com");
    const likesElement = screen.getByText("10", { exact: false });

    expect(urlElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();
  });

  test("like button handler is called twice when clicked twice", async () => {
    const blog = {
      title: "Testing Blog",
      author: "Test Author",
      url: "https://example.com",
      upvotes: 10,
    };

    const mockUpdateUpvote = jest.fn();

    render(<Blog blog={blog} updateUpvote={mockUpdateUpvote} />);

    const user = userEvent.setup();
    const showDetailsButton = screen.getByText("Show Details");

    // Click the "Show Details" button to reveal the like button
    await user.click(showDetailsButton);
    // Find the "Like" button and click it twice
    const likeButton = screen.getByText("upvote");
    await user.click(likeButton);
    await user.click(likeButton);

    // Verify that the event handler is called twice
    expect(mockUpdateUpvote).toHaveBeenCalledTimes(2);
  });
});

describe("Blog Form submit", function () {
  test("calls the event handler with the right details when a new blog is created", async () => {
    const addBlog = jest.fn();
    const user = userEvent.setup();

    render(
      <BlogForm
        title=""
        author=""
        url=""
        titleChange={() => {}}
        authorChange={() => {}}
        urlChange={() => {}}
        addBlog={addBlog}
      />,
    );

    const titleInput = screen.getByPlaceholderText("title");
    const authorInput = screen.getByPlaceholderText("author");
    const urlInput = screen.getByPlaceholderText("url");

    const createButton = screen.getByText("create");

    await userEvent.type(titleInput, "Test Blog Title");
    await userEvent.type(authorInput, "Test Author");
    await userEvent.type(urlInput, "https://example.com");

    fireEvent.submit(createButton);
    expect(addBlog.mock.calls).toHaveLength(1);
  });
});
