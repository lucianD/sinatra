import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './pages/home';
import SportPage from './pages/events';

/**
 * Router component
 * @returns {React.Component}
 */
function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/view-sport" exact component={SportPage}/>

                {/*<Route path="/*" exact component={NotFound} />*/}
            </Switch>
        </Router>
    );
}

export default Routes;
