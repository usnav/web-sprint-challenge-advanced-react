import React, { useState } from 'react';
import axios from 'axios';




// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {

  
  const [state, setState] = useState({

    message: '', 
    email: '',
    index: 4, 
    steps: 0,
    coordinatesgrid: [
          {coorX:1, coorY:1}, {coorX:2, coorY:1}, {coorX:3, coorY:1},
          {coorX:1, coorY:2}, {coorX:2, coorY:2}, {coorX:3, coorY:2},
          {coorX:1, coorY:3}, {coorX:2, coorY:3}, {coorX:3, coorY:3},
    ]

  })

  function reset() {
    setState({
    message: '', 
    email: '',
    index: 4, 
    steps: 0,
    coordinatesgrid: [   
      {coorX:1, coorY:1}, {coorX:2, coorY:1}, {coorX:3, coorY:1},
      {coorX:1, coorY:2}, {coorX:2, coorY:2}, {coorX:3, coorY:2},
      {coorX:1, coorY:3}, {coorX:2, coorY:3}, {coorX:3, coorY:3},
    ]

    })
  }

  const clickUp = () => {
    if (state.index === 0 || state.index === 1 || state.index === 2 ) {
      setState({
        ...state, 
        message: "You can't go up"
      })
    }
    else {
      setState({
        ...state, 
        index: state.index - 3, 
        steps: state.steps + 1
      })
    }
  }

  const clickDown = () => {
    if (state.index === 6 || state.index === 7 || state.index === 8) {
      setState({
        ...state, 
        message: "You can't go down"
      })
    }
    else {
      setState({
        ...state, 
        index: state.index + 3,
        steps: state.steps + 1
      })
    }
  }

  const clickRight = () => {
    if (state.index === 2 || state.index === 5 || state.index === 8) {
      setState({
        ...state, 
        message: "You can't go right"
      })
    }
    else {
      setState({
        ...state, 
        index: state.index + 1,
        steps: state.steps + 1
      })
    }
  }

  const clickLeft = () => {
    if (state.index === 0 || state.index === 3 || state.index === 6) {
      setState({
        ...state,
        message: "You can't go left"
      })
    }
    else {
      setState({
        ...state, 
        index: state.index - 1,
        steps: state.steps + 1
      })
    }
  }

  function onChange(evt) {
    const email = evt.target.value;
    setState({
      ...state, 
      email: email
    })
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const newPost = { x: state.coordinatesgrid[state.index].coorX, y: state.coordinatesgrid[state.index].coorY, steps: state.steps, email: state.email }

      axios.post('http://localhost:9000/api/result', newPost)
      .then(res => {
        setState({
          ...state, 
          email: "",
          message: `${res.data.message}`, 
        })
      })

      .catch(error => {
        setState({
          ...state, 
          message: `${error.message}`,
          message: `${error.response.data.message}`
        })
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates (${state.coordinatesgrid[state.index].coorX}, ${state.coordinatesgrid[state.index].coorY})`}</h3>
        <h3 id="steps">{`You moved ${state.steps} ${state.steps === 1 ? 'time' : 'times'}`}</h3>
      </div>
      <div id="grid">
        {
          state.coordinatesgrid.map((idx) => (
            <div key={idx.id} className={`square ${state.coordinatesgrid[state.index] === idx ? ' active' : ''}`}>
              { idx === state.coordinatesgrid[state.index] ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button onClick={clickLeft} id="left">LEFT</button>

        <button onClick={clickUp} id="up">UP</button>

        <button onClick={clickRight} id="right">RIGHT</button>

        <button onClick={clickDown}id="down">DOWN</button>

        <button onClick={reset} id="reset">reset</button>

      </div>
      <form>
        <input  id="email" type="email" placeholder="type email"value={state.email} onChange={onChange}></input>
        
        <input id="submit" type="submit" onClick={onSubmit}></input>
      </form>
    </div>
  )
}
