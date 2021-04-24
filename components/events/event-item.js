import Image from 'next/image';
import Moment from 'react-moment';
import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import classes from './event-item.module.css';

const EventItem = ({ id, title, image, date, location }) => (
  <li className={classes.item}>
    <Image src={`/${image}`} alt={title} width={250} height={160} />
    <div className={classes.content}>
      <div className={classes.summary}>
        <h2>{title}</h2>
        <div className={classes.date}>
          <DateIcon />
          <time>
            <Moment format="MM/DD/YYYY">{date}</Moment>
          </time>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{location.replace(', ', '\n')}</address>
        </div>
      </div>
      <div className={classes.actions}>
        <Button link={`/events/${id}`}>
          <span>Explore Event</span>
          <span className={classes.icon}>
            <ArrowRightIcon />
          </span>
        </Button>
      </div>
    </div>
  </li>
);

export default EventItem;
