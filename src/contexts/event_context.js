import {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  createContext,
} from "react";

import reducer from "../reducers/event_reducer";

import {
  FETCH_DATA_SUCCESS,
  SORT_DATA,
  SET_FORM_DATA,
  UPDATE_FORM,
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  DELETE_MULTIPLE,
  HANDLE_SELECTION,
} from "../util/actions";

// CORS & API URL
const apiUrl = process.env.REACT_APP_API_URL;
const fetchHeaders = { "Content-Type": "application/json" };
const requestOptions = (method, data) => {
  return {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};

// initial State / Store
const initialState = {
  events_data: [],
  sorted_data: [],
  form_data: [],
  showModal: false,
  currentModal: null,
  data_sort: true,
  selection_data: [],
};

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  // Successful Form Submission for PUT / POST
  const [ formSuccess, setFormSuccess ] = useState(false);

  // Error Handling
  const initialErrorState = {
    fetchError: false,
    formError: false,
    deletionError: false,
  };
  const [ error, setError ] = useState(initialErrorState);
  // Form Error Messages
  const formErrorMessage = (dataType, charLength) =>
    `Please include a ${dataType} that is at least ${charLength.toString()} characters long.`;
  // Server Error Message
  const serverErrorMessage = (status, message) =>
    `Sorry, a server error (Error ${status}) occurred and ${message}. Please try again later.`;
  // Unknown Error
  const unknownErrorMessage = (message) =>
    `Sorry, an unknown error has occurred and ${message} Please try again later.`;

  // Fetch / Read Data from Server
  const fetchData = useCallback(async () => {
    setError(initialErrorState);
    try {
      const response = await fetch(apiUrl, { method: "GET", headers: fetchHeaders });
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
      }
      if (!response.ok) {
        setError({
          fetchError: {
            error_message: serverErrorMessage(response.status, "Unable to load events"),
          },
        });
      }
    } catch (err) {
      setError({
        fetchError: { error_message: unknownErrorMessage("Events were unable to load") },
      });
    }
    //eslint-disable-next-line
  }, []);

  // Set form data on load to existing data when editing
  const setFormData = useCallback((initialFormData) => {
    dispatch({ type: SET_FORM_DATA, payload: initialFormData });
  }, []);

  // Dynamically change Form Data / Controlled inputs
  const handleFormData = (e) => {
    let formName = e.target.name;
    let formValue = e.target.value;
    dispatch({ type: UPDATE_FORM, payload: { formName, formValue } });
  };

  //
  //
  // Handles both Put and Post Requests
  const handleSubmit = async (e, httpMethod, eventId) => {
    e.preventDefault();
    setError(initialErrorState);

    try {
      if (
        state.form_data.color !== "none" &&
        state.form_data.name.length > 2 &&
        state.form_data.company.length > 2 &&
        state.form_data.description.length > 3
      ) {
        // Edit Event Form
        if (httpMethod === "PUT") {
          const response = await fetch(
            `${apiUrl}/${eventId}`,
            requestOptions("PUT", state.form_data)
          );
          const data = await response.json();

          if (data.name && response.ok) {
            dispatch({ type: EDIT_EVENT, payload: { data, eventId } });
            setFormSuccess(true);
            setFormSuccess(false);
            // setChangeSuccessful({ put: true });
          }

          if (!response.ok) {
            setError({
              formError: {
                error_message: serverErrorMessage(
                  response.status,
                  "Event was not edited"
                ),
              },
            });
          }
        }

        // Add Event Form
        if (httpMethod === "POST") {
          const response = await fetch(apiUrl, requestOptions("POST", state.form_data));
          const data = await response.json();

          if (response.ok) {
            dispatch({ type: ADD_EVENT, payload: data });
            setFormSuccess(true);
            setFormSuccess(false);
          }

          if (!response.ok) {
            setError({
              formError: {
                error_message: serverErrorMessage(
                  response.status,
                  "Event was not created"
                ),
              },
            });
          }
        }
      }
      // Catch + Display Errors if Form Data in wrong format
      if (state.form_data.name.length < 3) {
        setError({ formError: { error_message: formErrorMessage("Event Name", 3) } });
      }
      if (state.form_data.company.length < 3) {
        setError({ formError: { error_message: formErrorMessage("Company Name", 3) } });
      }
      if (state.form_data.description.length < 4) {
        setError({ formError: { error_message: formErrorMessage("Description", 4) } });
      }
      if (state.form_data.color === "none") {
        setError({
          formError: { error_message: "No color was selected, but is required" },
        });
      }
    } catch (err) {
      setError({
        formError: {
          error_message: "Sorry, an unknown error has occurred, please try again later.",
        },
      });
    }
  };

  // Delete Event
  const handleDeletion = async (id) => {
    setError(initialErrorState);
    try {
      const eventId = id;
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

      if (response.ok) {
        dispatch({ type: DELETE_EVENT, payload: eventId });
      }

      if (!response.ok) {
        setError({
          deletionError: {
            error_message: serverErrorMessage(response.status, "Event was not deleted"),
            deletionId: id,
          },
        });
      }
    } catch (err) {
      setError({
        deletionError: {
          error_message: unknownErrorMessage("Event was not deleted"),
          deletionId: id,
        },
      });
    }
  };

  // Delete Multiple Events
  const deleteSelection = async () => {
    // try {
    //   // Or "DELETE" request depending on sever configuration
    //   const response = await fetch(
    //     `${apiUrl}/delete`,
    //     requestOptions("POST", state.selection_data)
    //   );

    //   if (response.ok) {
    dispatch({ type: DELETE_MULTIPLE });
    //   }
    //   if (!response.ok) {
    //     setError({
    //       deletionError: {
    //         error_message: serverErrorMessage(
    //           response.status,
    //           "Multiple Events were not deleted"
    //         ),
    //       },
    //     });
    //   }
    // } catch (err) {
    //   setError({
    //     deletionError: {
    //       error_message: unknownErrorMessage("Multiple Events were not deleted"),
    //     },
    //   });
    // }
  };

  // Delete Selection Handler
  const handleSelection = (e, event) => {
    let array = state.selection_data;
    if (e.target.checked) {
      array.push(event);
    } else {
      array = state.selection_data.filter((data) => data.id !== event.id);
    }
    dispatch({ type: HANDLE_SELECTION, payload: array });
  };

  // Sort Data Alphabetically / Reverse Alphabetically
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
    //eslint-disable-next-line
  }, []);

  return (
    <EventContext.Provider
      value={{
        ...state,
        fetchData,
        setFormData,
        handleFormData,
        handleSubmit,
        sortData,
        handleDeletion,
        handleSelection,
        deleteSelection,
        formSuccess,
        error,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  return useContext(EventContext);
};
