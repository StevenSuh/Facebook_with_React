import React, {Component} from 'react';

export default class ThreadMsg extends Component {
  render() {
    const key = this.props.compKey;

    return (
      <div className="thread-window-msg">
        <p>{key.body}</p>
      </div>
    );
  }
}