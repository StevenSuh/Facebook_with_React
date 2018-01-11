import React, {Component} from 'react';

import LoginLabel from './label';

export default class LoginInput extends Component {
  onLabelClick(event) {
    event.preventDefault();
    const target = event.target;

    target.previousSibling.focus();
    if (target.innerHTML === 'Show') {
      target.previousSibling.type = 'text';
      target.innerHTML = 'Hide';
    } else {
      target.previousSibling.type = 'password';
      target.innerHTML = 'Show';
    }
  }

  onInputFocus(event) {
    event.target.parentElement.classList.add('active');
  }

  onInputBlur(event) {
    event.target.parentElement.classList.remove('active');
  }

  render() {
    const label = (this.props.componentType === 'password') ? 
          <LoginLabel 
            componentType={this.props.componentType} 
            onCompClick={this.onLabelClick}
          /> 
          : '';
    const error = this.props.compError.includes('error') ? 'error' : '';
    return (
      <div className={`section section-input ${error}`}>
        <input 
          data-key={this.props.componentType}
          type={this.props.componentType}
          className={`input input-${this.props.componentType}`}
          placeholder={this.props.typeUppercase}
          onChange={this.props.onCompChange}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          value={this.props.compValue} 
          required
        />
        {label}
      </div>
    );
  }
}