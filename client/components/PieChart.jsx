import React from 'react';
import RequestContext from '../contexts/RequestContext.jsx';

class PieChart extends React.Component {
  render() {
    console.log('context in piechart', this.context);
    return (
      <div>
      I'm a pie chart
      </div>
    )
  }
}

PieChart.contextType = RequestContext;
export default PieChart;