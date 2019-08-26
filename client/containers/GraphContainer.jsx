import React from 'react';
import RequestContext from '../contexts/RequestContext.jsx';
import PieChart from '../components/PieChart.jsx'

// Container for all the visualization this app contains
class Graphs extends React.Component {
  render() {
    console.log('API test', this.context);
    return (
      <div id="graph-container">
        <PieChart data={this.context} />
      </div>
    )
  }
}

Graphs.contextType = RequestContext;
export default Graphs;