import React, { Component } from "react";
import { connect } from "react-redux";
import { updateHour, deleteHour } from "../../actions/hours";
import HourDataService from "../../services/hour.service";
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
class Hour extends Component {
    constructor(props) {
      super(props);
      
    //   console.log(params);
      this.onChangeDay = this.onChangeDay.bind(this);
      this.onChangeStartHour = this.onChangeStartHour.bind(this);
      this.onChangeEndHour = this.onChangeEndHour.bind(this);
      this.getHour = this.getHour.bind(this);
      this.updateContent = this.updateContent.bind(this);
      this.removeHour = this.removeHour.bind(this);
      this.state = {
        currentHour: {
          id: null,
          day: "",
          startHour: "",
          endHour: "",
        },
        message: "",
      };
    }
    componentDidMount() {
        // console.log(params);
      this.getHour(this.props.match.params.id);
    }
    onChangeDay(e) {
      const day = e.target.value;
      this.setState(function (prevState) {
        return {
          currentHour: {
            ...prevState.currentHour,
            day: day,
          },
        };
      });
    }
    onChangeStartHour(e) {
      const startHour = e.target.value;
      this.setState((prevState) => ({
        currentHour: {
          ...prevState.currentHour,
          startHour: startHour,
        },
      }));
    }
    onChangeEndHour(e) {
      const endHour = e.target.value;
      this.setState((prevState) => ({
        currentHour: {
          ...prevState.currentHour,
          endHour: endHour,
        },
      }));
    }
    getHour(id) {
      HourDataService.get(id)
        .then((response) => {
          this.setState({
            currentHour: response.data,
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    
    updateContent() {
      this.props
        .updateHour(this.state.currentHour.id, this.state.currentHour)
        .then((reponse) => {
          console.log(reponse);
          
          this.setState({ message: "Working hour was updated successfully!" });
        })
        .catch((e) => {
          console.log(e);
        });
    }
    removeHour() {
      this.props
        .deleteHour(this.state.currentHour.id)
        .then(() => {
          this.props.history.push("/hours");
        })
        .catch((e) => {
          console.log(e);
        });
    }
    render() {
      const { currentHour } = this.state;
      return (
        <div>
        {currentHour ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="day">Working Dat</label>
                <input
                  type="text"
                  className="form-control"
                  id="day"
                  value={currentHour.day}
                  onChange={this.onChangeDay}
                />
              </div>
              <div className="form-group">
                <label htmlFor="startHour">Starting Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="startHour"
                  value={currentHour.startHour}
                  onChange={this.onChangeStartHour}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endHour">Ending Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="endHour"
                  value={currentHour.endHour}
                  onChange={this.onChangeEndHour}
                />
              </div>
            </form>
            
            <button
              className="btn btn-sm btn-danger mr-2 mt-2"
              onClick={this.removeHour}
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
            <p>Please select working day</p>
          </div>
        )}
      </div>
      );
    }
  }
  export default withRouter2(withRouter(connect(null, { updateHour, deleteHour})(Hour)));