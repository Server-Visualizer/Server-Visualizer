import React from 'react';


class RequestDisplay extends React.Component {
  render() {
    console.log(this.props);
    const {method, reqTime, elapsedTime, status} = this.props.reqInfo;
    return (
      <div className="request">
        <p>Method: {method}</p>
        <p>Status: {status}</p>
        <p>Time It Took: </p>
      </div>
    )
  }
}

export default RequestDisplay;