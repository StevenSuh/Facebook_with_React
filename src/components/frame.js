import React, {Component} from 'react';
const {BrowserWindow} = window.require('electron').remote;

import './style.css';

export default class Frame extends Component {
  onClickMinimize() {
    BrowserWindow.getFocusedWindow().minimize();
  }

  onClickToggle() {
    const window = BrowserWindow.getFocusedWindow();

    if (window.maximized) {
      window.unmaximize();
      this.toggleButton.classList.remove('toggle');
      window.maximized = false;
      
      document.getElementById('root').classList.remove('maximize');
    } else {
      window.maximize();
      this.toggleButton.classList.add('toggle');
      window.maximized = true;

      document.getElementById('root').classList.add('maximize');
    }
  }

  onClickClose() {
    BrowserWindow.getFocusedWindow().close();
  }

  render() {
    return (
      <header className="menu-bar">
        <nav>
          <button className="menu-bar-minimize" 
            onClick={this.onClickMinimize}>
            <svg height="15" viewBox="0 2 24 24" width="15" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13H5v-2h14v2z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
          
          <button className="menu-bar-expand"
            ref={(input) => {this.toggleButton = input;}}
            onClick={this.onClickToggle.bind(this)}>
            <svg className="expand" height="18" viewBox="0 0 24 24" width="16.5" xmlns="http://www.w3.org/2000/svg">
              <path d="M4,4H20V20H4V4M6,8V18H18V8H6Z" />
            </svg>
            <svg className="restore" width="22" height="22" viewBox="0 1 24 24">
              <path d="M4,8H8V4H20V16H16V20H4V8M16,8V14H18V6H10V8H16M6,12V18H14V12H6Z" />
            </svg>
          </button>
          
          <button className="menu-bar-close"
            onClick={this.onClickClose}>
            <svg height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
        </nav>
      </header>
    );
  }
}