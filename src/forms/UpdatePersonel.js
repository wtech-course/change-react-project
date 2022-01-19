import React, { Component } from 'react'
import MyConsumer from "../context";
import axios from "axios";



class UpdatePersonel extends Component {

  state = {
      name : "",
      department :"",
      salary : "",
      error : false
  } 
   
  changeInput = (e) => {
      this.setState({
          
          [e.target.name] : e.target.value
      })
  }
  componentDidMount = async () => {
    const {id} = this.props.match.params;
    
    const response = await axios.get(`http://localhost:3004/personels/${id}`);

    const {name,salary,department} = response.data;

    this.setState({
        name,
        salary,
        department
    });

  }
  validateForm = () => {
    const {name,salary,department} = this.state;
    if (name === "" || salary === "" || department === "") {
        return false;
    }
    return true;
    
}
  updatePersonel = async (dispatch,e) => {
      e.preventDefault();

      // Update Personel
      const {name,salary,department} = this.state;
      const {id} = this.props.match.params;
      const updatedPersonel = {
        name,
        salary,
        department
      };
      if (!this.validateForm()) {
        this.setState({
            error :true
        })
        return;
        }
      const response = await axios.put(`http://localhost:3004/personels/${id}`,updatedPersonel);

      dispatch({type: "UPDATE_PERSONEL",payload : response.data});

      // Redirect
      this.props.history.push("/list");
  } 
  render() {
    const {name,salary,department,error} = this.state;
    return <MyConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
     
                    <div className = "col-md-8 mb-4">
              
                      
            
                      <div className="card">
                          <div className="card-header">
                          <h4>Update Personel Form</h4>
                          </div>
                          <div className="card-body">
                          {
                            error ? 
                            <div className = "alert alert-danger">
                               Lütfen bilgilerinizi kontrol edin.
                            </div>
                            :null
                         }
                              <form onSubmit = {this.updatePersonel.bind(this,dispatch)}>
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
                                  <button className = "btn btn-danger btn-block" type = "submit">Update Personel</button>
                              
                              
                              </form>
                          </div>
                      
                      </div>
                      
                    </div>
                  )
            }
        }
    
    </MyConsumer>
    
    
    
    
    
  }
}
export default UpdatePersonel;
