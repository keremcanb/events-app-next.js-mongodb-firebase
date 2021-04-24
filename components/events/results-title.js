import Moment from 'react-moment';
import Button from '../ui/button';
import classes from './results-title.module.css';

const ResultsTitle = ({ date }) => (
  <section className={classes.title}>
    <h1>
      Events in <Moment format="MMMM">{date}</Moment>
    </h1>
    <Button link="/events">Show all events</Button>
  </section>
);

export default ResultsTitle;
