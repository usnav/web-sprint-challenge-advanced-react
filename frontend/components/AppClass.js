import React from 'react'; 
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}
       




export default class AppClass extends React.Component {

  state = {
    message: '', 
    email: '',
    index: 4, 
    steps: 0,
    coordinatesgrid: [
      {coorX:1, coorY:1}, {coorX:2, coorY:1}, {coorX:3, coorY:1},
      {coorX:1, coorY:2}, {coorX:2, coorY:2}, {coorX:3, coorY:2},
      {coorX:1, coorY:3}, {coorX:2, coorY:3}, {coorX:3, coorY:3},
]
  }

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    
  
  } 


  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
   
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({message: '', 
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

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }
  
  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  clickUp = () => {
    if (this.state.index === 0 || this.state.index === 1 || this.state.index === 2 ) {
      this.setState({
        ...this.state, 
        message: "You can't go up"
      })
    }
    else {
      this.setState({
        ...this.state, 
        index: this.state.index - 3, 
        steps: this.state.steps + 1
      })
    }
  }

  clickDown = () => {
    if (this.state.index === 6 || this.state.index === 7 || this.state.index === 8) {
      this.setState({
        ...this.state, 
        message: "You can't go down"
      })
    }
    else {
      this.setState({
        ...this.state, 
        index: this.state.index + 3,
        steps: this.state.steps + 1
      })
    }
  }

  clickRight = () => {
    if (this.state.index === 2 || this.state.index === 5 || this.state.index === 8) {
      this.setState({
        ...this.state, 
        message: "You can't go right"
      })
    }
    else {
      this.setState({
        ...this.state, 
        index: this.state.index + 1,
        steps: this.state.steps + 1
      })
    }
  }

  clickLeft = () => {
    if (this.state.index === 0 || this.state.index === 3 || this.state.index === 6) {
      this.setState({
        ...this.state,
        message: "You can't go left"
      })
    }
    else {
      this.setState({
        ...this.state, 
        index: this.state.index - 1,
        steps: this.state.steps + 1
      })
    }
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    const email = evt.target.value;
    this.setState({
      ...this.state, 
      email: email
    })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const newPost = { x: this.state.coordinatesgrid[this.state.index].coorX, y: this.state.coordinatesgrid[this.state.index].coorY, steps: this.state.steps, email: this.state.email }

      axios.post('http://localhost:9000/api/result', newPost)
      .then(res => {
        this.setState({
          ...this.state, 
          email: "",
          message: `${res.data.message}`, 
        })
      })

      .catch(error => {
        this.setState({
          ...this.state, 
          message: `${error.message}`,
          message: `${error.response.data.message}`
        })
      })
  }

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.coordinatesgrid[this.state.index].coorX}, ${this.state.coordinatesgrid[this.state.index].coorY})`}</h3>
          <h3 id="steps">{`You moved ${this.state.steps} ${this.state.steps === 1 ? 'time' : 'times'}`}</h3>
        </div>
        <div id="grid">
          {
            this.state.coordinatesgrid.map(idx => (
              <div key={idx} className={`square ${this.state.coordinatesgrid[this.state.index] === idx ? ' active' : ''}`}>
                {idx === this.state.coordinatesgrid[this.state.index] ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
        <button onClick={this.clickLeft} id="left">LEFT</button>

        <button onClick={this.clickUp} id="up">UP</button>

        <button onClick={this.clickRight} id="right">RIGHT</button>

        <button onClick={this.clickDown}id="down">DOWN</button>

        <button onClick={this.reset} id="reset">reset</button>

        </div>
        <form>
        <input  id="email" type="email" placeholder="type email" value={this.state.email} onChange={this.onChange}></input>

        <input id="submit" type="submit" onClick={this.onSubmit}></input>

        </form>
      </div>
    )
  }
}
