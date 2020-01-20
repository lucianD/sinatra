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
    data: state.data,
    loading: false,
});


export default createReducer(
    {
        entities: {},
    },
    {
        [DATA_ACTIONS.GET_DATA]: getDataAction,
        [DATA_ACTIONS.SET_DATA]: setDataAction,
        [DATA_ACTIONS.LOADING]: loadingAction,
    }
);
