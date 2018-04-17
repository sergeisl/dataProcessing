import React from "react"
import PropTypes from "prop-types"
import {Router, Route, IndexRoute} from "react-router"
import {syncHistoryWithStore} from "react-router-redux"

import Layout from "./containers/layout"
import IndexPage from "./containers/index-page"
import Home from "./containers/Home"

export default function routes(props = {}) {
  let {history} = props
  const {store} = props

  if (store) {
    history = syncHistoryWithStore(history, store)
  }

  return (
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage}/>
            <Route path="home" component={Home}/>
        </Route>
    </Router>
  )
}

routes.defaultProps = {
  store: null
}
routes.propTypes = {
  store: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired
}
