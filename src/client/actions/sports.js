import DataApi from '../services/api/data';
import {COMMON_ACTIONS} from "./common";
import {EVENTS_ACTIONS} from "./events";

export const SPORTS_ACTIONS = {
    GET_DATA: 'basic.getData',
    SET_DATA: 'basic.setData',
    SET_SPORT: 'basic.setSport',
    SET_SPORT_DATA: 'basic.setSportData',
};


export const setSport = selectedSport => ({
    type: SPORTS_ACTIONS.SET_SPORT,
    selectedSport
});

export const loadAllSports = () => async dispatch => {
    dispatch({
        type: COMMON_ACTIONS.LOADING,
        loading: true,
    });
    try {
        const response = await DataApi.getSports();
        const body = response.body;

        if (response.status === 200) {
            dispatch({
                type: SPORTS_ACTIONS.SET_DATA,
                data: body,
            })

        } else {
            dispatch({
                type: COMMON_ACTIONS.SET_ERRORS,
                errors: body.errors,
            });
            dispatch({
                type: COMMON_ACTIONS.LOADING,
                loading: false,
            });
        }
    } catch (errors) {
        dispatch({
            type: COMMON_ACTIONS.SET_ERRORS,
            errors,
        });
        dispatch({
            type: COMMON_ACTIONS.LOADING,
            loading: false,
        });
    }
};

export const loadSportById = id => async dispatch => {
    try {
        const response = await DataApi.getSportById(id);
        const body = response.body;

        if (response.status === 200) {
            dispatch({
                type: EVENTS_ACTIONS.SET_EVENTS_BY_SPORT,
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
