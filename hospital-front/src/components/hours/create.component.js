import React, { Component } from "react";
import { connect } from "react-redux";
import { createHour } from "../../actions/hours";
class AddHour extends Component {
  constructor(props) {
    super(props);
    this.onChangeDay = this.onChangeDay.bind(this);
    this.onChangeStartHour = this.onChangeStartHour.bind(this);
    this.onChangeEndHour = this.onChangeEndHour.bind(this);
    this.saveHour = this.saveHour.bind(this);
    this.newHour = this.newHour.bind(this);
    this.state = {
      id: null,
      day: "",
      startHour: "",
      endHour: "",
      submitted: false,
    };
  }
  onChangeDay(e) {
    this.setState({
      day: e.target.value,
    });
  }
  onChangeStartHour(e) {
    this.setState({
      startHour: e.target.value,
    });
  }
  onChangeEndHour(e) {
    this.setState({
      endHour: e.target.value,
    });
  }
  saveHour() {
    const { day, startHour, endHour } = this.state;
    this.props
      .createHour(day, startHour, endHour)
      .then((data) => {
        this.setState({
          id: data.id,
          day: data.title,
          startHour: data.startHour,
          endHour: data.endHour,
          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  newHour() {
    this.setState({
      id: null,
      day: "",
      startHour: "",
      endHour: "",
      submitted: false,
    });
  }
  render() {
    return (
        <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newHour}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Day</label>
              <input
                type="text"
                className="form-control"
                id="day"
                required
                value={this.state.day}
                onChange={this.onChangeDay}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Start at</label>
              <input
                type="text"
                className="form-control"
                id="startHour"
                required
                value={this.state.startHour}
                onChange={this.onChangeStartHour}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">End at</label>
              <input
                type="text"
                className="form-control"
                id="endHour"
                required
                value={this.state.endHour}
                onChange={this.onChangeEndHour}
                name="description"
              />
            </div>
            <button onClick={this.saveHour} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default connect(null, { createHour })(AddHour);
