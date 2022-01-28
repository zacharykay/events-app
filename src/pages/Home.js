import React from "react";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";

import { useEventContext } from "../contexts/event_context";

const Home = () => {
  const { events_data, showModal, closeModal, currentModal } = useEventContext();

  return (
    <main className="homepage-container">
      <h1>Events Catalog</h1>
      <button>Sort by Name</button>
      <section className="events-container">
        {events_data.map((event, index) => {
          console.log(events_data[1]);
          console.log("IDX", index);
          const { id } = event;
          return <EventCard key={id} index={index} {...event} />;
        })}
      </section>
      <button>Add New Event</button>
      {showModal && <EventModal {...events_data[currentModal]} />}
      {showModal && <div className="backdrop" onClick={() => closeModal()} />}
    </main>
  );
};

export default Home;
