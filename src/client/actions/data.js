import DataApi from '../services/api/data';

export const DATA_ACTIONS = {
    GET_DATA: 'basic.getData',
    SET_DATA: 'basic.setData',
    LOADING: 'basic.loading',
    SET_ERRORS: 'basic.setErrors',
};


export const loadData = () => async dispatch => {
    dispatch({
        type: DATA_ACTIONS.LOADING,
        loading: true,
    });
    try {
        const response = await DataApi.getData();
        const body = response.body;
        // console.log(body);

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
