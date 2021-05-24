import Head from 'next/head';
import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';

const HomePage = ({ events }) => (
  <div>
    <Head>
      <title>NextJS Events</title>
      <meta name="description" content="Find a lot of great events that allow you to evolve" />
    </Head>
    <NewsletterRegistration />
    <EventList items={events} />
  </div>
);

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return { props: { events: featuredEvents }, revalidate: 1 };
};

export default HomePage;
