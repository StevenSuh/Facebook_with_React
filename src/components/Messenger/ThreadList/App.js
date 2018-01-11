import React, {Component} from 'react';

const {ipcRenderer} = window.require('electron');

import SearchBar from './searchBar.js';
import ThreadListItem from './thread.js';

import {getThreadList} from '../../../actions';

export default class ThreadList extends Component {
  constructor(props) {
    super(props);

    this.state = {list: [], term: ''};
  }

  componentDidMount() {
    getThreadList(0, 20);

    ipcRenderer.on('fb:thread_list_done', (event, list) => {
      this.setState({...this.state, list: list});
      this.onThreadUpdate(list[0]);
    });

    const list = document.getElementById('thread-list-items');
    list.addEventListener("updateLastMsg", (e) => {
      console.log(e);
    }, true);

    // get threadListGraphQL maybe 0 to 20
    // edge case:
    //    if unread, unreadCount > 0
    //               bolded name and messages
    //    if unread then lastReadIcon would not exist
    // 
    // probably want to use getUserInfo() to obtain pics
    //
    // probably want to return first message's threadID
    // this.props.onCompUpdate(threadID);
  }

  onInputChange({target}) {
    this.setState({...this.state, term: target.value});
  }

  onItemClick({target}) {
    target.classList.remove('unread');
  }

  onThreadUpdate(value) {
    this.props.onCompUpdate(value);
  }

  onThreadClick({target}) {
    const index = target.getAttribute('data-index');
    this.onThreadUpdate(this.state.list[index]);
  }

  // componentWillReceiveProps(nextProps) {} // use this to concat threadList
  render() {
    const threadListItem = [];
    const list = this.state.list;

    for (let i = 0; i < list.length; i++) {
      list[i].index = i;
      threadListItem.push(<ThreadListItem 
        key={i} 
        compKey={list[i]} 
        onClick={this.onThreadClick.bind(this)}
      />);
    }

    return (
      <section className="thread-list">
        <SearchBar 
          compValue={this.state.term}
          onCompChange={this.onInputChange.bind(this)}
        />

        <div 
          id="thread-list-items"
          className="thread-list-item-wrapper"
          onClick={this.onItemClick}
          ref="threadListItem"
        >
          {threadListItem}
        </div>
      </section>
    );
  }
}