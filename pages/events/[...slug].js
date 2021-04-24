import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import Loader from '../../components/ui/loader';

// We use client side data fetching instead of SSR, as no SEO needed for filtered events page
const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  // Get year/month array from url
  const filterData = router.query.slug;
  // Fetch all avents from Firebase
  const { data, error } = useSWR('https://nextjs-ef11e-default-rtdb.europe-west1.firebasedatabase.app/events.json');
  // Convert events data to array
  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="A list of filtered events." />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <Loader />
      </>
    );
  }

  // Get year and month from array
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  // Convert string to number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${numMonth}/${numYear}.`} />
    </Head>
  );

  // Wrong values entered in url check
  if (
    Number.isNaN(numYear) ||
    Number.isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  // Faulty or does not exist check
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;
