import React from 'react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthReducer.jsx'
import PostReducer from './PostReducer.jsx'
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  AuthReducer,
  PostReducer,
})

// const store = configureStore({
//   reducer: {
//     reducers,
//   },
// })

// export default store

function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store)
    window.localStorage.setItem('store', serializedStore)
  } catch (e) {
    console.log(e)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem('store')
    if (serializedStore === null) return undefined
    return JSON.parse(serializedStore)
  } catch (e) {
    console.log(e)
    return undefined
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedState = loadFromLocalStorage()

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
)

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
