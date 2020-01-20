/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { loadData } from '../actions/data'


/**
 * Home page component
 * @returns {React.Component}
 */
function HomePage() {
    const dispatch = useDispatch();

    const [data, setData] = useState();

    useEffect(() => {
        if (!data) {
            dispatch(loadData());
        }
    }, []);


    return (
        <div className="wrapper page">
            <div>
                {data}
            </div>
        </div>
    );
}

export default HomePage;
