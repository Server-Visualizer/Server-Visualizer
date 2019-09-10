import React, { Component } from 'react';
import Chart from 'chart.js';

class CodeChart extends Component {
  constructor(props) {
    super(props);
    // Initializing a React ref as an instance property for access to the DOM element where we would store the chart
    this.codeChartLocation = React.createRef();
    this.createChart = this.createChart.bind(this);
    this.codeChart;
  }

  createChart(data, ref, animationDuration) {
    // Saving the count for every status code
    const counter = {};
    // Going through our data via the props to do the counting
    data.forEach((request) => {
      // Create a key for the status code if there isn't already one
      if (!counter[request.status]) counter[request.status] = 0;
      // Append the method count by 1
      counter[request.status] += 1;
    });
    const counts = Object.values(counter);
    const statusCodes = Object.keys(counter);
    // The 'canvas' DOM element is now stored in the current attribute of our ref. Renaming it for clarity.
    const codeChartBase = ref.current;
    // Using the Chart.js to create a pie chart inside the 'canvas' DOM element
    this.codeChart = new Chart(codeChartBase, {
      // Specifying the chart type -> horizontal bar chart
      type: 'horizontalBar',
      // Plug in the processed request data
      data: {
        datasets: [{
          label: 'Status Codes',
          data: counts,
        }],
        labels: statusCodes,
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        },
        animation: {
          duration: animationDuration,
        }
      }
    })
  }

  // Once the CodeChart component renders and the ref is assigned to the right DOM component, add the chart in via Chart.JS
  componentDidMount () {
    this.createChart(this.props.data, this.codeChartLocation, 800);
  }

  componentDidUpdate () {
    if(this.codeChart) this.codeChart.destroy();
    this.createChart(this.props.data, this.codeChartLocation, 0);
  }
    
  render() {
    return (
      <div id="pie-chart-container">
        <canvas id="pie-chart" ref={this.codeChartLocation}></canvas>
      </div>
    )
  }

}

export default CodeChart;