import React, {Component} from 'react';
import axios from 'axios';
import View from './View.jsx';
import Project from './Project.jsx';
import Form from './Form.jsx';
import Edit from './Edit.jsx';
import './App.css';

var urlPrefix = 'http://localhost:4000/api';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeView: 'projects',
      projects: [],
      types: [],
      currentType: null,
      projectToUpdate: null,
    };
  }

  setActiveView = (view) => {
    this.setState({activeView: view});
  }

  setProjectToUpdate = (id) => {
    var foundProject = this.state.projects.find((item) => {
      return item.id === id;
    });
    this.setState({projectToUpdate: foundProject});
  }

  setType = (id) => {
    var foundType = this.state.types.find((item) => {
      return item.id == id;
    });
    foundType ? this.setState({currentType: foundType}) : this.setState({currentType: null});
  }

  getProjects = () => {
    axios.get(urlPrefix+'/projects')
    .then(res => {
      this.setState({projects: res.data});
    });
  }

  getTypes = () => {
    axios.get(urlPrefix+'/types')
    .then(res => {
      this.setState({types: res.data});
    })
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

  uploadFile = (formData) => {
    // var settings = {headers: {'Content-Type': 'multipart/form-data'}}
    // {settings}-->
    return axios.post(urlPrefix+'/upload/',formData)
  }

  componentDidMount(){
    this.getProjects();
    this.getTypes();
  }

  typeClick = (e) => {
    this.setType(e.target.dataset.type);
    this.setActiveView('projects');
  }

  render(){

    var {currentType, projects} = this.state;

    if(currentType){
      projects = projects.filter(item =>{
        return item.type_id == currentType.id;
      });
    }

    return(
      <div className="app">
      
        <View viewName="projects" activeView={this.state.activeView} className="color1">
          <div className="header"><i onClick={() => this.setActiveView('nav')} className="fas fa-bars"></i></div>
          <div className="main">
            <h2>{currentType ? currentType.name : 'All Projects'}</h2>
              {
                projects.map((item) => {
                  
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
              <Form uploadFile={this.uploadFile} addProjects={this.addProjects} setActiveView={this.setActiveView}/>
          </div>
        </View>

        <View viewName="edit-project" activeView={this.state.activeView} className="color3">
          <div className="header"><i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i></div>
          <div className="main">
            <h2>Edit Project</h2>
              <Edit uploadFile={this.uploadFile} {...this.state.projectToUpdate} updateProjects={this.updateProjects} setActiveView={this.setActiveView}/>
          </div>
        </View>


        <View viewName="nav" activeView={this.state.activeView} className="color4">
          <div className="header"><i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i></div>
          <div className="main">
            <ul>
              <li onClick={() => this.setActiveView('projects')} className="color1"><a data-type="null" onClick={this.typeClick} href="#">All Projects</a></li>
              {
                this.state.types.map(item => {
                  return(
                    <li className="color3">
                      <a data-type={item.id} onClick={this.typeClick} href="#">{item.name}</a>
                    </li>
                  )
                })
              }
              <li onClick={() => this.setActiveView('add-project')} className="color2"><a data-type="null" onClick={this.typeClick} href="#">Add Project</a></li>
            </ul>
          </div>
        </View>

      </div>
    )
  }
}

export default App;
