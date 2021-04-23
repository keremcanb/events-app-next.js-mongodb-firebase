import { useRouter } from 'next/router';
import Head from 'next/head';
import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

const AllEventsPage = ({ events }) => {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    // To trigger [...slug].js
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All my events</title>
      </Head>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      {/* Get selected year/month from for and trigger ...slug */}
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

// Get all events
export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events
    },
    revalidate: 86400
  };
};

export default AllEventsPage;
