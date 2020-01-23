import { createReducer } from './utils';
import {EVENTS_ACTIONS} from "../actions/events";


const selectEventAction = (state, action) => ({
    ...state,
    selectedEvent: action.selectedEvent,
});
const setEventsForSport = (state, action) => ({
    ...state,
    list: action.data,
});


export default createReducer(
    {
        list: null,
        selectedEvent: {},
    },
    {
        [EVENTS_ACTIONS.SELECT_EVENT]: selectEventAction,
        [EVENTS_ACTIONS.SET_EVENTS_BY_SPORT]: setEventsForSport,
    }
);
