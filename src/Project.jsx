import React, {Component} from 'react';
import './App.css';

var serverUrl = 'http://localhost:4000/';

class Project extends Component {
  constructor(props){
    super(props);
  }

  handleDeleteClick = () => {
    var {deleteProjects, id} = this.props;
    deleteProjects(id);
  }

  handleEditClick = () => {
    var {setActiveView, setProjectToUpdate, id} = this.props;

    setProjectToUpdate(id);
    setActiveView('edit-project');
  }

  render(){

    var {name, description, photo} = this.props

    return(
      <div className="card project">
        <img className="card-img-top" src={serverUrl+photo} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <p>
              <i className="fas fa-heart"></i>
              <i onClick={this.handleEditClick} className="fas fa-edit"></i>
              <i onClick={this.handleDeleteClick} className="fas fa-trash"></i>
            </p>
          </div>
      </div>
    )
  }
}

export default Project;


