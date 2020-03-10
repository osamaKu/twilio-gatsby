import React, { useState } from "react"
import axios from "axios"

const StartForm = ({ storeToken }) => {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")

  const handleSubmit = async event => {
    event.preventDefault()

    const result = await axios({
      method: "POST",
      url: "https://saffron-chimpanzee-5102.twil.io/create-token",
      data: {
        identity: name,
      },
    })

    const jwt = result.data
    // TODO:: Add Error Handler

    storeToken(jwt)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        display name
        <br />
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>

      <br />
      <label htmlFor="room">
        room to join
        <br />
        <input
          type="text"
          name="room"
          id="room"
          value={room}
          onChange={e => setRoom(e.target.value)}
        />
      </label>

      <br />
      <button type="submit">join lesson</button>
    </form>
  )
}

export default StartForm
