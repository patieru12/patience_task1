import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveDoctors, findDoctorsByName } from "../../actions/doctors";
import { Link } from "react-router-dom";
class DoctorsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveDoctor = this.setActiveDoctor.bind(this);
        this.findByName = this.findByName.bind(this);
        this.state = {
            currentDoctor: null,
            currentIndex: -1,
            searchName: "",
        };
    }
    componentDidMount() {
        this.props.retrieveDoctors();
    }
    onChangeSearchName(e) {
        const searchName = e.target.value;
        this.setState({
        searchName: searchName,
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
    findByName() {
        this.refreshData();
        this.props.findDoctorsByName(this.state.searchName);
    }
    render() {
        const { searchName, currentDoctor, currentIndex } = this.state;
        const { doctors } = this.props;
        return (
            <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name"
                        value={searchName}
                        onChange={this.onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.findByName}
                        >
                        Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>
                    Active Doctors
                    <Link to={"/adddoctor"} className="btn btn-success btn-sm ml-3">
                        Add New
                    </Link>
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
            </div>
            <div className="col-md-6">
                {currentDoctor ? (
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
                    <p>Please Select Doctor for more actions</p>
                </div>
                )}
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {
    doctors: state.doctors,
  };
};
export default connect(mapStateToProps, { retrieveDoctors, findDoctorsByName })(DoctorsList);
