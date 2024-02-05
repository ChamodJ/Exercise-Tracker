import { useState } from "react"

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

    window.alert("User Added!")

    setState({
      ...state,
      username : ''
    })
  }

  return (
    <div>
    <form onSubmit={onSubmit}>
        <div className="flex flex-col mb-[10px]">
          <label className="mb-[5px] font-semibold">Description: </label>
          <input
            required
            type="text"
            value={state.username}
            className="border-2"
            onChange={onChangeUsername}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-[10px] py-[5px] rounded">Create Exercise Log</button>
      </form>
    </div>
  )
}

export default CreateUser