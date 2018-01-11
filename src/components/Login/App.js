import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fbLogin} from '../../actions';

const {ipcRenderer} = window.require('electron');

import LoginInput from './input';
import LoginButton from './button';
import SignUpButton from './signup';
import Checkbox from './checkbox';
import Frame from '../frame';
import Loader from '../loader';

import logo from '../../assets/logo.png';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {email: '', password: '', checked: false, prevName: ''};
  }

  componentWillReceiveProps(nextProps) {
    // console.log("Hello:", nextProps);
  }

  componentDidMount() {
    ipcRenderer.on('fb:login_exists', (event, name) => {
      this.setState({...this.state, prevName: name});
    });

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

  componentDidUpdate() {
    const error_msg = document.getElementById('error-msg');

    document.getElementById('loader').classList.remove('active');

    if (this.props.status.includes('error')) {
      error_msg.classList.add('error');
      error_msg.innerHTML = 'Failed to login';
    } else {
      error_msg.classList.remove('error');
      error_msg.innerHTML = 'Sign in to get started';
    }

    if ((this.state.email && this.state.password) || this.state.prevName) {
      document.getElementById('login-submit').classList.remove('disabled');
    } else {
      document.getElementById('login-submit').classList.add('disabled');
    }
  }

  onInputChange({target}) {
    if (target.type === 'password') {
      if (target.value !== '') target.nextSibling.classList.add('active');
      else target.nextSibling.classList.remove('active');
    }
    this.setState({...this.state, [target.getAttribute('data-key')]: target.value});
  }

  onSubmitClick(event) {
    event.preventDefault();
    console.log(this);
    if ((this.state.email && this.state.password) || this.state.prevName) {
      document.getElementById('loader').classList.add('active');
      this.props.fbLogin(this.state);
    }
  }

  onToggleChange(state) {
    // do something with checkbox
    this.setState({...this.state, checked: state});
  }

  render() {
    const buttonVal = (this.state.email || this.state.password) ? '' : this.state.prevName;

    return (
      <div>
        <Frame />
        <Loader />

        <div className="container login">
          <img className="logo" alt="logo" src={logo}/>
          <div className="section">
            <p className="first-msg">Messenger</p>
            <p id="error-msg">Sign in to get started</p>
          </div>

          <form>
            <LoginInput 
              componentType="email" 
              typeUppercase="Email" 
              onCompChange={this.onInputChange.bind(this)} 
              compValue={this.state.email}
              compError={this.props.status}
            />
            <LoginInput 
              componentType="password" 
              typeUppercase="Password" 
              onCompChange={this.onInputChange.bind(this)} 
              compValue={this.state.password}
              compError={this.props.status}
            />
            <Checkbox 
              onToggleChange={this.onToggleChange.bind(this)} 
              compValue={this.state.prevName}
            />

            <LoginButton 
              onCompClick={this.onSubmitClick.bind(this)}
              compValue={buttonVal}
            />
          </form>
          <SignUpButton />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    status: state.status
  };
}

export default connect(mapStateToProps, {fbLogin})(Login);