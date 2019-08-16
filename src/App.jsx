import React, {Component} from 'react';
import axios from 'axios';
import View from './View.jsx';
import Project from './Project.jsx';
import './App.css';

var urlPrefix = 'http://localhost:4000/api';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeView: 'projects',
      projects: [
        {
          id: 1,
          name: 'Build Hut',
          description: 'My first project',
        },
        {
          id: 2,
          name: 'Start Fire',
          description: 'My best project',
        },
      ]
    };
  }

  setActiveView = (view) => {
    this.setState({activeView: view});
  }

  getProjects = () => {
    axios.get(urlPrefix+'/projects')
    .then(res => {
      console.log(res);
      this.setState({projects: res.data});
    });
  }

  addProject = (data) => {

  }

  deleteProject = (id) => {

  }

  updateProject = (id,data) => {

  }

  componentDidMount(){
    this.getProjects();
  }


  render(){
    return(
      <div className="app">
      
        <View viewName="projects" activeView={this.state.activeView} className="color1">
          <div className="header"><i onClick={() => this.setActiveView('nav')} className="fas fa-bars"></i></div>
          <div className="main">
            <h2>Projects</h2>
              {
                this.state.projects.map((item) => {
                  
                  var props = {
                    ...item,
                    key: item.id,
                  };
                  
                  return(
                    <Project {...props}/>
                  ) 
                })
              }
          </div>
        </View>

        <View viewName="add-project" activeView={this.state.activeView} className="color2">
          <div className="header"><i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i></div>
          <div className="main">
            <h2>Add Project</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="name-input">Name</label>
                  <input type="text" className="form-control" name="name-input" id="name-input" placeholder="Enter project name"/>
                </div>
                <div className="form-group">
                  <label htmlFor="name-input">Description</label>
                  <input type="text" className="form-control" name="description-input" id="description-input" placeholder="Enter project description"/>
                </div>

                <div className="form-group">
                  <label htmlFor="name-input">Photo</label>
                  <input type="text" className="form-control" name="photo-input" id="photo-input" value="project.jpg"/>
                </div>

                <div className="form-group">
                  <label htmlFor="type-input">Type</label>
                  <select className="form-control" name="type-input" id="type-input">
                    <option value="1">Painting</option>
                    <option value="2">Sculpture</option>
                    <option value="3">Digital</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary">Add</button>
              </form>
          </div>
        </View>



        <View viewName="nav" activeView={this.state.activeView} className="color4">
          <div className="header"><i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i></div>
          <div className="main">
            <ul>
              <li onClick={() => this.setActiveView('projects')} className="color1"><a href="#">Projects</a></li>
              <li onClick={() => this.setActiveView('add-project')} className="color2"><a href="#">Add Project</a></li>
            </ul>
          </div>
        </View>

      </div>
    )
  }
}

export default App;
