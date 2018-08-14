import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect()
export default class App extends Component {
  render() {
    return (
      <div>Hello World!</div>
    );
  }
}
