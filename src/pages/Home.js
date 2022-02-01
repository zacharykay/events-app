import React, { useState } from "react";
import { Link } from "react-router-dom";

import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";

import { useEventContext } from "../contexts/event_context";

const Home = () => {
  const {
    events_data,
    // showModal,
    // closeModal,
    // currentModal,
    sortData,
  } = useEventContext();

  const [ currentModal, setCurrentModal ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);

  return (
    <main className="homepage-container">
      <h1>Events Catalog</h1>
      <button onClick={() => sortData()}>Sort by Name</button>
      <section className="events-container">
        {console.log("EVENTS DATA RENDER", events_data)}
        {events_data.map((event, index) => {
          return (
            <EventCard
              key={index}
              index={index}
              setShowModal={setShowModal}
              setCurrentModal={setCurrentModal}
              {...event}
            />
          );
        })}
      </section>
      <Link to="/new">
        <button>Add New Event</button>
      </Link>
      {showModal && (
        <EventModal
          setShowModal={setShowModal}
          setCurrentModal={setCurrentModal}
          {...events_data[currentModal]}
        />
      )}
      {showModal && <div className="backdrop" onClick={() => setShowModal(false)} />}
    </main>
  );
};

export default Home;
