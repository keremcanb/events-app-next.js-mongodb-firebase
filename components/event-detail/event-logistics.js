import Image from 'next/image';
import Moment from 'react-moment';
import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import classes from './event-logistics.module.css';

const EventLogistics = ({ date, address, image, alt }) => (
  <section className={classes.logistics}>
    <div className={classes.image}>
      <Image src={`/${image}`} alt={alt} width={400} height={400} />
    </div>
    <ul className={classes.list}>
      <LogisticsItem icon={DateIcon}>
        <time>
          <Moment format="MM/DD/YYYY">{date}</Moment>
        </time>
      </LogisticsItem>
      <LogisticsItem icon={AddressIcon}>
        <address>{address.replace(', ', '\n')}</address>
      </LogisticsItem>
    </ul>
  </section>
);

export default EventLogistics;
