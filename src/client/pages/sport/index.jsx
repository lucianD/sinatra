/* eslint-disable max-lines-per-function */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import './index.scss'
import {loadSportById, setSport} from "../../actions/data";
import Table from "../../components/table";

/**
 * Home page component
 * @returns {React.Component}
 */
function SportPage( {history}) {
    const dispatch = useDispatch();
    const selectedSport = useSelector(state => state.data.selectedSport);
    const selectedSportData = useSelector(state => state.data.selectedSportData);

    useEffect(() => {
        if (!selectedSport) {
            history.push('/');
        }
        dispatch(loadSportById(selectedSport))
    }, []);

    const renderSportsTable = () => {
        return <div className='homepage__table-container'>
            <span className='homepage__table-container__title'>Listing all the sports below</span>
            <Table
                className='homepage__table-container__content'
                columns={['id', 'desc', 'comp_desc']}
                data={selectedSportData}
                onClickHandler={selectedSport => {
                    dispatch(setSport(selectedSport));
                    history.push('/view-sport');
                }}
            />
        </div>;
    };

    return (
        <div className='sport-page'>
            This is sport having id: {selectedSport}
            {selectedSportData && renderSportsTable()}
        </div>
    );
}

export default withRouter(SportPage);
