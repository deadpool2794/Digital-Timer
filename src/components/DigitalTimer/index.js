// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    isPaused: true,
    seconds: '00',
    intervalId: '',
  }

  toggleIsPaused = async () => {
    const {isPaused} = this.state
    await this.setState({isPaused: !isPaused})
    if (isPaused === true) {
      this.startTimer()
    } else {
      this.stopTimer()
    }
  }

  startTimer = () => {
    this.setState({
      intervalId: setInterval(() => {
        const {minutes, seconds} = this.state
        if (parseInt(minutes) === 0 && parseInt(seconds) === 0) {
          this.resetTimer()
        } else if (parseInt(seconds) === 0) {
          this.setState({
            minutes: minutes - 1 > 9 ? minutes - 1 : `0${minutes - 1}`,
            seconds: 59,
          })
        } else {
          this.setState({
            seconds: seconds - 1 > 9 ? seconds - 1 : `0${seconds - 1}`,
          })
        }
      }, 1000),
    })
  }

  stopTimer = () => {
    const {intervalId} = this.state
    clearInterval(intervalId)
  }

  incrementTimer = () => {
    const {minutes, isPaused} = this.state
    if (isPaused) {
      this.setState({
        minutes:
          parseInt(minutes) + 1 > 9
            ? parseInt(minutes) + 1
            : `0${parseInt(minutes) + 1}`,
      })
    }
  }

  decrementTimer = () => {
    const {minutes, isPaused} = this.state
    if (minutes > 1) {
      if (isPaused) {
        this.setState({
          minutes: minutes - 1 > 9 ? minutes - 1 : `0${minutes - 1}`,
        })
      }
    }
  }

  resetTimer = async () => {
    await this.setState({minutes: 25, isPaused: true, seconds: '00'})
    this.stopTimer()
  }

  render() {
    const {minutes, isPaused, seconds} = this.state

    const pauseButton = (
      <button className="button" type="button" onClick={this.toggleIsPaused}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
          alt="pause icon"
          className="icon"
        />
        <p className="text">Pause</p>
      </button>
    )

    const startButton = (
      <button className="button" type="button" onClick={this.toggleIsPaused}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
          alt="play icon"
          className="icon"
        />
        <p className="text">Start</p>
      </button>
    )

    const resetButton = (
      <button className="button" type="button" onClick={this.resetTimer}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          alt="reset icon"
          className="icon"
        />
        <p className="text">Reset</p>
      </button>
    )

    const timer = (
      <div className="timer-container">
        <h1 className="timer-count">
          {minutes}:{seconds}
        </h1>
        <p className="m-0 text ">{isPaused ? 'Paused' : 'Running'}</p>
      </div>
    )

    const timerLimitContainer = (
      <div className="timer-limit-increment-decrement-container">
        <p className="ano-text">Set Timer Limit</p>
        <div className="increment-decrement-container">
          <button
            className="button"
            type="button"
            onClick={this.decrementTimer}
          >
            <p className="text increase">-</p>
          </button>
          <p className="time-limit">{minutes}</p>
          <button
            className="button"
            type="button"
            onClick={this.incrementTimer}
          >
            <p className="text increase">+</p>
          </button>
        </div>
      </div>
    )

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="actual-container">
          <div className="timer">{timer}</div>
          <div className="timer-details">
            <div className="flex-row">
              {isPaused ? startButton : pauseButton}
              {resetButton}
            </div>
            {timerLimitContainer}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
