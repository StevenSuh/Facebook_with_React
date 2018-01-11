import React, {Component} from 'react';

export default class ThreadInput extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};

    this.firstHeight = 0;
  }

  onInputChange({target}) {
    this.setState({term: target.value});
    this.updateTextArea(target);
    // this.props.onCompChange(target.value);
  }

  updateTextArea(target) {
    if (target.value) document.getElementById('thread-window-inputBox').classList.add('send');
    else document.getElementById('thread-window-inputBox').classList.remove('send');

    const msg = document.getElementsByClassName('thread-window-msg-wrapper')[0];
    target.parentElement.style.setProperty('height', 0);

    const scroll = target.scrollHeight;
    target.parentElement.style.setProperty('height', scroll + 'px');

    const diff = scroll - this.firstHeight;
    msg.style.removeProperty('height');
    if (diff) msg.style.setProperty('height', msg.offsetHeight - diff + 'px');
  }

  onInputSubmit(target) {
    this.props.onCompSubmit(this.state.term);

    this.setState({term: ''});
    target.value = '';
    this.updateTextArea(target);
  }

  onInputKeyDown(event) {
    const target = event.target;

    if (event.keyCode === 13) {

      if (event.shiftKey) {
        event.stopPropagation();
      } else {
        event.preventDefault();
        if (target.value) this.onInputSubmit(target);
      }
    }
  }

  componentDidMount() {
    this.firstHeight = document.getElementsByTagName('textarea')[0].offsetHeight;
  }

  render() {
    return (
      <section className="thread-window-input-wrapper clearfix">
        <button id="thread-window-inputBox" className="input-send-emoji">
          <svg className="input-emoji" width="22" height="22.5" viewBox="0 0 40 41">
            <g transform="translate(-667 -1269)">
              <path d="M668,1308.99h7v-22h-7v22ZM706,1291.7a3.584,3.584,0,0,0-1.778-3.09,0.036,0.036,0,0,1-.011-0.06,3.545,3.545,0,0,0,1.389-2.81,3.587,3.587,0,0,0-3.6-3.58H691.011c2.02-10.5-3.071-12.59-5.1-12.08-1.211.3-1.34-.03-1.12,2.35l0.1,3.95a3.924,3.924,0,0,1-.66,2.29L679,1286.52v19.47h19.213a3.6,3.6,0,0,0,3.4-3.57,3.534,3.534,0,0,0-.38-1.6c-0.01-.02-0.007-0.05.016-0.05a3.584,3.584,0,0,0,2.963-3.52,3.509,3.509,0,0,0-.706-2.11c-0.01-.02,0-0.04.014-0.04A3.583,3.583,0,0,0,706,1291.7Z" />
            </g>
          </svg>

          <svg className="input-send" width="22" height="22" viewBox="-1 -2 24 24" >
            <path d="M 1.84546 0.1327L 19.0603 8.51832C 20.3132 9.1291 20.3132 10.8712 19.0603 11.4815L 1.84546 19.8671C 0.997535 20.2804 0 19.6796 0 18.7561L 0.733594 12.6314C 0.802023 12.06 1.26445 11.609 1.85099 11.5416L 10.93 10.6177C 11.692 10.5403 11.692 9.45954 10.93 9.3821L 1.85099 8.45828C 1.26445 8.3912 0.802023 7.94026 0.733594 7.36841L 0 1.24369C 0 0.32028 0.997535 -0.280142 1.84546 0.1327Z"/>
          </svg>
        </button>

        <div className="input-option-wrapper">
          <button className="input-camera">
            <svg width="26" height="26" viewBox="0 0 24 24">
              <path d="M4.7,5.8h2.7L9.3,4h5.5l1.8,1.8h2.7c1,0,1.8,0.8,1.8,1.8v10.7c0,1-0.8,1.8-1.8,1.8H4.7c-1,0-1.8-0.8-1.8-1.8
                V7.5C2.9,6.6,3.7,5.8,4.7,5.8"/>
              <path className="hover" d="M12,8.4c-2.5,0-4.5,2-4.5,4.5s2,4.5,4.5,4.5s4.5-2,4.5-4.5S14.5,8.4,12,8.4"/>
              <circle cx="18.4" cy="8.3" r="1"/>
            </svg>
          </button>

          <button className="input-image">
            <svg width="26" height="26" viewBox="-2 0.5 24 24">
              <path d="M21,19V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14C20.1,21,21,20.1,21,19z"/>
              <polyline points="8.5,13.5 11,16.5 14.5,12 19,18 5,18 "/>
            </svg>
          </button>

          <button className="input-microphone">
            <svg width="26" height="26" viewBox="0 0 24 24">
              <path d="M12,2c1.7,0,3,1.3,3,3v6c0,1.7-1.3,3-3,3s-3-1.3-3-3V5C9,3.3,10.3,2,12,2"/>
              <path className="no-stroke" d="M18.5,11c0,3.3-2.4,6-5.6,6.4v2.8h-1.9v-2.8C7.9,17,5.5,14.3,5.5,11H7c0,2.8,2.2,5,5,5s5-2.2,5-5H18.5z"/>
            </svg>
          </button>
        </div>

        <form className="thread-window-input-form">
          <textarea 
            className="thread-window-input" 
            type="text" 
            placeholder="Type a message..." 
            value={this.state.term}
            onChange={this.onInputChange.bind(this)}
            onKeyDown={this.onInputKeyDown.bind(this)}
          />

          <button 
            className="input-emoji-list"
            onClick={(event) => event.preventDefault()}
          >
            <svg width="26" height="25" viewBox="0 -2 24 24">
              <path className="circle" d="M21.2,12c0-5.1-4.1-9.2-9.2-9.2S2.8,6.9,2.8,12s4.1,9.2,9.2,9.2S21.2,17.1,21.2,12"/>
              <path d="M10,9.5c0,0.8-0.7,1.5-1.5,1.5S7,10.3,7,9.5S7.7,8,8.5,8S10,8.7,10,9.5"/>
              <path d="M17,9.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5S14.7,8,15.5,8C16.3,8,17,8.7,17,9.5"/>
              <path d="M12,17.2c-1.8,0-3.3-0.7-4.2-1.8L9.2,14c0.5,0.7,1.5,1.2,2.8,1.2s2.3-0.5,2.8-1.2l1.4,1.4C15.3,16.5,13.8,17.2,12,17.2z"/>
            </svg>
          </button>
        </form>
      </section>
    );
  }
}