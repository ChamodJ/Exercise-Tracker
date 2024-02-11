import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";

const EditExercises = () => {

  const { id } = useParams();
  const navigate = useNavigate()

  const [state, setState] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });

  const [users, SetUsers] = useState({
    users: [] 
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const response = await axios.get('http://localhost:5000/users');
        SetUsers({
          ...users,
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
          date : exercise.data.date.substring(0 , 10)
          
        }))
        console.log(exercise.data)
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

    axios.post(`http://localhost:5000/exercises/update/${id}`, exercise)
          .then(res => {
            console.log(res.data)
            window.alert("Exercise Updated successfully!")
            navigate("/")
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
            {users.users.map(function (user) {
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
            value={state.date}
            onChange={(e) => onChangeDate(new Date(e.target.value))}
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-[10px] py-[5px] rounded">Update Exercise Log</button>
      </form>
    </div>
  );
};

export default EditExercises;
