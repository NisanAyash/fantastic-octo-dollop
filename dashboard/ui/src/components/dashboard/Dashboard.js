import { useEffect, useState } from "react";
import ReportsService from "../../services/ReportsService";
import { Card, Col, Row, Typography } from "antd";
import Widget from "../widget/Widget";
import { Bar, Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

const { Title, Text } = Typography;

const LineChart = () => {
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Weekly Requests",
        data: [10, 20, 15, 30, 130, 115, 330],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category", // Ensure that the "category" scale is used for x-axis
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

const BarChart = () => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"], // Your week labels here
    datasets: [
      {
        label: "Weekly Requests",
        data: [10, 20, 15, 30], // Your request data here
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category", // Ensure that the "category" scale is used for x-axis
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"], // Repeat labels here
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

const Dashboard = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getReports = async () => {
      try {
        const reports = await ReportsService.getReports();
        setReports(reports);
        return reports;
      } catch (error) {
        console.error(error.message);
      }
    };

    getReports();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        <Widget>
          <Title level={5}>Reports Amount</Title>
          <Text level={1}>{reports.length}</Text>
        </Widget>
        <Widget>
          <Title level={5}>Partner Count</Title>
          <Text level={1}>{reports.length}</Text>
        </Widget>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
          margin: "24px 0",
        }}
      >
        <Widget>
          <Title level={5}>Countries Count</Title>
          <Text level={1}>{reports.length}</Text>
        </Widget>
        <Widget>
          <Title level={5}>Reports Rate</Title>
          <Text level={1}>500</Text>
        </Widget>
        <Widget>
          <Title level={5}>Weekday Breakdown</Title>
          <LineChart />
        </Widget>
        <Widget>
          <Title level={5}>Breakdown By Countries</Title>
          <BarChart />
        </Widget>
      </div>
    </>
  );
};

export default Dashboard;
