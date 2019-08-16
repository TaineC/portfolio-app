import React, {Component} from 'react';
import './App.css';

class View extends Component{
  constructor(props){
    super(props)
  }

  render(){

    var {className, children, viewName, activeView} = this.props;
    var newClassName = (viewName == activeView) ? 'view active ' + className : 'view ' + className;

    return(
        <div className={newClassName}>
          {children}
        </div>
      )
  }
}

export default View;