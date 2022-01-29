import React from "react";

import { useEventContext } from "../contexts/event_context";

const EventCard = ({ index, ...event }) => {
  const { name, company, description, id } = event;

  const { showModal, currentModal, openModal, handleDeletion } = useEventContext();

  console.log("EVENT ID", id);

  return (
    <div className="event-card">
      <div className="title-date-flexbox">
        <div>
          <h2>{name}</h2>
        </div>

        <div>
          <p>{description}</p>
        </div>

        <div>
          <h3>
            <span className="inline-subtext">Presented by:</span> {company}
          </h3>
        </div>
      </div>
      <div className="flexbox">
        <button
          onClick={() => {
            console.log("1", index, currentModal);
            openModal(index);
            console.log("2", index, currentModal);
          }}
        >
          View Event
        </button>
        <button onClick={() => handleDeletion(id)}>Delete Event</button>
      </div>
    </div>
  );
};

export default EventCard;
