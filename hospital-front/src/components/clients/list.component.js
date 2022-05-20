import React, { Component } from "react";
import { connect } from "react-redux";
import { createClientRequest, retrieveRequests } from "../../actions/clients";
import {deleteRequest } from "../../actions/doctors";
import { Link } from "react-router-dom";
class ClientRequestsList extends Component {
    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveRequest = this.setActiveRequest.bind(this);
        this.removeRequest = this.removeRequest.bind(this);
        this.state = {
            currentRequest: null,
            currentIndex: -1,
        };
    }
    componentDidMount() {
        this.props.retrieveRequests();
    }
    
    refreshData() {
        this.setState({
            currentRequest: null,
            currentIndex: -1,
        });
    }
    setActiveRequest(request, index) {
        this.setState({
            currentRequest: request,
            currentIndex: index,
        });
    }

    removeRequest() {
        this.props
          .deleteRequest(this.state.currentRequest.id)
          .then(() => {
              this.setState({
                  currentRequest : null,
              });
            this.props.history.push("/requests");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    
    render() {
        const { currentRequest, currentIndex } = this.state;
        const { requests } = this.props;
        return (
            <div className="list row">
            <div className="col-md-8">
                
            </div>
            <div className="col-md-6">
                <h4>
                    Active Request
                    <Link to={"/create_request"} className="btn btn-success btn-sm ml-3">
                        Send New
                    </Link>
                </h4>
                <ul className="list-group">
                {requests &&
                    requests.map((rq, index) => (
                    <li
                        className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveRequest(rq, index)}
                        key={index}
                    >
                        {rq.time}
                        {
                            rq.comment && (
                                <span className="badge bg-info">
                                    {rq.comment}
                                </span>
                            )
                        }
                        {
                            rq.status == 0 && rq.comment == null ?(
                                <span className="badge bg-primary">Pending</span>
                            ):rq.status === 1 ? (<span className="badge bg-success">Accepted</span>) : (<span className="badge bg-danger">Rejected</span>)
                            
                        }
                    </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentRequest ? (
                <div>
                    <div>
                        <label>
                            <strong>Selected Request:</strong>
                        </label>{" "}
                        {currentRequest.time}
                    </div>
                    <div>
                        <label>
                            <strong>Status:</strong>
                        </label>{" "}
                        {currentRequest.status == 0 && currentRequest.comment == null ?(
                                <span className="badge bg-info">Pending</span>
                            ):currentRequest.status === 1 ? (<span className="badge bg-success">Accepted</span>) : (<span className="badge bg-danger">Rejected</span>)}
                    </div>
                    {currentRequest.status == 0 && currentRequest.comment == null ?(<button onClick={this.removeRequest} className="badge bg-danger" > Delete </button>):(
                        <span></span>
                    )}
                    
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please Select the request for details check.</p>
                </div>
                )}
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {
    requests: state.requests,
  };
};
export default connect(mapStateToProps, { createClientRequest, deleteRequest, retrieveRequests })(ClientRequestsList);