import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";
import userService from "../services/users";

const User = () => {
  const selectedUser = useParams();

  const blogsResult = useQuery("blogs", blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const usersResult = useQuery("users", userService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (usersResult.isLoading || blogsResult.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = blogsResult.data;
  const users = usersResult.data;

  const userBlogs = blogs.filter((blog) => blog.user.id === selectedUser.id);

  const selectedUserObject = users.find((user) => user.id === selectedUser.id);
  const selectedUserUsername = selectedUserObject
    ? selectedUserObject.username
    : "";

  return (
    <div>
      <div>
        <h2>{selectedUserUsername}</h2>
        <h3>added blogs</h3>
        <ul>
          {userBlogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;
