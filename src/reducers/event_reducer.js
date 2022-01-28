import { FETCH_DATA_SUCCESS, OPEN_MODAL, CLOSE_MODAL } from "../util/actions";

const event_reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_DATA_SUCCESS:
      return { ...state, events_data: payload };

    case OPEN_MODAL:
      return { ...state, currentModal: payload, showModal: true };

    case CLOSE_MODAL:
      return { ...state, currentModal: null, showModal: false };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default event_reducer;
