import React from 'react';


class RequestDisplay extends React.Component {
  render() {
    const { method, reqTime, elapsedTime, status } = this.props.reqInfo;
    const parsedReqTime = new Date(reqTime).toLocaleTimeString();
    const parsedElapsedTime = elapsedTime.toPrecision(1);
    return (
      <div className="request">
        <p><strong>Method:</strong> {method}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Request Time:</strong> {parsedReqTime}</p>
        <p><strong>Processing Time:</strong> {parsedElapsedTime}ms</p>
      </div>
    )
  }
}

export default RequestDisplay;