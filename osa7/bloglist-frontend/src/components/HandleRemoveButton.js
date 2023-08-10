import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import blogService from "../services/blogs";
import { useMessageDispatch } from "../Context";
import { Button } from "@mui/material";

function HandleRemoveButton({ blogId, token, title, author, blogTitle }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const messageDispatch = useMessageDispatch();

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      try {
        await removeBlogMutation.mutateAsync(blogId, token);
        messageDispatch({ type: "BLOG_REMOVE", title: blogTitle });
        navigate("/");
      } catch (exception) {
        // Handle error
      }
    }
  };

  return <Button variant="contained" color="error" onClick={handleRemove}>remove blog</Button>;
}

export default HandleRemoveButton;
