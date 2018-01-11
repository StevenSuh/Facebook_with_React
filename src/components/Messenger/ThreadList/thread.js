import React, {Component} from 'react';

import {filterTime} from '../../../actions/utils';

export default class ThreadListItem extends Component {
  componentDidMount() {
    const ev = new CustomEvent("updateLastMsg", {detail: 'hello world'});

    document.getElementById(`list-item-${this.props.compKey.threadID}`).dispatchEvent(ev);
  }

  onAnchorClick(event) {
    event.preventDefault();
  }

  render() {
    const key = this.props.compKey;

    const name = key.name;

    let msg = key.snippet;
    const unicode = msg.charCodeAt(msg.length-1) + msg.charCodeAt(msg.length-2);
    let unicodeMsg = '';

    if (key.snippetSticker && unicode === 112512) {
      msg = msg.slice(0,-2);

      unicodeMsg = <img 
        className="thread-list-item-msg-img"
        alt={String.fromCodePoint(unicode)} 
        src="https://static.xx.fbcdn.net/images/emoji.php/v9/zcc/1.5/16/f0000.png" 
      />;
    }

    const pic = [];
    Object.values(key.profilePics).forEach((img, i) => {
      if (i >= 3) return;

      const className = (i === 0) ? 'single' : 'double'; 
      img += '?width=80&height=80';

      pic.push(
        <img
          key={i}
          className={`thread-list-item-circle-img ${className}`}
          alt={name}
          src={img}
        />
      );
    });

    // temp1 = temp.match(/[^\u000-\u00ff\s]/gi)

    const time = filterTime(key.snippetTimestamp);
    const status = (key.unreadCount > 0) ? 'unread' : '';

    console.log(name, time, msg, status);

    return (
      <a 
        className={`thread-list-item ${status}`}
        data-index={key.index}
        id={`list-item-${key.threadID}`}
        href="/"
        onClick={this.onAnchorClick}
      >
        <div className="thread-list-item-status" />

        <div className="thread-list-item-circle">
          {pic}
        </div>

        <div className="item-description">
          <div className="item-name-time-wrapper">
            <div className="thread-list-item-name">
              {name}
            </div>

            <span className="thread-list-item-time">
              {time}
            </span>
          </div>

          <div className="item-msg-status-wrapper">
            <div className="thread-list-item-msg">
              {msg + unicodeMsg}
            </div>

          </div>
        </div>
      </a>
    );
  }
}