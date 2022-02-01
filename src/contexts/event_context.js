import { useEffect, useContext, useReducer, useCallback, createContext } from "react";

import reducer from "../reducers/event_reducer";

import {
  FETCH_DATA_SUCCESS,
  SORT_DATA,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_FORM_DATA,
  UPDATE_FORM,
  CLEAR_FORM,
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  DELETE_SORTED_EVENT,
} from "../util/actions";

// CORS & API URL
const apiUrl = process.env.REACT_APP_API_URL;
console.log("API URL", apiUrl);
const fetchHeaders = { "Content-Type": "application/json" };
const requestOptions = (method, data) => {
  return {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};

const initialState = {
  events_data: [],
  sorted_data: [],
  form_data: [],
  showModal: false,
  currentModal: null,
  data_sort: true,
};

const blankFormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  description: "",
  color: "none",
};

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(apiUrl, { method: "GET", headers: fetchHeaders });
      const data = await response.json();

      dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
    } catch (err) {
      console.log("Could not fetch events", err);
    }
  }, []);

  // const changeCurrentModal = (index) => {
  //   dispatch({ type: OPEN_MODAL, payload: index });
  // };

  // const openModal = (index) => {
  //   dispatch({ type: OPEN_MODAL, payload: index });
  // };

  // const closeModal = (index) => {
  //   dispatch({ type: CLOSE_MODAL });
  // };

  const setFormData = useCallback((initialFormData) => {
    console.log("INITIAL", initialFormData);
    dispatch({ type: SET_FORM_DATA, payload: initialFormData });
  }, []);

  const handleFormData = (e) => {
    let formName = e.target.name;
    let formValue = e.target.value;
    dispatch({ type: UPDATE_FORM, payload: { formName, formValue } });
  };

  const clearFormData = () => {
    dispatch({ type: CLEAR_FORM, payload: blankFormData });
  };

  // Handles both Put and Post Requests
  const handleSubmit = async (e, httpMethod, eventId) => {
    e.preventDefault();

    try {
      if (state.form_data.color !== "none") {
        if (httpMethod === "PUT") {
          const response = await fetch(
            `${apiUrl}/${eventId}`,
            requestOptions("PUT", state.form_data)
          );
          const data = await response.json();

          if (response.ok) {
            dispatch({ type: EDIT_EVENT, payload: { data, eventId } });
          }

          if (!response.ok) {
            throw new Error(response.status);
          }
        }

        if (httpMethod === "POST") {
          const response = await fetch(apiUrl, requestOptions("POST", state.form_data));
          const data = await response.json();

          if (response.ok) {
            dispatch({ type: ADD_EVENT, payload: data });
          }

          if (!response.ok) {
            throw new Error(response.status);
          }
        }
      } else {
        throw new Error("No color scheme selected");
      }

      // clearFormData();
    } catch (err) {
      throw new Error("Data not in proper formats", err);
    }
  };

  const handleDeletion = async (id) => {
    try {
      const eventId = id;
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

      if (response.ok) {
        dispatch({ type: DELETE_EVENT, payload: eventId });
      }
    } catch (err) {
      throw new Error("Deletion Failed");
    }
  };

  const sortData = () => {
    let sortedData = state.events_data.sort((a, b) => {
      return a.company.localeCompare(b.company, "en", { sensitivity: "base" });
    });

    if (!state.data_sort) {
      sortedData = sortedData.reverse();
    }

    dispatch({ type: SORT_DATA, payload: { sortedData } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <EventContext.Provider
      value={{
        ...state,
        fetchData,
        // changeCurrentModal,
        // openModal,
        // closeModal,
        setFormData,
        handleFormData,
        clearFormData,
        handleSubmit,
        sortData,
        handleDeletion,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  return useContext(EventContext);
};
