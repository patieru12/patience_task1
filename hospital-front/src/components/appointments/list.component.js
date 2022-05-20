import React, { Component } from "react";
import { connect } from "react-redux";
import {approveAppointment, rejectAppointment, retrieveAppointments} from "../../actions/appointments";
import { Link } from "react-router-dom";
class AppointmentsList extends Component {
    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveAppointment = this.setActiveAppointment.bind(this);
        this.approveAppointment = this.approveAppointment.bind(this);
        this.rejectAppointment = this.rejectAppointment.bind(this);
        this.state = {
            currentAppointment: null,
            currentIndex: -1,
        };
    }
    componentDidMount() {
        this.props.retrieveAppointments();
    }

    refreshData() {
        this.setState({
            currentAppointment: null,
            currentIndex: -1,
        });
    }

    setActiveAppointment(appointment, index) {
        this.setState({
            currentAppointment: appointment,
            currentIndex: index,
        });
    }

    approveAppointment(id) {
        console.log(id);
        this.props
          .approveAppointment(id)
          .then(() => {
            this.props.history.push("/appointments");
          })
          .catch((e) => {
            console.log(e);
          });
    }

    rejectAppointment(id) {
        console.log(id);
        this.props
          .rejectAppointment(id)
          .then(() => {
            this.props.history.push("/appointments");
          })
          .catch((e) => {
            console.log(e);
          });
    }

    render() {
        const { currentAppointment, currentIndex } = this.state;
        const { appointments } = this.props;
        // return (
        //     <div></div>
        // );
        return (
            <div className="list row">
                <div className="col-sm-12">
                    {currentAppointment?(
                        <div>

                        </div>
                    ):(
                        <div>
                            <br />
                            <p>Please Select working day for review</p>
                        </div>
                        )}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                {/* <th>User</th> */}
                                <th>Comment</th>
                                {/* <th>Status</th> */}
                                <th>Approve</th>
                                <th>Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments && 
                            appointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{appointment.time}</td>
                                    {/* <td>{appointment.user.username}</td> */}
                                    <td>{appointment.comment}</td>
                                    <td>
                                        {/* <button onClick={this.setActiveAppointment(appointment, index)} className="btn btn-success btn-sm mr-2">Approve</button> */}
                                    </td>
                                    <td>
                                        {/* <Link onClick={this.rejectAppointment(appointment.id)} className="btn btn-danger btn-sm ml-2">Reject</Link> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        appointments: state.appointments,
    };
};
export default connect(mapStateToProps, { approveAppointment, rejectAppointment, retrieveAppointments })(AppointmentsList);