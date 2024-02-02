import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"

import {Navbar, ExercisesList, EditExercises, CreateExercises, CreateUser} from './components'

const App = () => {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path='/' exact Component={ExercisesList} />
      <Route path='/edit/:id' exact Component={EditExercises} />
      <Route path='/create' exact Component={CreateExercises} />
      <Route path='/user' exact Component={CreateUser} />
    </Router>    
  );
}

export default App
 