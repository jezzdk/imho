import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from './reducers'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

const loggerMiddleware = createLogger()

const store = createStore(rootReducer, {}, compose(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'))
registerServiceWorker()
