import React from "react";
import { Link } from "react-router-dom";

import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";

import { useEventContext } from "../contexts/event_context";

const Home = () => {
  const {
    events_data,
    showModal,
    closeModal,
    currentModal,
    sortData,
  } = useEventContext();

  return (
    <main className="homepage-container">
      <h1>Events Catalog</h1>
      <button onClick={() => sortData()}>Sort by Name</button>
      <section className="events-container">
        {events_data.map((event, index) => {
          const { id } = event;
          return <EventCard key={id} index={index} {...event} />;
        })}
      </section>
      <Link to="/new">
        <button>Add New Event</button>
      </Link>
      {showModal && <EventModal {...events_data[currentModal]} />}
      {showModal && <div className="backdrop" onClick={() => closeModal()} />}
    </main>
  );
};

export default Home;
