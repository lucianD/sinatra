import { createReducer } from './utils';
import { DATA_ACTIONS } from '../actions/data';


const loadingAction = (state, action) => ({
    ...state,
    loading: true,
});
const getDataAction = (state, action) => ({
    ...state,
});
const setDataAction = (state, action) => ({
    ...state,
    sports: action.data,
    loading: false,
});
const setSportAction = (state, action) => ({
    ...state,
    selectedSport: action.selectedSport,
});
const setSportDataAction = (state, action) => ({
    ...state,
    selectedSportData: action.data,
});


export default createReducer(
    {
        sports: null,
        selectedSport: null,
    },
    {
        [DATA_ACTIONS.GET_DATA]: getDataAction,
        [DATA_ACTIONS.SET_DATA]: setDataAction,
        [DATA_ACTIONS.LOADING]: loadingAction,
        [DATA_ACTIONS.SET_SPORT]: setSportAction,
        [DATA_ACTIONS.SET_SPORT_DATA]: setSportDataAction,
    }
);
