import { useEffect, useContext, useReducer, useCallback, createContext } from "react";

import reducer from "../reducers/event_reducer";

import { FETCH_DATA_SUCCESS, OPEN_MODAL, CLOSE_MODAL } from "../util/actions";

const apiUrl = process.env.API_URL;
const fetchHeaders = { "Content-Type": "application/json" };

const initialState = {
  events_data: [],
  form_data: [],
  showModal: false,
  currentModal: null,
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

  const changeCurrentModal = (index) => {
    dispatch({ type: OPEN_MODAL, payload: index });
  };

  const openModal = (index) => {
    dispatch({ type: OPEN_MODAL, payload: index });
  };

  const closeModal = (index) => {
    dispatch({ type: CLOSE_MODAL });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(
  //   () => {
  //     initialState.showModal = !initialState.showModal;
  //   },
  //   [ initialState.currentModal ]
  // );

  return (
    <EventContext.Provider
      value={{ ...state, fetchData, changeCurrentModal, openModal, closeModal }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  return useContext(EventContext);
};
