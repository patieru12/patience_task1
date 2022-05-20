import React, { Component } from "react";
import { connect } from "react-redux";
import { updateDoctor, deleteDoctor } from "../../actions/doctors";
import DoctorDataService from "../../services/doctor.service";
import { useParams, useNavigate } from 'react-router-dom';

export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
}
export function withRouter2(Children){
    return(props)=>{

       const history  = {push: useNavigate()};
       return <Children {...props}  history = {history}/>
   }
}
class Doctor extends Component {
    constructor(props) {
      super(props);
      
    //   console.log(params);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
      this.getDoctor = this.getDoctor.bind(this);
      this.updateContent = this.updateContent.bind(this);
      this.removeDoctor = this.removeDoctor.bind(this);
      this.state = {
        currentDoctor: {
          id: null,
          name: "",
          phoneNumber: "",
        },
        message: "",
      };
    }
    componentDidMount() {
        // console.log(params);
      this.getDoctor(this.props.match.params.id);
    }
    onChangeName(e) {
      const name = e.target.value;
      this.setState(function (prevState) {
        return {
            currentDoctor: {
            ...prevState.currentDoctor,
            name: name,
          },
        };
      });
    }
    onChangePhoneNumber(e) {
      const phoneNumber = e.target.value;
      this.setState((prevState) => ({
        currentDoctor: {
          ...prevState.currentDoctor,
          phoneNumber: phoneNumber,
        },
      }));
    }
    
    getDoctor(id) {
        DoctorDataService.get(id)
        .then((response) => {
          this.setState({
            currentDoctor: response.data,
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    
    updateContent() {
      this.props
        .updateDoctor(this.state.currentDoctor.id, this.state.currentDoctor)
        .then((reponse) => {
          console.log(reponse);
          
          this.setState({ message: "Doctor was updated successfully!" });
        })
        .catch((e) => {
          console.log(e);
        });
    }
    removeDoctor() {
      this.props
        .deleteDoctor(this.state.currentDoctor.id)
        .then(() => {
          this.props.history.push("/doctors");
        })
        .catch((e) => {
          console.log(e);
        });
    }
    render() {
      const { currentDoctor } = this.state;
      return (
        <div>
        {currentDoctor ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="name">Select Doctor</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentDoctor.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  value={currentDoctor.phoneNumber}
                  onChange={this.onChangePhoneNumber}
                />
              </div>
            </form>
            
            <button
              className="btn btn-sm btn-danger mr-2 mt-2"
              onClick={this.removeDoctor}
            >
              Delete
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-success ml-2 mt-2"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please select Doctor</p>
          </div>
        )}
      </div>
      );
    }
  }
  export default withRouter2(withRouter(connect(null, { updateDoctor, deleteDoctor})(Doctor)));