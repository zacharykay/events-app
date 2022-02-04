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

const event_reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_DATA_SUCCESS: {
      return {
        ...state,
        events_data: payload,
      };
    }

    case SET_FORM_DATA: {
      return { ...state, form_data: payload };
    }

    case UPDATE_FORM: {
      const { formName, formValue } = payload;
      return { ...state, form_data: { ...state.form_data, [formName]: formValue } };
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
      return {
        ...state,
        events_data: [ ...state.events_data, data ],
      };
    }

    case EDIT_EVENT: {
      const { data, eventId } = payload;
      const tempEvents = state.events_data.map((event) => {
        if (event.id === eventId) {
          event = data;
        }
        return event;
      });

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

    case DELETE_MULTIPLE: {
      const ids = state.selection_data.map((selection) => selection.id);
      const filteredData = state.events_data.filter((event) => {
        if (ids.indexOf(event.id) > -1) {
          return;
        } else {
          return event;
        }
      });
      return {
        ...state,
        events_data: filteredData,
      };
    }

    case HANDLE_SELECTION: {
      return {
        ...state,
        selection_data: payload,
      };
    }

    default:
      return state;
  }
};

export default event_reducer;
