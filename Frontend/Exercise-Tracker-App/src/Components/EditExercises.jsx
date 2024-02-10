import { useState, useEffect } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";

const EditExercises = () => {

  const { id } = useParams();

  const [state, setState] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [] 
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const response = await axios.get('http://localhost:5000/users');
        setState({
          ...state,
          users: response.data.map(user => user.username),
          username: response.data.length > 0 ? response.data[0].username: ""
        })
      } catch (error) {
        console.error('Error Fetching usernames: ' + error)
      }
    }

    fetchUsers();
  }, [])

    const fetchExercises = async (id) => {
      try {
        const exercise = await axios.get(`http://localhost:5000/exercises/${id}`)
        setState((prevState) => ({
          ...prevState,
          ...exercise.data,
        }))
      } catch (error) {
        console.error('Error Fetching Exercise: ' + error)
      }
    }

  useEffect(() => {
    fetchExercises(id)
  }, [])


  const onChangeUsername = (e) => {
    setState({
      ...state,
      username: e.target.value
    });
  };

  const onChangeDescription = (e) => {
    setState({
      ...state,
      description: e.target.value
    });
  };

  const onChangeDuration = (e) => {
    setState({
      ...state,
      duration: e.target.value
    });
  };

  const onChangeDate = (date) => {
    setState({
      ...state,
      date: date
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date
    };

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
          .then(res => {
            console.log(res.data)
            window.alert("Exercise submitted successfully!")
          })

          .catch(error => {
            console.error("Error adding exercise:", error)
            window.alert("Error adding exercise. Please check the console for details.")
          });

    setState({
      ...state,
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      user: [] 
    })

  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-[15px]">Update New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col mb-[10px]">
          <label className="mb-[5px] font-semibold">Username: </label>
          <select
            
            required
            className="border-2"
            value={state.username}
            onChange={onChangeUsername}
          >
            {state.users.map(function (user) {
              return <option key={user} value={user}>{user}</option>;
            })}
          </select>
        </div>

        <div className="flex flex-col mb-[10px]">
          <label className="mb-[5px] font-semibold">Description: </label>
          <input
            type="text"
            required
            value={state.description}
            className="border-2"
            onChange={onChangeDescription}
          />
        </div>

        <div className="flex flex-col mb-[10px]">
          <label className="mb-[5px] font-semibold">Duration (in minutes): </label>
          <input
            type="number"
            required
            value={state.duration}
            className="border-2"
            onChange={onChangeDuration}
          />
        </div>

        <div className="flex flex-col mb-[20px]">
          <label className="mb-[5px] font-semibold">Date: </label>
          <input
            type="date"
            required
            className="border-2"
            onChange={(e) => onChangeDate(new Date(e.target.value))}
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-[10px] py-[5px] rounded">Update Exercise Log</button>
      </form>
    </div>
  );
};

export default EditExercises;
