import DataApi from '../services/api/data';

export const DATA_ACTIONS = {
    GET_DATA: 'basic.getData',
    SET_DATA: 'basic.setData',
    SET_SPORT: 'basic.setSport',
    SET_SPORT_DATA: 'basic.setSportData',
    LOADING: 'basic.loading',
    SET_ERRORS: 'basic.setErrors',
};


export const setSport = selectedSport => ({
    type: DATA_ACTIONS.SET_SPORT,
    selectedSport
});

export const loadData = () => async dispatch => {
    dispatch({
        type: DATA_ACTIONS.LOADING,
        loading: true,
    });
    try {
        const response = await DataApi.getSports();
        const body = response.body;

        if (response.status === 200) {
            dispatch({
                type: DATA_ACTIONS.SET_DATA,
                data: body,
            })

        } else {
            dispatch({
                type: DATA_ACTIONS.SET_ERRORS,
                errors: body.errors,
            });
            dispatch({
                type: DATA_ACTIONS.LOADING,
                loading: false,
            });
        }
    } catch (errors) {
        dispatch({
            type: DATA_ACTIONS.SET_ERRORS,
            errors,
        });
        dispatch({
            type: DATA_ACTIONS.LOADING,
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
                type: DATA_ACTIONS.SET_SPORT_DATA,
                data: body,
            })

        } else {
            dispatch({
                type: DATA_ACTIONS.SET_ERRORS,
                errors: body.errors,
            });
        }
    } catch (errors) {
        dispatch({
            type: DATA_ACTIONS.SET_ERRORS,
            errors,
        });
    }
};
