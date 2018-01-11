import React, {Component} from 'react';

export default class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {photos: []};
  }

  componentDidMount() {
    const newList = [];

    for (let i = 1; i <= 10; i++) newList[i-1] = {photoSrc: i};
    this.setState({...this.state, photos: newList});
  }

  render() {
    const photoItem = [];
    
    for (let i = 0; i < this.state.photos.length; i++) {
      photoItem.push(
        <div className="thread-detail-photo-item" key={i} >
          <div className="thread-detail-photo-img" />
          <div className="overlay" />
        </div>
      );
    }

    return (
      <div className="thread-detail-photos">
        <p className="thread-detail-title">Shared Photos</p>
        
        {/* Photos */}
        <div className="thread-detail-photos-wrapper">
          {photoItem}
        </div>
      </div>
    );
  }
}