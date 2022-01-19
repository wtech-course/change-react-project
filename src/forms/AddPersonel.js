import React, { Component } from 'react'
import posed from 'react-pose';
import MyConsumer from "../context";
import axios from "axios";

const Animation = posed.div({
    visible : {
        opacity: 1,
        applyAtStart : {
            display : "block"
        }
    },
    hidden : {
        opacity : 0,
        applyAtEnd : {
            display : "none"
        }
    }
});

class AddPersonel extends Component {

  state = {
      visible : false,
      name : "",
      department :"",
      salary : "",
      error : false
  } 
  changeVisibility = (e) => {
      this.setState({
          visible : !this.state.visible
      })
  } 
  validateForm = () => {
      const {name,salary,department} = this.state;
      if (name === "" || salary === "" || department === "") {
          return false;
      }
      return true;
      
  }
  changeInput = (e) => {
      this.setState({
          
          [e.target.name] : e.target.value
      })
  }
  
  addPersonel = async (dispatch,e) => {
      e.preventDefault();
      
      const {name,department,salary } = this.state;

      const newPersonel = {
          name,
          department,
          salary
      }
      
      if (!this.validateForm()) {
          this.setState({
              error :true
          })
          return;
      }
      
      
      const response = await axios.post("http://localhost:3004/personels",newPersonel);


      dispatch({type : "ADD_PERSONEL",payload:response.data});

      // Redirect
      this.props.history.push("/list");
      
  } 
  render() {
    const {visible,name,salary,department,error} = this.state;
    return <MyConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
     
                    <div className = "col-md-8 mb-4">
              
                      <button onClick = {this.changeVisibility} className = "btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>
                      <Animation pose = {visible ? "visible" : "hidden"}>
                      <div className="card">
                          <div className="card-header">
                          <h4>Add Personel Form</h4>
                          </div>
                          
                          <div className="card-body">
                             {
                                 error ? 
                                 <div className = "alert alert-danger">
                                    Lütfen bilgilerinizi kontrol edin.
                                 </div>
                                 :null
                             }

                              <form onSubmit = {this.addPersonel.bind(this,dispatch)}>
                                  <div className="form-group">
                                      <label htmlFor="name">Name</label>
                                      <input 
                                      type="text"
                                      name = "name"
                                      id = "id"
                                      placeholder = "Enter Name"
                                      className ="form-control"
                                      value = {name}
                                      onChange = {this.changeInput}
              
                                      />
                                  
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="department">Department</label>
                                      <input 
                                      type="text"
                                      name = "department"
                                      id = "department"
                                      placeholder = "Enter Department"
                                      className ="form-control"
                                      value = {department}
                                      onChange = {this.changeInput}
                                      />
                                  
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="salary">Salary</label>
                                      <input 
                                      type="text"
                                      name = "salary"
                                      id = "salary"
                                      placeholder = "Enter Salary"
                                      className ="form-control"
                                      value = {salary}
                                      onChange = {this.changeInput}
                                      />
                                  
                                  </div>
                                  <button className = "btn btn-danger btn-block" type = "submit">Add Personel</button>
                              
                              
                              </form>
                          </div>
                      
                      </div>
                      </Animation>
                    </div>
                  )
            }
        }
    
    </MyConsumer>
    
    
    
    
    
  }
}
export default AddPersonel;
