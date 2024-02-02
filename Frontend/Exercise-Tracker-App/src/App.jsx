import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import { Navbar, ExercisesList, EditExercises, CreateExercises, CreateUser } from './Components/components'

const App = () => {
  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route path='/'  element={<ExercisesList />} />
        <Route path='/edit/:id'  element={<EditExercises />} />
        <Route path='/create'  element={<CreateExercises />} />
        <Route path='/user'  element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App
 