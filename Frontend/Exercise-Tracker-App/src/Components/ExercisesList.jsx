import axios from "axios"
import { useEffect, useState } from "react"

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


  return (
    <div>
      <table className="min-w-full text-left text-sm whitespace-nowrap">

        <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600">
          <tr>
            <th scope="col" className="px-6 py-4"> Exercise ID </th>
            <th scope="col" className="px-6 py-4"> Username </th>
            <th scope="col" className="px-6 py-4"> Description </th>
            <th scope="col" className="px-6 py-4"> Duration </th>
            <th scope="col" className="px-6 py-4"> Date </th>
            <th scope="col" className="px-6 py-4"> Action </th>
          </tr>
        </thead>

        <tbody>

          {state.length === 0 ? (
            <tr className="border-b dark:border-neutral-600">
              <th scope="row" className="px-6 py-4"> No Exercise Found</th>
            </tr>
          ) : (
            state.map((exercise) => (
              <tr className="border-b dark:border-neutral-600">
                <th key={exercise._id} scope="row" className="px-6 py-4">
                  {exercise._id}
                </th>
                <td className="px-6 py-4">{exercise.username}</td>
                <td className="px-6 py-4">{exercise.description}</td>
                <td className="px-6 py-4">{exercise.duration}</td>
                <td className="px-6 py-4">{new Date(exercise.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">In Stock</td>
              </tr>
            ))      
          )}
        </tbody>

      </table>
    </div>
  )
}

export default ExercisesList