import {Component} from 'react'

import './index.css'

class AppointmentItem extends Component {
  render() {
    const {Appointments, updateStar} = this.props
    const {inputTitle, inputDate, id, isActive} = Appointments
    const result = inputTitle === '' && inputDate === ''

    const date = new Date(inputDate)
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    }
    const formattedDate = date.toLocaleString('en-US', options)

    const starImgUrl = isActive
      ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    const clickedOnStar = () => {
      updateStar(id)
    }

    return (
      <li className="lists">
        {result ? (
          ''
        ) : (
          <div className="list-details">
            <p className="task">{inputTitle}</p>
            <p className="date">{formattedDate}</p>
            <button
              type="button"
              data-testid="star"
              onClick={clickedOnStar}
              className="star-button"
            >
              <img src={starImgUrl} alt="star" />
            </button>
          </div>
        )}
      </li>
    )
  }
}

export default AppointmentItem
