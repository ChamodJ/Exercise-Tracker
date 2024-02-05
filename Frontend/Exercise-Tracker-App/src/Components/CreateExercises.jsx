import { useState, useRef } from "react";
import axios from "axios"

const CreateExercises = () => {

  const [state, setState] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    user: ["User1", "User2", "User3"] // Sample user data
  });

  const userInputRef = useRef(null);

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

  const onTheSubmit = (e) => {
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
            window.alert("Exercise Added!")
          })

          .catch(error => {
            console.error("Error adding exercise:", error)
            window.alert("Error adding exercise. Please check the console for details.")
          });

    window.alert("Exercise submitted successfully!")

    setState({
      ...state,
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      user: ["User1", "User2", "User3"] 
    })

  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-[15px]">Create New Exercise Log</h3>
      <form onSubmit={onTheSubmit}>
        <div className="flex flex-col mb-[10px]">
          <label className="mb-[5px] font-semibold">Username: </label>
          <select
            ref={userInputRef}
            required
            className="border-2"
            value={state.username}
            onChange={onChangeUsername}
          >
            {state.user.map(function (user) {
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

        <button type="submit" className="bg-blue-600 text-white px-[10px] py-[5px] rounded">Create Exercise Log</button>
      </form>
    </div>
  );
};

export default CreateExercises;
