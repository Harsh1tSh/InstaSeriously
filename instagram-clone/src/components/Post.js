import React, { useState } from 'react';
import './Post.css';

function Post({ username, imageUrl, caption }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const postComment = (e) => {
    e.preventDefault();  // Prevent the form from refreshing the page
    setComments([...comments, comment]);  // Add new comment to the comments array
    setComment('');  // Clear the input field after posting a comment
  };

  return (
    <div className="post">
      <h4>{username}</h4>
      <img src={imageUrl} alt="Post" />
      <button onClick={handleLike}>Like</button>
      <p>{likes} likes</p>
      <p>{caption}</p>
      <div>
        {comments.map((comment, index) => (
          <p key={index}><strong>{username}</strong>: {comment}</p>
        ))}
      </div>
      <form onSubmit={postComment}>
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default Post;
