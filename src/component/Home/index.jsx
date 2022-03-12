import React, { Component } from 'react';
import Top from '../Top'
import Main from '../Main'

export default class Home extends Component {
  render() {
    return <div className='home'>
      <Top></Top>
      <Main></Main>
    </div>;
  }
}
