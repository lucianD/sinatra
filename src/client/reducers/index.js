import { combineReducers } from 'redux';

import sports from './sports';
import events from './events';

const reducer = combineReducers({
    sports,
    events
});

export default reducer;
