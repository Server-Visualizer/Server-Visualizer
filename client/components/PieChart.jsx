import React from 'react';
import Chart from 'chart.js';

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.pieChartLocation = React.createRef();
  }
  componentDidMount () {
    console.log('props', this.props.data);
    const count = {};
    this.props.data.forEach((request) => {
      if (!count[request.method]) count[request.method] = 0;
      count[request.method] += 1;
    });
    console.log(count);
    const pieChartBase = this.pieChartLocation.current;
    const pieChart = new Chart(pieChartBase, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: Object.values(count),
        }],
        labels: Object.keys(count),
      },
    })
  }
  render() {
    return (
      <div id="pie-chart-container">
        <canvas id="pie-chart" ref={this.pieChartLocation}></canvas>
      </div>
    )
  }
}

export default PieChart;