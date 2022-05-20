import React, { Component } from "react";
import { connect } from "react-redux";
import { createDoctor } from "../../actions/doctors";
class AddDoctor extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.saveDoctor = this.saveDoctor.bind(this);
    this.newDoctor = this.newDoctor.bind(this);
    this.state = {
      id: null,
      name: "",
      phoneNumber: "",
      submitted: false,
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }
  saveDoctor() {
    const { name, phoneNumber } = this.state;
    this.props
      .createDoctor(name, phoneNumber)
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,
          phoneNumber: data.phoneNumber,
          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  newDoctor() {
    this.setState({
      id: null,
      name: "",
      phoneNumber: "",
      submitted: false,
    });
  }
  render() {
    return (
        <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newDoctor}>
              Add New
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                required
                value={this.state.phoneNumber}
                onChange={this.onChangePhoneNumber}
                name="phoneNumber"
              />
            </div>
            <button onClick={this.saveDoctor} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default connect(null, { createDoctor })(AddDoctor);
