/* eslint-disable max-lines-per-function */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import './index.scss'
import {loadSportById} from "../../actions/sports";
import Table from "../../components/table";
import {getEventOutcomeById, selectEvent} from "../../actions/events";

/**
 * Home page component
 * @returns {React.Component}
 */
function EventsPage( {history}) {
    const dispatch = useDispatch();
    const selectedSport = useSelector(state => state.sports.selectedSport);
    const selectedEvents = useSelector(state => state.events.list);

    useEffect(() => {
        if (!selectedSport.id) {
            history.push('/');
        } else {
            dispatch(loadSportById(selectedSport.id))
        }
    }, []);

    const renderEventsTable = () => {
        return <div className='homepage__table-container'>
            <span className='homepage__table-container__title'>Listing all the events for {selectedSport.desc} </span>
            <Table
                className='homepage__table-container__content'
                columns={['pos', 'desc', 'comp_desc']}
                data={selectedEvents}
                onClickHandler={selectedEvent => {
                    dispatch(getEventOutcomeById(selectedSport.id, selectedEvent.id));
                    // history.push('/view-sport');
                }}
            />
        </div>;
    };

    return (
        <div className='sport-page'>
            <div>These are {selectedSport.desc} matches </div>
            {selectedEvents && renderEventsTable()}
        </div>
    );
}

export default withRouter(EventsPage);
