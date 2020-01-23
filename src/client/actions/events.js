import DataApi from "../services/api/data";
import {COMMON_ACTIONS} from "./common";

export const EVENTS_ACTIONS = {
    SELECT_EVENT: 'events.selectEvent',
    SET_EVENTS_BY_SPORT: 'events.setEventsBySport',
};

export const selectEvent = selectedEvent => ({
    type: EVENTS_ACTIONS.SELECT_EVENT,
    selectedEvent
});

export const getEventOutcomeById = (sportId, eventId) => async dispatch => {
    try {
        const response = await DataApi.getEventOutcomeById(sportId, eventId);
        const body = response.body;

        if (response.status === 200) {
            dispatch({
                type: EVENTS_ACTIONS.SELECT_EVENT,
                data: body,
            })

        } else {
            dispatch({
                type: COMMON_ACTIONS.SET_ERRORS,
                errors: body.errors,
            });
        }
    } catch (errors) {
        dispatch({
            type: COMMON_ACTIONS.SET_ERRORS,
            errors,
        });
    }
};
