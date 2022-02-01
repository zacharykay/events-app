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

const event_reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_DATA_SUCCESS: {
      return { ...state, events_data: payload };
    }

    case OPEN_MODAL: {
      return { ...state, currentModal: payload, showModal: true };
    }

    case CLOSE_MODAL: {
      return { ...state, currentModal: null, showModal: false };
    }

    case SET_FORM_DATA: {
      return { ...state, form_data: payload };
    }

    case UPDATE_FORM: {
      const { formName, formValue } = payload;
      return { ...state, form_data: { ...state.form_data, [formName]: formValue } };
    }

    case CLEAR_FORM: {
      const { blankFormData } = payload;
      return { ...state, form_data: blankFormData };
    }

    case SORT_DATA: {
      const { sortedData } = payload;
      return {
        ...state,
        sorted_data: sortedData,
        data_sort: !state.data_sort,
      };
    }

    case ADD_EVENT: {
      const data = payload;
      return { ...state, events_data: [ ...state.events_data, data ] };
    }

    case EDIT_EVENT: {
      const { data, eventId } = payload;
      console.log("DATA", data);
      const tempEvents = state.events_data.map((event) => {
        // console.log("EVENT", eventId, event);
        if (event.id === eventId) {
          event = data;
        }
        return event;
      });
      console.log("tempEvents", tempEvents);

      return { ...state, events_data: tempEvents };
    }

    case DELETE_EVENT: {
      return {
        ...state,
        events_data: state.events_data.filter((event) => {
          return event.id !== payload;
        }),
      };
    }

    case DELETE_SORTED_EVENT: {
      const { filteredData } = payload;
      return { ...state, events_data: filteredData, sorted_data: filteredData };
    }

    default:
      return state;
  }

  // throw new Error(`No Matching "${action.type}" - action type`);
};

export default event_reducer;
