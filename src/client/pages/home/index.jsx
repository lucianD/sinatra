/* eslint-disable max-lines-per-function */
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {loadAllSports, setSport} from '../../actions/sports'
import Button from "../../components/button";
import Table from "../../components/table";
import './index.scss'

/**
 * Home page component
 * @returns {React.Component}
 */
function HomePage( {history}) {
    const dispatch = useDispatch();
    const sports = useSelector(state => state.sports.list);
    const [isSportsVisible, setSportsVisibility] = useState(true);

    const renderShowHideButton = () => {
        return <div className='homepage__button-container'>
            <Button
                className='homepage__button-container__button btn-secondary'
                label={`${isSportsVisible ? 'Hide' : 'Show'} Sports Section`}
                onClick={() => setSportsVisibility(!isSportsVisible)}/>
        </div>;
    };

    const renderLoadAllSportsButton = () => {
        return <div className='homepage__button-container'>
                <Button
                    className='homepage__button-container__button'
                    label="Load All Sports"
                    onClick={() => dispatch(loadAllSports())}/>
            </div>
    };

    const renderSportsTable = () => {
        return <div className='homepage__table-container'>
            <span className='homepage__table-container__title'>Listing all the sports below</span>
            <Table
                className='homepage__table-container__content'
                columns={['pos', 'desc']}
                data={sports}
                onClickHandler={selectedSport => {
                    dispatch(setSport(selectedSport));
                    history.push('/view-sport');
                }}
            />
        </div>;
    };

    return (
        <div className='homepage'>
            {renderLoadAllSportsButton()}

            {sports && renderShowHideButton()}

            {isSportsVisible && sports && (
                renderSportsTable()
            )

            }
        </div>
    );
}

export default withRouter(HomePage);
