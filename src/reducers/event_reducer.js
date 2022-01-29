import {
  FETCH_DATA_SUCCESS,
  SORT_DATA,
  OPEN_MODAL,
  CLOSE_MODAL,
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

    case UPDATE_FORM: {
      const { formName, formValue } = payload;
      return { ...state, form_data: { ...state.form_data, [formName]: formValue } };
    }

    case CLEAR_FORM: {
      const { defaultFormData } = payload;
      return { ...state, form_data: defaultFormData };
    }

    case SORT_DATA: {
      const { sortedData } = payload;
      return {
        ...state,
        form_data: sortedData,
        sorted_data: sortedData,
        data_sort: !state.data_sort,
      };
    }

    case ADD_EVENT: {
      const updatedEvents = payload;
      return { ...state, events_data: updatedEvents };
    }

    case EDIT_EVENT: {
      const updatedEvents = payload;
      return { ...state, events_data: updatedEvents };
    }

    case DELETE_EVENT: {
      const { filteredData } = payload;
      return { ...state, events_data: filteredData };
    }

    case DELETE_SORTED_EVENT: {
      const { filteredData } = payload;
      return { ...state, events_data: filteredData, sorted_data: filteredData };
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default event_reducer;
