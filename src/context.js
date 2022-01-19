import React, { Component } from 'react'
import axios from "axios";
const PersonelContext = React.createContext();
// Provider , Consumer
const reducer = (state,action) => {
  switch(action.type) {
    case "DELETE_PERSONEL":
       
       return {
        ...state,
        personels: state.personels.filter(personel => action.payload !== personel.id)
       }
    case "ADD_PERSONEL":
       return {
         ...state,
         personels : [...state.personels,action.payload]
       }
    case "UPDATE_PERSONEL":
       return {
         ...state,
         personels: state.personels.map(personel => personel.id === action.payload.id ? action.payload : personel)
       }
    default:
      return state

  }
}

export class MyProvider extends Component {
    state = {
      personels: [],
        dispatch : action => {
          this.setState(state => reducer(state,action))
        }
      }
  componentDidMount = async () => {
    const response = await axios.get("http://localhost:3004/personels")
    this.setState({
      personels: response.data
    })
  }
      
  render() {
    return (
      <PersonelContext.Provider value = {this.state}>
        {this.props.children}
      </PersonelContext.Provider>
    )
  }
}
const PersonelConsumer = PersonelContext.Consumer;

export default PersonelConsumer;
