import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"

import Navbar from './components/index.js'
import ExercisesList from './components/index.js'
import EditExercises from './components/index.js'
import CreateExercises from './components/index.js'
import CreateUser from './components/index.js'

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
 