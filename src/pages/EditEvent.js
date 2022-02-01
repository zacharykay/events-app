import React from "react";
import { useLocation, Link } from "react-router-dom";

import { useEventContext } from "../contexts/event_context";

import EventForm from "../components/EventForm";

const EditEvent = () => {
  const { events_data } = useEventContext();

  const usePathname = () => {
    const location = useLocation();
    let id;
    try {
      id = location.pathname.split("/")[2];
    } catch (err) {
      console.log(err, `Sorry, no event with id of ${id} exists`);
    }
    if (id) {
      return parseInt(id);
    } else {
      throw new Error(`Sorry, no event was found`);
    }
  };

  const eventId = usePathname();

  const currentEvent = events_data.filter((event) => {
    return event.id === eventId;
  });
  console.log("currentEvent", currentEvent[0]);

  return (
    <main>
      <Link to="/">
        <button>Return to All Events</button>
      </Link>
      <h1>Edit Event</h1>
      <EventForm
        editEvent
        eventId={eventId}
        currentEvent={currentEvent}
        {...currentEvent[0]}
      />
    </main>
  );
};

export default EditEvent;
