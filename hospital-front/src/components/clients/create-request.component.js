import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveDoctors, retrieveAvailableHours, createRequest, findDoctorsByName } from "../../actions/doctors";

class CreateClientRequest extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveDoctor = this.setActiveDoctor.bind(this);
        this.saveRequest = this.saveRequest.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.findByName = this.findByName.bind(this);
        this.state = {
            currentDoctor: null,
            currentIndex: -1,
            searchName: "",
            date: "",
            submitted: false,
            message: "",
        };
    }
    componentDidMount() {
        this.props.retrieveDoctors();
        this.props.retrieveAvailableHours();
    }
    onChangeSearchName(e) {
        const searchName = e.target.value;
        this.setState({
        searchName: searchName,
        });
    }
    onChangeDate(e) {
        const date = e.target.value;
        console.log(date);
        this.setState({
            date: date,
        });
    }
    refreshData() {
        this.setState({
        currentDoctor: null,
        currentIndex: -1,
        });
    }
    setActiveDoctor(doctor, index) {
        this.setState({
            currentDoctor: doctor,
            currentIndex: index,
        });
    }
    saveRequest() {
        const { date, currentDoctor } = this.state;
        if(currentDoctor == null){
            this.setState({
                message: "Please Select the doctor"
            });
            return;
        }
        this.props
            .createRequest(date, currentDoctor.id)
            .then((data) => {
            this.setState({
                id: data.id,
                date: data.date,
                submitted: true,
                message: "New Appointment Request Received!"
            });
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    findByName() {
        this.refreshData();
        this.props.findDoctorsByName(this.state.searchName);
    }
    render() {
        const { currentIndex } = this.state;
        const { doctors, hours } = this.props;
        // console.log(doctors);
        return (
            <div className="list row">
            <div className="col-md-8">
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="text"
                        className="form-control"
                        id="date"
                        required
                        value={this.state.date}
                        onChange={this.onChangeDate}
                        name="date"
                        placeholder="Please Enter the date"
                    />
                </div>
            </div>
            
            <div className="col-md-6">
                <h4>
                    Select a Doctor
                </h4>
                <ul className="list-group">
                {doctors &&
                    doctors.map((doctor, index) => (
                    <li
                        className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveDoctor(doctor, index)}
                        key={index}
                    >
                        {doctor.name}
                    </li>
                    ))}
                </ul>

                <button onClick={this.saveRequest} className="btn btn-success mt-2">
                    Send Request
                </button>
                {this.state.message && (
                    <div className="alert mt-2">
                        {this.state.message}
                    </div>
                )}
            </div>
            <div className="col-md-6">
                <div className="row">
                {hours && 
                    hours.map((hour, indx) => (
                        <div className="col-sm-12 col-md-6 mt-2">
                            <div class="card">
                                <div class="card-header">
                                    <h6>{hour.day}</h6>
                                </div>
                                <div class="card-body">
                                    <p>
                                        Start: {hour.startHour} <hr />
                                        End: {hour.endHour}
                                    </p>
                                </div>
                            </div>
                            
                            
                        </div>
                    ))}
                </div>
                {/* {currentDoctor ? (
                <div>
                    <div>
                    <label>
                        <strong>Selected Doctor:</strong>
                    </label>{" "}
                    {currentDoctor.name}
                    </div>
                    <div>
                    <label>
                        <strong>Phone Number:</strong>
                    </label>{" "}
                    {currentDoctor.phoneNumber}
                    </div>
                    <Link
                    to={"/doctors/" + currentDoctor.id}
                    className="badge bg-success"
                    >
                    Edit
                    </Link>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please Select Doctor to review availability</p>
                </div>
                )} */}
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {
    doctors: state.doctors,
    hours: state.hours,
  };
};
export default connect(mapStateToProps, { retrieveDoctors, retrieveAvailableHours, createRequest, findDoctorsByName })(CreateClientRequest);
