import React from "react";
import { useEventContext } from "../contexts/event_context";

const EventCard = ({ index, setShowModal, setCurrentModal, ...event }) => {
  const { name, company, description, id } = event;

  const { handleDeletion, error, changeHandler, checkbox_ids } = useEventContext();

  return (
    <div className="event-card">
      <div>
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox"
          onChange={(e) => changeHandler(e, id)}
          checked={checkbox_ids.find((check) => check === id) || false}
        />
      </div>
      <div className="checkbox-container" />
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
            setCurrentModal(index);
            setShowModal(true);
          }}
        >
          View Event
        </button>
        <button onClick={() => handleDeletion(id)}>Delete Event</button>
      </div>

      {error.deletionError && error.deletionError.deletionId === id ? (
        <React.Fragment>
          <div className="error-message">{error.deletionError.error_message}</div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default EventCard;
