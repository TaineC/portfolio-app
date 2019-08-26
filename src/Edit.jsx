import React, {Component} from 'react';
import './App.css';

class View extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      fileName: this.props.photo,
    }
  }

  handlePhotoChange = (e) => {
    var formData = new FormData(this.form);

    this.props.uploadFile(formData).then(res => {
      var fileName = res.data;
      this.setState({fileName});
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    var {id, updateProjects, setActiveView} = this.props;

    var formData = new FormData(this.form);

      var data = {
        name: formData.get('name-input'),
        description: formData.get('description-input'),
        photo: this.state.fileName,
        type_id: formData.get('type-input'),
      }
      updateProjects(id,data);
      setActiveView('projects');

  }

  render(){

    var {name,description} = this.props

    return(
        <form onSubmit={this.handleFormSubmit} ref={(el) => {this.form = el}}>
          <div className="form-group">
            <label htmlFor="name-input">Name</label>
            <input type="text" className="form-control" name="name-input" id="name-input" defaultValue={name}/>
          </div>

          <div className="form-group">
            <label htmlFor="name-input">Description</label>
            <input type="text" className="form-control" name="description-input" id="description-input" defaultValue={description}/>
          </div>

          <div className="form-group">
            <label htmlFor="name-input">Photo</label>
            <input onChange={this.handlePhotoChange} type="file" className="form-control" name="photo-input" id="photo-input"/>
          </div>

          <div className="form-group">
            <label htmlFor="type-input">Type</label>
            <select className="form-control" name="type-input" id="type-input">
              <option value="1">Painting</option>
              <option value="2">Sculpture</option>
              <option value="3">Digital</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      )
  }
}

export default View;