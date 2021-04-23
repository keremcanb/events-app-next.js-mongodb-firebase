import { useRef, useState } from 'react';
import classes from './new-comment.module.css';

const NewComment = ({ onAddComment }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const emailRef = useRef();
  const nameRef = useRef();
  const commentRef = useRef();

  const sendCommentHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const text = commentRef.current.value;

    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      setIsInvalid(true);
      return;
    }

    onAddComment({
      email,
      name,
      text
    });
  };

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows="5" ref={commentRef} />
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button className={classes.btn}>Submit</button>
    </form>
  );
};

export default NewComment;
