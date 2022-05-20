import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveHours, findHoursByDay } from "../../actions/hours";
import { Link } from "react-router-dom";
class HoursList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchDay = this.onChangeSearchDay.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveHour = this.setActiveHour.bind(this);
        this.findByDay = this.findByDay.bind(this);
        this.state = {
            currentHour: null,
            currentIndex: -1,
            searchDay: "",
        };
    }
    componentDidMount() {
        this.props.retrieveHours();
    }
    onChangeSearchDay(e) {
        const searchDay = e.target.value;
        this.setState({
        searchDay: searchDay,
        });
    }
    refreshData() {
        this.setState({
        currentHour: null,
        currentIndex: -1,
        });
    }
    setActiveHour(hour, index) {
        this.setState({
            currentHour: hour,
            currentIndex: index,
        });
    }
    findByDay() {
        this.refreshData();
        this.props.findHoursByDay(this.state.searchDay);
    }
    render() {
        const { currentHour, currentIndex } = this.state;
        const { hours } = this.props;
        return (
            <div className="list row">
            <div className="col-md-8">
               
            </div>
            <div className="col-md-6">
                <h4>
                    Working Days
                    <Link to={"/addhour"} className="btn btn-success btn-sm ml-3">
                        Add New
                    </Link>
                </h4>
                <ul className="list-group">
                {hours &&
                    hours.map((hour, index) => (
                    <li
                        className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveHour(hour, index)}
                        key={index}
                    >
                        {hour.day}
                    </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentHour ? (
                <div>
                    <div>
                    <label>
                        <strong>Working Day:</strong>
                    </label>{" "}
                    {currentHour.day}
                    </div>
                    <div>
                    <label>
                        <strong>Work Start at:</strong>
                    </label>{" "}
                    {currentHour.startHour}
                    </div>
                    <div>
                    <label>
                        <strong>Work End at:</strong>
                    </label>{" "}
                    {currentHour.endHour}
                    </div>
                    <Link
                    to={"/hours/" + currentHour.id}
                    className="badge bg-success"
                    >
                    Edit
                    </Link>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please Select working day for review</p>
                </div>
                )}
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {
    hours: state.hours,
  };
};
export default connect(mapStateToProps, { retrieveHours, findHoursByDay })(HoursList);
