import React from 'react';
import Graphs from './containers/GraphContainer.jsx';
import Requests from './containers/RequestContainer.jsx';
import RequestContext from './contexts/RequestContext.jsx';
import Placeholder from './components/Placeholder.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      requests: [],
      tobeRendered: [],
    };    
  }

  componentDidMount() {
    const fetching = async () => {
      // Grab requests from our mock server
      const fetched = await fetch('/ping');
      // Parsing the response into a readable JS array
      const requests = await fetched.json();
      console.log(requests);
      if (!requests.length) {
        this.setState({ tobeRendered: [<Placeholder key='Placeholder' />] });
      } else {
        this.setState({ requests: requests, tobeRendered: [<Graphs key='Graphs' />, <Requests key='Requests' />] });
      }
    };
    setInterval(fetching, 2000);
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