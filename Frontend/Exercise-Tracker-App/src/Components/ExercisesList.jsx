import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ExercisesList = () => {

  const [state, setState] = useState([{
    _id: "",
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  }])

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exercises')
        setState(response.data)
      } catch(error) {
        console.error('Error fetching exercises: ' + error)
      }
    }

    fetchExercises()
  }, [])

  const deleteExercise = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/exercises/${id}`)
      setState(state.filter(exercise => exercise._id !== id));
      console.log('Exercise deleted successfully')
    } catch (error) {
      console.error('Error deleting exercise: ' + error)
    }
  }


  return (
    <div>
      <h3 className="text-xl font-bold mb-[15px]">Exercise Log</h3>

      <table className="min-w-full text-left text-sm whitespace-nowrap">

        <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600 text-center">
          <tr>
            <th scope="col" className="px-6 py-4"> Exercise ID </th>
            <th scope="col" className="px-6 py-4"> Username </th>
            <th scope="col" className="px-6 py-4"> Description </th>
            <th scope="col" className="px-6 py-4"> Duration </th>
            <th scope="col" className="px-6 py-4"> Date </th>
            <th scope="col" className="px-6 py-4"> Action </th>
          </tr>
        </thead>

        <tbody className="text-center">

          {state.length === 0 ? (
            <tr className="border-b dark:border-neutral-600">
              <th scope="row" className="px-6 py-4"> No Exercise Found</th>
            </tr>
          ) : (
            state.map((exercise) => {

            return(
              <tr key={exercise._id} className="border-b dark:border-neutral-600">
                <th scope="row" className="px-6 py-4">
                  {exercise._id}
                </th>
                <td className="px-6 py-4">{exercise.username}</td>
                <td className="px-6 py-4">{exercise.description}</td>
                <td className="px-6 py-4">{exercise.duration}</td>
                <td className="px-6 py-4">{new Date(exercise.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  
                
                <Link to={`/edit/${exercise._id}`} id={ exercise._id } className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-800 focus:outline-none">Update</Link>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-red-600 active:bg-red-700 focus:outline-none ml-[5px]" onClick={() => deleteExercise(exercise._id)}
                >
                  Delete
                </button>

                </td>
              </tr>
            )
            })      
          )}
        </tbody>

      </table>
    </div>
  )
}

export default ExercisesList