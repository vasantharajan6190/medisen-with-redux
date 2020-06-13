import React from 'react';
import ReactDOM from 'react-dom';
import App,{Contextvariables} from './App';
import {Provider} from "react-redux"
import {createStore,combineReducers} from "redux"
import appointments from "./reducers/appointments"
import clinic from "./reducers/clinic"
import currentuser from "./reducers/currentuser"
import docappointments from "./reducers/docappointments"
import doctors from "./reducers/doctors"
import loggedin from  "./reducers/loggedin"
import patients from "./reducers/patients"
import specialization from "./reducers/specialization"

const rootreducer = combineReducers({
  appointments,
  clinic,
  currentuser,
  docappointments,
  doctors,
  loggedin,
  patients,
  specialization
})

const store  = createStore(rootreducer)

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
