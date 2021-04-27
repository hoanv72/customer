import React from "react";
import ReactApexChart from "react-apexcharts";

class PlanList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        { name: "Distance", data: [70, 50, 80, 120, 120, 80, 120, 100] },
      ],
      options: {
        chart: {
          height: 200,
          type: "area",
          group: "social",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [10],
          colors: ["#0B2A97"],
          curve: "smooth",
        },
        legend: {
          show: false,
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
        },
        markers: {
          strokeWidth: [8],
          strokeColors: ["#0B2A97"],
          border: 0,
          colors: ["#fff"],
          hover: {
            size: 13,
          },
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          labels: {
            style: {
              colors: "#3E4954",
              fontSize: "14px",
              fontFamily: "Poppins",
              fontWeight: 100,
            },
          },
        },
        yaxis: {
          labels: {
            offsetX: -16,
            style: {
              colors: "#3E4954",
              fontSize: "14px",
              fontFamily: "Poppins",
              fontWeight: 100,
            },
          },
        },
        fill: {
          colors: ["#0B2A97"],
          type: "solid",
          opacity: 0,
        },
        colors: ["#0B2A97"],
        grid: {
          borderColor: "#f1f1f1",
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        responsive: [
          {
            breakpoint: 1601,
            options: {
              chart: {
                height: 400,
              },
            },
          },
          {
            breakpoint: 768,
            options: {
              chart: {
                height: 250,
              },
              markers: {
                strokeWidth: [4],
                strokeColors: ["#0B2A97"],
                border: 0,
                colors: ["#fff"],
                hover: {
                  size: 6,
                },
              },
              stroke: {
                width: [6],
                colors: ["#0B2A97"],
                curve: "smooth",
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
          type="area"
          height={200}
        />
      </div>
    );
  }
}

export default PlanList;
