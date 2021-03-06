import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const EventCard = ({ setShowModal, setCurrentModal, ...event }) => {
  const {
    id,
    color,
    name,
    date,
    time,
    company,
    email,
    phone,
    address,
    description,
    image,
  } = event;

  const currentDate = moment().format(date, "YYYY-MM-DD");
  const eventAddress =
    address && address.includes(",") ? address.split(",") : address ? address : "N/A";

  return (
    <div className="event-modal flexbox" style={{ boxShadow: `0 0 3px 1px ${color}` }}>
      <div className="title-date-flexbox">
        <div>
          <div className="flexbox">
            <h2>{name}</h2>
            {typeof eventAddress === "object" ? (
              <h3>
                {eventAddress[1]}, {eventAddress[2]}
              </h3>
            ) : (
              <h3>Address: {eventAddress}</h3>
            )}
          </div>
          <h3>
            <span className="inline-subtext">Presented by:</span> {company}
          </h3>
        </div>
        <div>
          <p>
            <span>{moment(currentDate).format("MMMM Do, YYYY")}</span>

            {time ? (
              <span>
                {" "}
                {" @ "}
                {time}pm
              </span>
            ) : null}
          </p>
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div className="flexbox">
          {address ? (
            <div className="location-container">
              <p className="card-section-title">Location:</p>
              {typeof eventAddress === "object" ? (
                <React.Fragment>
                  <p>{eventAddress[0]}</p>
                  <p>
                    {eventAddress[1]}, {eventAddress[2]} {eventAddress[3]}
                  </p>
                </React.Fragment>
              ) : (
                <p>{eventAddress}</p>
              )}
            </div>
          ) : null}
          <div className="contact-container">
            <p className="card-section-title">Contact:</p>
            <p>
              <b>Email:</b> {email ? email : "N/A"}
            </p>
            <p>
              <b>Phone:</b> {phone ? phone : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="card-image">
        {image ? <img src={image} alt={`${company}'s ${name} Event`} /> : null}
        <Link to={`/edit/${id}`}>
          <button>Edit Event</button>
        </Link>
        <button
          onClick={() => {
            setShowModal(false);
            setCurrentModal(null);
          }}
        >
          Hide Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
