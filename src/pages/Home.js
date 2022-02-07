import React, { useState } from "react";
import { Link } from "react-router-dom";

import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";

import { useEventContext } from "../contexts/event_context";

import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";

const Home = () => {
  const {
    events_data,
    sortData,
    data_sort,
    sorted_data,
    error,
    deleteMultiple,
  } = useEventContext();

  const [ currentModal, setCurrentModal ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);

  return (
    <main className="homepage-container">
      <h1>Events Catalog</h1>
      <button onClick={() => sortData()}>
        <b>
          {data_sort && sorted_data.length > 1 ? "Z - A " : "A - Z "}
          {data_sort && sorted_data.length > 1 ? (
            <FaLongArrowAltUp />
          ) : (
            <FaLongArrowAltDown />
          )}
        </b>
      </button>
      <button onClick={() => deleteMultiple()}>Delete Selected</button>
      <section className="events-container">
        {events_data.map((event, index) => {
          return (
            <EventCard
              key={event.id}
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

      {error.fetchError ? (
        <React.Fragment>
          <div className="error-message">{error.fetchError.error_message}</div>
        </React.Fragment>
      ) : null}

      {showModal ? (
        <EventModal
          setShowModal={setShowModal}
          setCurrentModal={setCurrentModal}
          {...events_data[currentModal]}
        />
      ) : null}
      {showModal && <div className="backdrop" onClick={() => setShowModal(false)} />}
    </main>
  );
};

export default Home;
