import React, { Component } from 'react';
import './App.css';
import Navbar from "./layout/Navbar";
import AddPersonel from "./forms/AddPersonel";
import UpdatePersonel from "./forms/UpdatePersonel";
import PersonelList from "./components/PersonelList";
import About from "./components/About";
import Home from "./components/Home";
import NotFound from "./pages/NotFound";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

class App extends Component {
  render() {   
    return (
      <Router>
        <div className="container">
         <Navbar title = "Personel CRUD Uygulaması"/>
          <hr/>          
          <Switch>
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/list" component = {PersonelList} />
            <Route exact path = "/add" component = {AddPersonel} />           
            <Route exact path = "/edit/:id" component = {UpdatePersonel} />
            <Route exact path = "/about" component = {About} />
            <Route component = {NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
