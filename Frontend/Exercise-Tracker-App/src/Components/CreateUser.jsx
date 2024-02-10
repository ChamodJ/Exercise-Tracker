import { useState } from "react"
import axios from "axios"

const CreateUser = () => {

  const [state, setState] = useState({
    username: ""
  })

  const onChangeUsername = (e) => {
    setState({
      ...state,
      username: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const user = {
      username: state.username
    }

    console.log(user)

    axios.post('http://localhost:5000/users/add', user)
  .then(res => {
    console.log(res.data);
    window.alert("User Added!");
  })
  .catch(error => {
    console.error("Error adding user:", error);
    window.alert("Error adding user. Please check the console for details.");
  });

    setState({
      ...state,
      username : ''
    })
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-[15px]">New User</h3>

    <form onSubmit={onSubmit}>
        <div className="flex flex-col mb-[10px]">
          <label className="mb-[5px] font-semibold">Username: </label>
          <input
            required
            type="text"
            value={state.username}
            className="border-2"
            onChange={onChangeUsername}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-[10px] py-[5px] rounded">Create User</button>
      </form>
    </div>
  )
}

export default CreateUser