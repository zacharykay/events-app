import { useParams, Link } from "react-router-dom";

import { useEventContext } from "../contexts/event_context";

import EventForm from "../components/EventForm";

const EditEvent = () => {
  const { events_data } = useEventContext();

  let { id } = useParams();
  const eventId = parseInt(id);

  const currentEvent = events_data.filter((event) => {
    return event.id === eventId;
  });

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
