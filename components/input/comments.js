import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';
import Loader from '../ui/loader';

const Comments = ({ eventId }) => {
  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  // If showComments true, get Comments
  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      const fetchData = async () => {
        const { data } = await axios(`/api/comments/${eventId}`);
        // API route comments object
        setComments(data.comments);
        setIsFetchingComments(false);
      };
      fetchData();
    }
  }, [showComments, eventId]);
  // Toggle Comments
  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };
  // Add Comment
  const addCommentHandler = async (commentData) => {
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored into a database.',
      status: 'pending'
    });
    // Post Comment
    try {
      await axios.post(`/api/comments/${eventId}`, commentData);
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Your comment was saved!',
        status: 'success'
      });
    } catch (err) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: err.message || 'Something went wrong!',
        status: 'error'
      });
    }
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <Loader />}
    </section>
  );
};

export default Comments;
