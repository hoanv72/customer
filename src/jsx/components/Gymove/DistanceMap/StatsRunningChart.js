import React from "react";
import ReactApexChart from "react-apexcharts";

class StatsRunningChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Running",
          data: [50, 18, 70, 40, 90, 70, 20, 75, 80, 25, 70, 45],
        },
        {
          name: "Cycling",
          data: [80, 40, 55, 20, 45, 30, 80, 90, 85, 90, 30, 85],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 370,

          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "rounded",
            columnWidth: "50%",
          },
        },
        colors: ["#70349D", "#FF3282"],
        dataLabels: {
          enabled: false,
        },
        markers: {
          shape: "circle",
        },
        legend: {
          show: false,
          fontSize: "12px",
          labels: {
            colors: "#000000",
          },
          markers: {
            width: 18,
            height: 18,
            strokeWidth: 0,
            strokeColor: "#fff",
            fillColors: undefined,
            radius: 12,
          },
        },
        stroke: {
          show: true,
          width: 6,
          colors: ["transparent"],
        },
        grid: {
          borderColor: "#eee",
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          labels: {
            style: {
              colors: "#787878",
              fontSize: "13px",
              fontFamily: "poppins",
              fontWeight: 100,
              cssClass: "apexcharts-xaxis-label",
            },
          },
          crosshairs: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            offsetX: -16,
            style: {
              colors: "#787878",
              fontSize: "13px",
              fontFamily: "poppins",
              fontWeight: 100,
              cssClass: "apexcharts-xaxis-label",
            },
          },
        },
        fill: {
          opacity: 1,
          colors: ["#70349D", "#FF3282"],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            },
          },
        },
        responsive: [
          {
            breakpoint: 575,
            options: {
              plotOptions: {
                bar: {
                  columnWidth: "40%",
                },
              },
              chart: {
                height: 250,
              },
            },
          },
        ],
      },
    };
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={370}
        />
      </div>
    );
  }
}

export default StatsRunningChart;
