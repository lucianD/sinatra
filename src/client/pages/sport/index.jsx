/* eslint-disable max-lines-per-function */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import './index.scss'

/**
 * Home page component
 * @returns {React.Component}
 */
function SportPage( {history}) {
    const dispatch = useDispatch();
    const selectedSport = useSelector(state => state.data.selectedSport);

    useEffect(() => {
        if (!selectedSport) {
            history.push('/');
        }
    }, []);

    return (
        <div className='sport-page'>
            This is sport having id: {selectedSport}
        </div>
    );
}

export default withRouter(SportPage);
