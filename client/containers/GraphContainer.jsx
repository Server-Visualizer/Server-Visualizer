import React, { Component } from 'react';
import RequestContext from '../contexts/RequestContext.jsx';
import PieChart from '../components/HTTPRequestPieChart.jsx';
import CodeChart from '../components/StatusCodeChart.jsx';

// Container for all the visualization this app contains
class Graphs extends Component {
  render() {
    return (
      <div id="graph-container">
        <PieChart data={this.context} />
        <CodeChart data={this.context} />
      </div>
    )
  }
}

Graphs.contextType = RequestContext;
export default Graphs;