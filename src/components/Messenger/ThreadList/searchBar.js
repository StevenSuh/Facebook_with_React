import React, {Component} from 'react';

export default class SearchBar extends Component {
  render() {
    return (
      <div className="search-bar-section">
        <form className="search-bar-wrapper">
          <input 
            type="text" 
            className="search-bar" 
            value={this.props.compValue}
            onChange={this.props.onCompChange}
            placeholder="Search..."
          />
          <button className="search-bar-magnify">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
          </button>
        </form>
        <label className="new-message">
          <svg width="26" height="26" viewBox="0 0 24 24">
            <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2"/>
            <polygon points="12.9,7 11.1,7 11.1,11.1 7,11.1 7,12.9 11.1,12.9 11.1,17 12.9,17 12.9,12.9 17,12.9 17,11.1 12.9,11.1 "/>
          </svg>
        </label>

      </div>
    );
  }
}