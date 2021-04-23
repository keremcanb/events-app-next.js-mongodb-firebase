import axios from 'axios';

export const getAllEvents = async () => {
  const { data } = await axios('https://nextjs-ef11e-default-rtdb.europe-west1.firebasedatabase.app/events.json');
  const events = [];
  // Convert Firebase object to array
  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    });
  }
  return events;
};

// Filter featured events
export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });
  return filteredEvents;
};