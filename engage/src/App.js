import React, { useState } from 'react';
import QuestionOrder from './components/questions'
import classes from './App.module.css';

function App() {
 const [showLabel,setShowLabel]= useState(false);
 const users=JSON.stringify({
   UIdeveloper:'akhilesh',
   BackendDev:'Rajiv'
 });
  return (
    <div className={classes.AppEngage}>
     <h2> This is parent app</h2>
     <button className="btnPrimary" onClick={()=>setShowLabel(!showLabel)}>Show Label in Child Component</button>
      <microfrontends-risk showlabel={showLabel} users={users}></microfrontends-risk>
      <h2>Showing the new order of questions in main App</h2>
      <QuestionOrder/>
    </div>
  );
}

export default App;
