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

  render() {
    return (
      <div id="app">
        <RequestContext.Provider value={this.state.requests}>
          {this.state.tobeRendered}
        </RequestContext.Provider>
      </div>
    )
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
}

// App.contextType = RequestContext;

// const App = () => {
//   // const [clicks, setClick] = useState([{ wow: 0 }]);
//   const [activities, updateActivities] = useState({});

//   useEffect(() => {
    // fetch('https://sv-mock-data.herokuapp.com/')
    //   // Parsing the response into a readable JS array
    //   .then(res => res.json())
    //   // After converting, store the activities in our state 
    //   .then(res => {
    //     updateActivities(res);
    //     console.log(activities);
    //   })
    //   .catch(err => {
    //     throw err;
    //   }); 
//   }, []);

  // return (
  //   <div>
  //     Hello
  //     <Graphs />
  //     <Requests />
  //     {/* <button type="button" onClick={()=>{ setClick({ wow: clicks.wow + 1 }) }}>Test</button> */}
  //   </div>
  // )
// }


export default App;