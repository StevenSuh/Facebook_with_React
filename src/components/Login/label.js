import React, {Component} from 'react';

export default class LoginLabel extends Component {
  render() {
    return (
      <label 
        className={`label label-${this.props.componentType}`}
        onClick={this.props.onCompClick}
      >
        Show
      </label>
    );
  }
}