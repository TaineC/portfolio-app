import React, {Component} from 'react';
import axios from 'axios';
import View from './View.jsx';
import Project from './Project.jsx';
import Form from './Form.jsx';
import Edit from './Edit.jsx';
import './App.css';

var urlPrefix = 'http://localhost:3001/api';

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
      ],
      projectToUpdate: null,
    };
  }

  setActiveView = (view) => {
    this.setState({activeView: view});
  }

  setProjectToUpdate = (id) => {
    var foundProject = this.state.projects.find((project) => {
      return project.id === id;
    });
    this.setState({projectToUpdate: foundProject});
  }

  getProjects = () => {
    axios.get(urlPrefix+'/projects')
    .then(res => {
      console.log(res);
      this.setState({projects: res.data});
    });
  }

  addProjects = (data) => {
    axios.post(urlPrefix+'/projects/',data)
    .then(res => {
      this.getProjects();
    })
  }

  deleteProjects = (id) => {
    axios.delete(urlPrefix+'/projects/'+id)
    .then(res => {
      this.getProjects();
    })
  }

  updateProjects = (id,data) => {
    axios.put(urlPrefix+'/projects/'+id,data)
    .then(res => {
      this.getProjects();
    })
  }

  componentDidMount(){
    this.getProjects();
  }


  render(){
    return(
      <div className="app">
      
        <View viewName="projects" activeView={this.state.activeView} className="color1">
          <div className="header"><i onClick={() => this.setActiveView('add-project')} className="fas fa-bars"></i></div>
          <div className="main">
            <h2>Projects</h2>
              {
                this.state.projects.map((item) => {
                  
                  var props = {
                    ...item,
                    key: item.id,
                    deleteProjects: this.deleteProjects,
                    setActiveView: this.setActiveView,
                    setProjectToUpdate: this.setProjectToUpdate,
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
              <Form addProjects={this.addProjects} setActiveView={this.setActiveView}/>
          </div>
        </View>

        <View viewName="edit-project" activeView={this.state.activeView} className="color3">
          <div className="header"><i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i></div>
          <div className="main">
            <h2>Edit Project</h2>
              <Edit {...this.state.projectToUpdate} updateProjects={this.updateProjects} setActiveView={this.setActiveView}/>
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
