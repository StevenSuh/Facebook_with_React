import React, {Component} from 'react';
const {shell} = window.require('electron');

export default class SignUpButton extends Component {
  onAnchorClick(event) {
    event.preventDefault();
    shell.openExternal(event.target.getAttribute('data-href'));
  }

  render() {
    return (
      <div className="section section-button">
        <button
          className="button button-signup"
          data-href="https://www.facebook.com/r.php"
          onClick={this.onAnchorClick}
        >
          Create an account
        </button>
      </div>
    );
  }
}