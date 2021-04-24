import { useContext, useEffect, useState } from 'react';
import { get, post } from 'axios';
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

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      const fetchData = async () => {
        const { data } = await get(`/api/comments/${eventId}`);
        // API route comments object
        setComments(data.comments);
        setIsFetchingComments(false);
      };
      fetchData();
    }
  }, [showComments, eventId]);

  const addCommentHandler = async (comment) => {
    try {
      notificationCtx.showNotification({
        title: 'Sending comment...',
        message: 'Your comment is currently being stored into a database.',
        status: 'pending'
      });
      await post(`/api/comments/${eventId}`, comment);
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
      <button onClick={() => setShowComments((prevStatus) => !prevStatus)}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <Loader />}
    </section>
  );
};

export default Comments;
