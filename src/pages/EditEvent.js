import React from "react";
import { useLocation, Link } from "react-router-dom";

import { useEventContext } from "../contexts/event_context";

import EventForm from "../components/EventForm";

const EditEvent = (props) => {
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
      return id;
    } else {
      throw new Error(`Sorry, no event was found`);
    }
  };

  const eventId = usePathname();

  // console.log(usePathname());
  return (
    <main>
      <Link to="/">
        <button>Return to All Events</button>
      </Link>
      <h1>Edit Event</h1>
      <EventForm editEvent eventId={eventId} {...events_data[eventId]} />
    </main>
  );
};

export default EditEvent;
