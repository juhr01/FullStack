import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useQueryClient, useQuery } from 'react-query'
import { useMessageDispatch } from "../Context";
import HandleRemoveButton from './HandleRemoveButton';

const Blog = ({ blogs, handleLikeChange, handleRemove, user }) => {
  const queryClient = useQueryClient()
  const { id } = useParams()
  const [removeVisible, setRemoveVisible] = useState(false);
  const [comment, setComment] = useState('')
  const messageDispatch = useMessageDispatch()

  const blog = blogs.find(b => b.id === id)

  const loggedBloglistUser = JSON.parse(
    localStorage.getItem("loggedBloglistUser"),
  );

  useEffect(() => {
    console.log(blog)
    if (loggedBloglistUser && blog.user.username !== loggedBloglistUser.username) {
      setRemoveVisible(true);
    }
  }, [loggedBloglistUser, blog]);

  const commentsResult = useQuery(['comments', id], () => blogService.getComments(id), {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (commentsResult.isLoading) {
    return <div>loading data...</div>
  }

  const comments = commentsResult.data

  const handleComment = async (event) => {
    event.preventDefault()
    const response = await blogService.addComment(blog.id, { comment: comment })


    if (!comment.trim()) {
      messageDispatch({ type: "MISC_ERROR", error: 'comment empty' });
      return;
    }

    if (response) {
      try {
        queryClient.invalidateQueries(['comments', id])
        messageDispatch({ type: "BLOG_COMMENT", title: blog.title });

      } catch (exception) {
        messageDispatch({ type: "MISC_ERROR", error: exception });
      }
    }

    setComment('')
  }

  return (
    <div id={blog.title}>
      <div>
        <h2>
          {blog.title} by {blog.author}{" "}
        </h2>
        <p>URL: {blog.url}</p>
        <p>
          Likes: {blog.likes}{" "}
          <button id="like-Button" onClick={() => handleLikeChange(blog)}>
            like
          </button>
          <br />
        </p>
        <p>Added by: {blog.user.username}</p>
        <HandleRemoveButton
            blogId={blog.id}
            token={user.token}
            title={blog.title}
            author={blog.author}
            blogTitle={blog.title}
          />
        <h3>Comments</h3>
        <form onSubmit={handleComment}>
          <input
            placeholder="comment..."
            value={comment}
            onChange={event => setComment(event.target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {comments.filter(c => c !== null).map(com => (
            <li key={com}>{com}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
