import { Link } from "react-router-dom";

import EventForm from "../components/EventForm";

const AddEvent = () => {
  return (
    <main>
      <Link to="/">
        <button>Return to All Events</button>
      </Link>
      <h1>Add Event</h1>
      <EventForm />
    </main>
  );
};

export default AddEvent;
