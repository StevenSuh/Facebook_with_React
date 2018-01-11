import React, {Component} from 'react';

import Options from './options';
import Photos from './photos';

export default class ThreadDetail extends Component {
  render() {
    return (
      <section className="thread-detail">
        <Options />

        <Photos />
      </section>
    );
  }
}