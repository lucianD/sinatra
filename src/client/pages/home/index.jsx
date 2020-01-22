/* eslint-disable max-lines-per-function */
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import { Redirect } from 'react-router-dom';
import {loadData} from '../../actions/data'
import Button from "../../components/button";
import Table from "../../components/table";
import './index.scss'

/**
 * Home page component
 * @returns {React.Component}
 */
function HomePage() {
    const dispatch = useDispatch();
    const json = useSelector(state => state.data);
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
                    onClick={() => dispatch(loadData())}/>
            </div>
    };

    const renderSportsTable = () => {
        return <div className='homepage__table-container'>
            <span className='homepage__table-container__title'>Listing all the sports below</span>
            <Table className='homepage__table-container__content' columns={['id', 'desc']} data={json.data}></Table>
        </div>;
    };

    return (
        <div className='homepage'>
            {renderLoadAllSportsButton()}

            {json.data && renderShowHideButton()}

            {isSportsVisible && json.data && (
                renderSportsTable()
            )

            }
        </div>
    );
}

export default HomePage;
