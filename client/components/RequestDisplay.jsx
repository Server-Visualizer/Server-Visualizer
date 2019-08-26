import React from 'react';


class RequestDisplay extends React.Component {
  render() {
    const { method, reqTime, elapsedTime, status } = this.props.reqInfo;
    const parsedReqTime = new Date(reqTime).toLocaleTimeString();
    const parsedElapsedTime = elapsedTime.toPrecision(1);
    return (
      <div className="request">
        <p>Method: {method}</p>
        <p>Status: {status}</p>
        <p>Request Time: {parsedReqTime}</p>
        <p>Processing Time: {parsedElapsedTime}ms</p>
      </div>
    )
  }
}

export default RequestDisplay;