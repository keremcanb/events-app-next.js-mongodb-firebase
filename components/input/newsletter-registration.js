import { useRef, useContext } from 'react';
import { post } from 'axios';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

const NewsletterRegistration = () => {
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending'
    });
    try {
      // email property from API
      await post('/api/newsletter', { email });
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter!',
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
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input type="email" id="email" placeholder="Your email" aria-label="Your email" ref={emailRef} />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
