import React, {Component} from 'react';

export default class ThreadBar extends Component {
  render() {
    const key = this.props.compThread;

    const pic = [];
    let name = '';

    if (key.name) {
      name = key.name;

      Object.values(key.profilePics).forEach((img, i) => {
        if (i >= 3) return;

        const className = (i === 0) ? 'single' : 'double'; 
        img += '?width=50&height=50';

        pic.push(
          <img
            key={i}
            className={`thread-window-bar-picture-img ${className}`}
            alt={name}
            src={img}
          />
        );
      });
    }



    return (
      <section className="thread-window-bar">
        <div className="thread-window-bar-picture">
          {pic}
        </div>

        <div className="thread-window-bar-name">
          {name}
        </div>

        <div className="thread-window-bar-options">
          <button className="options-settings">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M9,4A4,4 0 0,0 5,8A4,4 0 0,0 9,12A4,4 0 0,0 13,8A4,4 0 0,0 9,4M9,14C6.33,14 1,15.33 1,18V20H12.08C12.03,19.67 12,19.34 12,19C12,17.5 12.5,16 13.41,14.8C11.88,14.28 10.18,14 9,14M18,14C17.87,14 17.76,14.09 17.74,14.21L17.55,15.53C17.25,15.66 16.96,15.82 16.7,16L15.46,15.5C15.35,15.5 15.22,15.5 15.15,15.63L14.15,17.36C14.09,17.47 14.11,17.6 14.21,17.68L15.27,18.5C15.25,18.67 15.24,18.83 15.24,19C15.24,19.17 15.25,19.33 15.27,19.5L14.21,20.32C14.12,20.4 14.09,20.53 14.15,20.64L15.15,22.37C15.21,22.5 15.34,22.5 15.46,22.5L16.7,22C16.96,22.18 17.24,22.35 17.55,22.47L17.74,23.79C17.76,23.91 17.86,24 18,24H20C20.11,24 20.22,23.91 20.24,23.79L20.43,22.47C20.73,22.34 21,22.18 21.27,22L22.5,22.5C22.63,22.5 22.76,22.5 22.83,22.37L23.83,20.64C23.89,20.53 23.86,20.4 23.77,20.32L22.7,19.5C22.72,19.33 22.74,19.17 22.74,19C22.74,18.83 22.73,18.67 22.7,18.5L23.76,17.68C23.85,17.6 23.88,17.47 23.82,17.36L22.82,15.63C22.76,15.5 22.63,15.5 22.5,15.5L21.27,16C21,15.82 20.73,15.65 20.42,15.53L20.23,14.21C20.22,14.09 20.11,14 20,14M19,17.5A1.5,1.5 0 0,1 20.5,19A1.5,1.5 0 0,1 19,20.5C18.16,20.5 17.5,19.83 17.5,19A1.5,1.5 0 0,1 19,17.5Z" />
            </svg>
          </button>

          <button className="options-info">
            <svg width="28" height="26" viewBox="0 0 24 24">
              <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2"/>
              <polyline points="11,9 13,9 13,7 11,7 "/>
              <rect x="11" y="11" width="2" height="6"/>
            </svg>
          </button>
        </div>
      </section>
    );
  }
}