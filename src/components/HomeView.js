import React from 'react';
import { withRouter } from 'react-router-dom';

const HomeView = ({history}) => {
  console.log('Home view');
  return (
    <div className="main">This is the Home page.</div>
  )
}

export default withRouter(HomeView);
