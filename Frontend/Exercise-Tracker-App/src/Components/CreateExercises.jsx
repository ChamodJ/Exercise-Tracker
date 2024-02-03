import { useState, useRef } from "react";

const CreateExercises = () => {
  const [state, setState] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    user: ["User1", "User2", "User3"] // Sample user data, replace it with your actual data
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

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date
    };

    console.log(exercise);
    // Add logic to handle form submission, e.g., send data to backend
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username: </label>
          <select
            ref={userInputRef}
            required
            className=""
            value={state.username}
            onChange={onChangeUsername}
          >
            {state.user.map(function (user) {
              return <option key={user} value={user}>{user}</option>;
            })}
          </select>
        </div>

        <div>
          <label>Description: </label>
          <input
            type="text"
            value={state.description}
            onChange={onChangeDescription}
          />
        </div>

        <div>
          <label>Duration (in minutes): </label>
          <input
            type="number"
            value={state.duration}
            onChange={onChangeDuration}
          />
        </div>

        <div>
          <label>Date: </label>
          <input
            type="date"
            value={state.date}
            onChange={(e) => onChangeDate(new Date(e.target.value))}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateExercises;
