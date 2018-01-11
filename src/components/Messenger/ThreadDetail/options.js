import React, {Component} from 'react';

export default class Options extends Component {
  render() {
    return (
      <div className="thread-detail-options">
        <p className="thread-detail-title">Chat Options</p>

        <button className="options-profile">
          <svg width="24" height="24" viewBox="0.5 0 24 24">
            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
          </svg>

          <span>Open profile</span>
        </button>

        <button className="options-search">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>

          <span>Search in conversation</span>
        </button>

        <button className="options-nickname">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
          </svg>

          <span>Edit nicknames</span>
        </button>

        <button className="options-color">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z" />
          </svg>

          <span>Change color</span>
        </button>

        <button className="options-emoji">
          {/* to be emoji */}
          <svg width="20" height="20.5" viewBox="0 0 40 41">
            <g transform="translate(-667 -1269)">
              <path d="M668,1308.99h7v-22h-7v22ZM706,1291.7a3.584,3.584,0,0,0-1.778-3.09,0.036,0.036,0,0,1-.011-0.06,3.545,3.545,0,0,0,1.389-2.81,3.587,3.587,0,0,0-3.6-3.58H691.011c2.02-10.5-3.071-12.59-5.1-12.08-1.211.3-1.34-.03-1.12,2.35l0.1,3.95a3.924,3.924,0,0,1-.66,2.29L679,1286.52v19.47h19.213a3.6,3.6,0,0,0,3.4-3.57,3.534,3.534,0,0,0-.38-1.6c-0.01-.02-0.007-0.05.016-0.05a3.584,3.584,0,0,0,2.963-3.52,3.509,3.509,0,0,0-.706-2.11c-0.01-.02,0-0.04.014-0.04A3.583,3.583,0,0,0,706,1291.7Z" />
            </g>
          </svg>

          <span>Change emoji</span>
        </button>

        <button className="options-notification">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20H14M12,2A1,1 0 0,1 13,3V4.08C15.84,4.56 18,7.03 18,10V16L21,19H3L6,16V10C6,7.03 8.16,4.56 11,4.08V3A1,1 0 0,1 12,2Z" />
          </svg>

          <span>Notifications</span>
        </button>
      </div>
    );
  }
}