import React, {Component} from 'react';

const {ipcRenderer} = window.require('electron');

import ThreadBar from './threadBar.js';
import ThreadMsg from './threadMsg.js';
import ThreadInput from './threadInput.js';

import {getThreadHistory, sendFbMsg, markAsRead} from '../../../actions';

export default class ThreadWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {list: []};

    // ipcRenderer
    ipcRenderer.on('fb:thread_history_done', (event, data) => {
      markAsRead(data[0].threadID);
      this.setState({list: data});
      this.refs.msgList.scrollTop = this.refs.msgList.scrollHeight;
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate: ', this.props, nextProps);

    // if (this.props.compThread === nextProps.compThread) return false;

    if (!this.props.compThread.threadID && nextProps.compThread) {
      getThreadHistory({id: nextProps.compThread.threadID, count: 20, type: 'initial', timestamp: undefined});
      setTimeout(() => {
        document.getElementById(`list-item-${nextProps.compThread.threadID}`).click();
      }, 0);
      // return false;
    } else if (this.props.compThread && this.props.compThread.threadID !== nextProps.compThread.threadID) {
      getThreadHistory({id: nextProps.compThread.threadID, count: 20, type: 'initial', timestamp: undefined});
    }

    return true;
  }

  onInputSubmit(value) {
    const data = {id: this.props.compThread.threadID, value};
    
    sendFbMsg(data);
    this.onSendMsg(data);
  }

  onSendMsg(data) {
    const msg = [{
      type: 'message',
      attachments: [],
      body: data.value,
      senderID: this.props.compUser.id,
      threadID: data.id,
      messageReactions: [],
      timestamp: Date.now()
    }];
    this.setState({list: this.state.list.concat(msg)});
    
    setTimeout(() => {
      this.refs.msgList.scrollTop = this.refs.msgList.scrollHeight;
    }, 0);
  }

  onSendEvent() {}

  onLoadMoreMsg() {}

  componentDidMount() {
  }


  render() {
    console.log(this);

    const threadWindowMsg = [];
    const list = this.state.list;
    let j = 0;
    let i = 0;
    const currUser = this.props.compUser.id;

    while (i < list.length) {
      if (list[i].body) {
        let msgItem = [];
        // console.log(list[i]);
        const person = (list[i].senderID === currUser) ? 'me' : 'other';
        msgItem.push(<ThreadMsg key={i} compKey={list[i]} />);
        i++;

        while (i < list.length && list[i].body && list[i].senderID === list[i-1].senderID) {
          msgItem.push(<ThreadMsg key={i} compKey={list[i]} />);
          i++;
        }

        const url = (person === 'me') ? 
          this.props.compThread.myProfile : this.props.compThread.profilePics[list[i-1].senderID] + '?width=50&height=50';

        const pic = <img
          className="thread-window-msg-person-img"
          alt={person}
          src={url}
        />;

        threadWindowMsg.push(
          <div key={j} className={`thread-window-msg-person-wrapper ${person}`}>
            {msgItem}

            <div className="thread-window-msg-person">
              {pic}
            </div>
          </div>
        );
        j++;
      } else {
        i++;
      }
    }
    return (
      <section className="thread-window">
        <ThreadBar
          compThread={this.props.compThread}
        />

        <div className="thread-window-msg-wrapper" ref="msgList">
          {threadWindowMsg}
        </div>

        <ThreadInput 
          onCompSubmit={this.onInputSubmit.bind(this)}
        />
      </section>
    );
  }
}