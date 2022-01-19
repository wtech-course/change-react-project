import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PersonelConsumer from "../context";
import axios from "axios";
import {Link} from "react-router-dom";



class Personel extends Component {
  state = {
    isVisible : false
  }
  static defaultProps = {
    name : "Bilgi Yok",
    salary : "Bilgi Yok",
    department : "Bilgi Yok"
  }
  
  onClickEvent = (e) =>{
    
    this.setState({
      isVisible : !this.state.isVisible
    })
  }
  onDeletePersonel = async (dispatch,e) => {
     const {id} = this.props;
     // Delete Request
    await axios.delete(`http://localhost:3004/personels/${id}`);

    // Consumer Dispatch
    dispatch({type : "DELETE_PERSONEL",payload:id});
  }
  render() {

    // Destructing
    const {id,name,department,salary} = this.props;
    const {isVisible} = this.state;
    return (
      <PersonelConsumer>
      {
        value => {
          const {dispatch} = value;

          return (
            <div className = "col-md-8 mb-4" >
              <div className="card" style = {isVisible ? {backgroundColor : "#62848d",color : "white"} : null}>
                <div className="card-header d-flex justify-content-between">
                  <h4 className = "d-inline" onClick = {this.onClickEvent}>{name}</h4>
                  
                  <i onClick = {this.onDeletePersonel.bind(this,dispatch)} className = "far fa-trash-alt" style = {{cursor : "pointer"}}></i>
      
                </div>
                {
                  isVisible ? <div className="card-body">
                
                  <p className="card-text">Maaş : {salary}</p>
                  <p className="card-text">Department : {department}</p>
                  <Link to = {`edit/${id}`} className = "btn btn-dark btn-block"> Personel Güncelle </Link>
                  </div> : null
                }
                
              </div>
             
            </div>
          )


        }
      }
    </PersonelConsumer>)
         }
       }


  Personel.propTypes = {
  name : PropTypes.string.isRequired,
  salary : PropTypes.string.isRequired,
  department : PropTypes.string.isRequired,
  id : PropTypes.string.isRequired
}
export default Personel;
