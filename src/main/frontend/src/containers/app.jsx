import React from "react"
import PropTypes from "prop-types"
import {Provider} from "react-redux"
import {AppContainer} from "react-hot-loader"

import Routes from "../routes"

export default function App({store, history}) {
  return (
    <AppContainer>
      <Provider store={store}>
        <Routes store={store} history={history}/>
      </Provider>
    </AppContainer>
  )
}

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
}
