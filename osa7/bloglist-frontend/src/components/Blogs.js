import { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useMessageDispatch, useAuthState } from "../Context";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const Blogs = (props) => {
  const queryClient = useQueryClient();
  const messageDispatch = useMessageDispatch();
  const user = useAuthState();

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", blogs.concat(newBlog));
    },
  });

  const blogFormRef = useRef();

  const result = useQuery("blogs", blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = result.data;

  const addBlog = async (blogObject) => {
    try {
      await newBlogMutation.mutateAsync(blogObject, user.token);
      blogFormRef.current.toggleVisibility();
      messageDispatch({
        type: "BLOG_CREATE",
        title: blogObject.title,
        author: blogObject.author,
      });
    } catch (exception) {
      console.log(exception);
      messageDispatch({ type: "MISC_ERROR", error: exception });
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <br />
            <ul>
              {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                    <TableCell>{blog.author}</TableCell>
                  </TableRow>
                ))}
            </ul>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;
