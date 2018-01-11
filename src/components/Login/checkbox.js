import React, {Component} from 'react';

export default class Checkbox extends Component {
  onToggleChange({target}) {
    if (target.checked) target.nextSibling.classList.add('active');
    else target.nextSibling.classList.remove('active');

    this.props.onToggleChange(target.checked);
  }

  render() {
    return (
      <div className="section section-checkbox">
        <p>
          <input 
            className="checkbox"
            type="checkbox" 
            onChange={this.onToggleChange.bind(this)} 
          />
          <span className="checkbox-span">
            <span className="checkbox-check">
              <svg viewBox="3 3 18 18">
                <g>
                  <path d="M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z "/>
                </g>
              </svg>
            </span>
          </span>
          Remember me
        </p>
      </div>
    );
  }
}