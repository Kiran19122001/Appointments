import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {
    inputTitle: '',
    inputDate: '',
    appointmentsList: [],
    isActive: false,
    errMsg: '',
  }

  handleTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  handleDate = event => {
    this.setState({inputDate: event.target.value})
  }

  addButton = () => {
    const {inputTitle, inputDate} = this.state
    this.setState({errMsg: ''})
    const newAppo = {
      id: v4(),
      inputTitle,
      inputDate,
      isActive: false,
    }
    this.setState(prev => ({
      appointmentsList: [...prev.appointmentsList, newAppo],
    }))
    this.setState({inputTitle: '', inputDate: ''})
    if (inputTitle === '' && inputDate === '') {
      this.setState({errMsg: '*Please add some appointments'})
    }
  }

  updateStar = id => {
    this.setState(prev => ({
      appointmentsList: prev.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isActive: !each.isActive}
        }
        return each
      }),
    }))
  }

  onlyStarred = () => {
    const {appointmentsList} = this.state
    const result = appointmentsList.filter(each => each.isActive === true)
    this.setState({appointmentsList: result})
  }

  render() {
    const {
      inputTitle,
      inputDate,
      appointmentsList,

      errMsg,
    } = this.state

    return (
      <div className="main-container">
        <div className="card-containr">
          <h1 className="head">Add Appointments</h1>
          <form className="form-container">
            <label htmlFor="textInput" className="labels-input">
              TITLE
            </label>
            <input
              type="text"
              id="textInput"
              placeholder="Title"
              value={inputTitle}
              className="input-title"
              onChange={this.handleTitle}
            />
            <label htmlFor="dateInput" className="labels-input">
              DATE
            </label>
            <input
              type="date"
              id="dateInput"
              value={inputDate}
              className="input-date"
              onChange={this.handleDate}
            />
            <button
              type="button"
              className="add-button"
              onClick={this.addButton}
            >
              Add
            </button>
            <p className="error">{errMsg}</p>
          </form>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image-app"
            />
          </div>
          <div className="line" />
          <div className="below-line">
            <main>Appointments</main>

            <button
              type="button"
              className="starred-button"
              onClick={this.onlyStarred}
            >
              Starred
            </button>
          </div>

          <ul className="list-items">
            {appointmentsList.map(eachAppo => (
              <AppointmentItem
                Appointments={eachAppo}
                updateStar={this.updateStar}
                key={eachAppo.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
