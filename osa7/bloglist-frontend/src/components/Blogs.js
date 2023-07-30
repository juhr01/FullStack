import { useRef } from 'react'
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from './Blog'
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useMessageDispatch, useAuthDispatch, useAuthState } from "../Context";
import blogService from "../services/blogs";

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

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData("blogs", (oldData) => {
        return oldData.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog,
        );
      });
    },
  });

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
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

  const handleLikeChange = async (event) => {
    const likes = event.likes + 1;
    const likedBlog = { ...event, likes };
    try {
      await updateBlogMutation.mutateAsync(likedBlog);
      messageDispatch({ type: "BLOG_LIKE", title: likedBlog.title });
    } catch (exception) {
      messageDispatch({ type: "MISC_ERROR", error: exception });
    }
  };

  const handleRemove = async (event) => {
    if (window.confirm(`Remove blog ${event.title} by ${event.author}?`)) {
      try {
        await removeBlogMutation.mutateAsync(event.id, user.token);
        messageDispatch({ type: "BLOG_REMOVE", title: event.title });
      } catch (exception) {
        messageDispatch({ type: "MISC_ERROR", error: exception });
      }
    }
  };

    return (
        <div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeChange={handleLikeChange}
            handleRemove={handleRemove}
          />
        ))}
        </div>
    )
}

export default Blogs