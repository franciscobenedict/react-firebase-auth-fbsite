import React from 'react';
import { withRouter } from 'react-router-dom';

const ReportsView = ({history}) => {
  console.log('Reports view');
  return (
    <div className="main">This is the Reports page.</div>
  )
}

export default withRouter(ReportsView);
