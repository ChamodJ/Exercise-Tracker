import { useState } from "react";

const CreateExercises = () => {
  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    user: []
  })

  const onChangeUsername = (e) => {
    setState({
      ...state,
      username: e.target.value,
    });
  };


  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <from >
        <div>
          <label>Username: </label>
          <select ref="userInput" required className=""
            value={this.state.username}
            onChange={onChangeUsername}>
              {
                this.state.user.map(function(user) {
                  return
                  <option key={user} value={user}>{user}</option>
                })
              }

          </select>
        </div>
      </from>
    </div>
  )
}

export default CreateExercises