import React from 'react';
import Questions from './components/questions'
import classes from './App.module.css';
import {createStore} from 'redux'
function App(props) {
  console.log(props);
  console.log(props.users.UIdeveloper);
  console.log(props.users.BackendDev);
  return (
    <div className={classes.App}>
     <h1>Hi this is Risk management App</h1>
      {props.showlabel ? <p>Got displayed using props from parent App</p>:null}
     <Questions/>
    </div>
  );
}

export default App;
