import React, {Component} from 'react';

export default class SignUpButton extends Component {
  render() {
    const innerText = this.props.compValue ? <span>{this.props.compValue}</span> : 'Login';

    return (
      <div className="section section-button">
        <button
          id="login-submit"
          className={"button button-submit " + (this.props.compValue ? 'ready' : 'disabled')}
          type="submit"
          onClick={this.props.onCompClick}
        >

          {this.props.compValue ? 'Continue as ' : ''}
          {innerText}
        </button>
      </div>
    );
  }
}