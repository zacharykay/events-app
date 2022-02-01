import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useEventContext } from "../contexts/event_context";

const EventForm = ({ editEvent, eventId, name, company, description, color }) => {
  const {
    form_data,
    setFormData,
    handleFormData,
    handleSubmit,
    formSuccess,
    error,
  } = useEventContext();

  const httpMethod = editEvent ? "PUT" : "POST";

  const initialFormData = {
    name: name || "",
    company: company || "",
    description: description || "",
    color: color || "none",
  };

  const [ isTouched, setIsTouched ] = useState({
    name: false,
    company: false,
    description: false,
    color: false,
  });

  const touchHandler = (e) => {
    const inputName = e.target.name;
    setIsTouched({ ...isTouched, [inputName]: true });
  };

  useEffect(
    () => {
      setFormData(initialFormData);
    },
    [ color ]
  );

  let navigate = useNavigate();

  useEffect(
    () => {
      if (formSuccess) {
        navigate("/");
      }
    },
    [ formSuccess ]
  );

  return (
    <section>
      <form className="event-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="name">Event Name</label>
          <input
            name="name"
            id="name"
            type="text"
            minLength={3}
            maxLength={50}
            placeholder={editEvent ? name : "Annual Convention"}
            value={editEvent && !isTouched.name ? name || "" : form_data.name || ""}
            onInput={handleFormData}
            onFocus={(e) => touchHandler(e)}
            required
          />
          <label htmlFor="company">Company Name</label>
          <input
            name="company"
            id="company"
            type="text"
            minLength={3}
            maxLength={50}
            placeholder={editEvent ? company : "Google"}
            value={
              editEvent && !isTouched.company ? company || "" : form_data.company || ""
            }
            onInput={handleFormData}
            onFocus={(e) => touchHandler(e)}
            required
          />
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            id="description"
            columns={5}
            placeholder={
              editEvent ? (
                description
              ) : (
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aperiam!"
              )
            }
            value={
              editEvent && !isTouched.description ? (
                description || ""
              ) : (
                form_data.description || ""
              )
            }
            onInput={handleFormData}
            onFocus={(e) => touchHandler(e)}
            required
          />
          <label htmlFor="color">Event Color Scheme</label>
          <select
            name="color"
            id="color"
            value={editEvent && !isTouched.color ? color : form_data.color}
            onChange={handleFormData}
            onFocus={(e) => touchHandler(e)}
            required
            style={
              form_data.color === "none" ? (
                { color: "inherit" }
              ) : (
                { color: form_data.color, backgroundColor: "#ddd" }
              )
            }
          >
            <option value="none">Please Select...</option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="brown">Brown</option>
            <option value="grey">Grey</option>
            <option value="black">Black</option>
          </select>
        </div>
        <button onClick={(e) => handleSubmit(e, httpMethod, eventId, form_data)}>
          Submit
        </button>
        {error.formError ? (
          <React.Fragment>
            <div className="error-message">{`Failed to ${editEvent
              ? "edit event details"
              : "add new event"}. Please fill out all fields correctly`}</div>
            <div className="error-message">{error.formError.error_message}</div>
          </React.Fragment>
        ) : null}
      </form>
    </section>
  );
};

export default EventForm;
