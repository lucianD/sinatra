/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { loadData } from '../../actions/data'
import Button from "../../components/button";


/**
 * Home page component
 * @returns {React.Component}
 */
function HomePage() {
    const dispatch = useDispatch();
    const json = useSelector(state => state.data);
    console.log(json);
    const [data, setData] = useState();

    useEffect(() => {
        // if (!data) {
        //     dispatch(loadData());
        // }
    }, []);


    return (
        <div className="wrapper page">
            <div>
                <Button label="Click Here ..." onClick={() => dispatch(loadData())}></Button>
                <Button label="Click Here ..." onClick={() => setData(!data)}></Button>
                { data && json.data &&
                <span> { json.data[0].desc } </span>
                }
            </div>
        </div>
    );
}

export default HomePage;
