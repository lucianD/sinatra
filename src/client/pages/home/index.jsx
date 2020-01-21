/* eslint-disable max-lines-per-function */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import { Redirect } from 'react-router-dom';
import {loadData} from '../../actions/data'
import Button from "../../components/button";
import Table from "../../components/table";


/**
 * Home page component
 * @returns {React.Component}
 */
function HomePage() {
    const dispatch = useDispatch();
    const json = useSelector(state => state.data);
    console.log(json);
    const [isSportsVisible, setSportsVisibility] = useState(true);

    useEffect(() => {
        // if (!data) {
        //     dispatch(loadData());
        // }
    }, []);


    return (
        <div className="wrapper page">
            <Button label="Load All Sports ..." onClick={() => dispatch(loadData())}></Button>
            {json.data && <Button
                label={`${isSportsVisible ? 'Hide' : 'Show'} Sports Section ...`}
                onClick={() => setSportsVisibility(!isSportsVisible)}/>
            }
            {isSportsVisible && json.data && (
                <div>
                    <span>Listing all the sports below</span>
                    <Table columns={['id', 'desc']} data={json.data}></Table>
                </div>
            )

            }
        </div>
    );
}

export default HomePage;
