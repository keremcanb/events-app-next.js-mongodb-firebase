import Head from 'next/head';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Comments from '../../components/input/comments';
import Loader from '../../components/ui/loader';

const EventDetailPage = ({ selectedEvent, selectedEvent: { title, description, location, image, date, id } }) =>
  selectedEvent ? (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <EventSummary title={title} />
      <EventLogistics date={date} address={location} image={image} imageAlt={title} />
      <EventContent>
        <p>{description}</p>
      </EventContent>
      <Comments eventId={id} />
    </>
  ) : (
    <Loader />
  );
// Get single event
export const getStaticProps = async (context) => {
  const { eventId } = context.params;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 86400
  };
};
// Which event ids to prerender
export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  // Get all event ids
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    // Don't server anything until done generating page
    fallback: 'blocking'
  };
};

export default EventDetailPage;
