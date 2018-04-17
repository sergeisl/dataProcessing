import {combineReducers} from "redux"
import {routerReducer} from "react-router-redux"

import incrementC from "./increment-c"

export default combineReducers({
    incrementC,
    routing: routerReducer
})
