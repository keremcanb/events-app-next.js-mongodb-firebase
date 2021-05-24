import { useRouter } from 'next/router';
import Head from 'next/head';
import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

const AllEventsPage = ({ events }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>All my events</title>
      </Head>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve" />
      </Head>
      {/* Get selected year/month from form, redirect to url and let ...slug catch url */}
      <EventsSearch
        onSearch={(year, month) => {
          router.push(`/events/${year}/${month}`);
        }}
      />
      <EventList items={events} />
    </>
  );
};
// Get all events
export const getStaticProps = async () => {
  const events = await getAllEvents();
  return { props: { events }, revalidate: 86400 };
};

export default AllEventsPage;
