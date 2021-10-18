import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

  constructor(props) {
    super(props);

    this.state = {
    //   options: {"true":"false"},
      series: [this.props.piechartData.true,this.props.piechartData.false],
      options: {
        labels: ['True', 'False'],
      },
      fill: {
        colors: ['#1A73E8', '#B32824']
      }
    }
  }

  render() {

    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
      </div>
    );
  }
}

export default Donut;