import { createReducer } from './utils';
import { SPORTS_ACTIONS } from '../actions/sports';


const loadingAction = (state, action) => ({
    ...state,
    loading: true,
});
const setDataAction = (state, action) => ({
    ...state,
    list: action.data,
    loading: false,
});
const setSportAction = (state, action) => ({
    ...state,
    selectedSport: action.selectedSport,
});

export default createReducer(
    {
        list: null,
        selectedSport: {},
    },
    {
        [SPORTS_ACTIONS.SET_DATA]: setDataAction,
        [SPORTS_ACTIONS.LOADING]: loadingAction,
        [SPORTS_ACTIONS.SET_SPORT]: setSportAction,
    }
);
