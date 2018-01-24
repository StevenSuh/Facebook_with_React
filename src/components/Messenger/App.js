import React, {Component} from 'react';
import {connect} from 'react-redux';

// import {updateThreadList} from '../../actions';
import {hexToRgb} from '../../actions/utils';
const {ipcRenderer, shell} = window.require('electron');

import ThreadList from './ThreadList/App';
import ThreadWindow from './ThreadWindow/App';
import ThreadDetail from './ThreadDetail/App';
import Frame from '../frame';
import Loader from '../loader';

import './messenger.css';

class Messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {currThread: {}};
  }

  componentDidMount() {
    // ipcRenderer.send('fb:thread_list_start', 0, 20);

    ipcRenderer.on('load:start', (event, value) => {
      ipcRenderer.removeAllListeners('load:start');
      document.getElementById('root').classList.remove('active');
      setTimeout(() => {
        this.props.history.push(value);
        setTimeout(() => {
          document.getElementById('root').classList.add('active');
        }, 300);
      }, 300);
    });
  }

  onCurrUserUpdate(value) {
    value.myProfile = `https://graph.facebook.com/${this.props.user.id}/picture?width=50&height=50`;

    if (this.state.currThread.threadID) document.getElementById(`list-item-${this.state.currThread.threadID}`).classList.remove('active');
    document.getElementById(`list-item-${value.threadID}`).classList.add('active');
    
    if (value.color) {
      const color = hexToRgb(value.color.slice(2));
      console.log(color);
      document.documentElement.style.setProperty('--red', color.r);
      document.documentElement.style.setProperty('--green', color.g);
      document.documentElement.style.setProperty('--blue', color.b);
    } else {
      document.documentElement.style.setProperty('--red', 0);
      document.documentElement.style.setProperty('--green', 132);
      document.documentElement.style.setProperty('--blue', 255);
    }
    this.setState({currThread: value});
  }

  // componentDidUpdate() {}

  onHeaderClick(event) {
    shell.openExternal(event.currentTarget.getAttribute('data-href'));
  }

  render() {
    console.log(this);

    return (
      <div>
        <Frame />
        <Loader />
        
        <div className="main-header">
          <div className="user">
            <p>{this.props.user.name}</p>
          </div>
          <svg 
            onClick={this.onHeaderClick}
            data-href="https://www.messenger.com"
            width="70" height="70" viewBox="0 0 1000 1000"
          >
            <path d="M499.5,0C225.9,0,4,207.4,4,463.3c0,145.6,71.8,275.4,184.1,360.4V1001l169.1-93.8
            c45.1,12.6,92.8,19.4,142.3,19.4c273.6,0,495.5-207.4,495.5-463.3S773.1,0,499.5,0z"/>
            <path className="overlay" d="M499.5,0C225.9,0,4,207.4,4,463.3c0,145.6,71.8,275.4,184.1,360.4V1001l169.1-93.8
            c45.1,12.6,92.8,19.4,142.3,19.4c273.6,0,495.5-207.4,495.5-463.3S773.1,0,499.5,0z"/>
            <polygon points="551.7,621.3 423.5,488.2 176.8,624.6 447.3,337.5 575.5,470.6 822.2,334.2 "/>
            
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="messenger">
          <ThreadList 
            onCompUpdate={this.onCurrUserUpdate.bind(this)}
          />

          <ThreadWindow 
            compThread={this.state.currThread}
            compUser={this.props.user}
          />

          <ThreadDetail 
            compThread={this.state.currThread}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {})(Messenger);