import React from 'react';
import Chart from 'chart.js';
import requestColors from '../styles/RequestColors';

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    // Initializing a React ref as an instance property for access to the DOM element where we would store the chart
    this.pieChartLocation = React.createRef();
    this.createChart = this.createChart.bind(this);
    this.pieChart;
  }

  createChart(data, ref, animation) {
    // Saving the count for every HTTP request type
    const counter = {};
    // Going through our data via the props to do the counting
    data.forEach((request) => {
      // Create a key for the request method if there isn't already one
      if (!counter[request.method]) counter[request.method] = 0;
      // Append the method count by 1
      counter[request.method] += 1;
    });
    const counts = Object.values(counter);
    const requestTypes = Object.keys(counter);
    // The 'canvas' DOM element is now stored in the current attribute of our ref. Renaming it for clarity.
    const pieChartBase = ref.current;
    // Using the Chart.js to create a pie chart inside the 'canvas' DOM element
    this.pieChart = new Chart(pieChartBase, {
      // Specifying the chart type -> doughnut chart
      type: 'doughnut',
      // Plug in the processed request data
      data: {
        datasets: [{
          data: counts,
          backgroundColor: requestColors(requestTypes),
        }],
        labels: requestTypes,
      },
      options: {
        animation: {
          duration: animation,
        }
      }
    })
  }
  
  // Once the PieChart component renders and the ref is assigned to the right DOM component, add the chart in via Chart.JS
  componentDidMount () {
    this.createChart(this.props.data, this.pieChartLocation, 2000);
  }

  componentDidUpdate () {
    if(this.pieChart) this.pieChart.destroy();
    this.createChart(this.props.data, this.pieChartLocation, 0);
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