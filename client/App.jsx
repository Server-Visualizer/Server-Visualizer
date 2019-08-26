import React from 'react';
import Graphs from './containers/GraphContainer.jsx';
import Requests from './containers/RequestContainer.jsx';
import RequestContext from './contexts/RequestContext.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      requests: [],
      tobeRendered: [],
    };    
  }

  componentDidMount() {
    (async () => {
      // Grab requests from our mock server
      const fetched = await fetch('https://sv-mock-data.herokuapp.com/');
      // Parsing the response into a readable JS array
      const requests = await fetched.json();
      this.setState({ requests: requests, tobeRendered: [<Graphs key='Graphs' />, <Requests key='Requests' />] });
    })();
  }

  render() {
    return (
      <div id="app">
        <RequestContext.Provider value={this.state.requests}>
          {this.state.tobeRendered}
        </RequestContext.Provider>
      </div>
    )
  }
}

export default App;