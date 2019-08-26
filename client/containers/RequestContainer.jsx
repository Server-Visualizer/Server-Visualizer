import React from 'react';
import RequestDisplay from '../components/RequestDisplay.jsx';
import RequestContext from '../contexts/RequestContext.jsx';

class Requests extends React.Component {
  render() {
    const requestComponents = this.context.map((request, i) => {
      return <RequestDisplay reqInfo={request} key={`request${i}`} />;
    });
    return (
      <div id="request-container">
      {requestComponents}
      </div>
    )
  }
}

Requests.contextType = RequestContext;

export default Requests;