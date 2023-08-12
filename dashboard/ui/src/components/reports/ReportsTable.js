import React, { useEffect, useState } from "react";
import Table from "../../common/table/Table";
import ReportsService from "../../services/ReportsService";
import { Tooltip } from "antd";

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "category",
    dataIndex: "category",
  },
  {
    title: "subcategory",
    dataIndex: "subcategory",
  },
  {
    title: "clientid",
    dataIndex: "clientid",
  },
  {
    title: "countryid",
    dataIndex: "countryid",
  },
  {
    title: "creationdate",
    dataIndex: "creationdate",
  },
  {
    title: "userAgent",
    dataIndex: "userAgent",
    render: (d) => {
      return (
        <Tooltip title={d}>
          <div>{d.substring(0, 20 - 3) + "..."}</div>
        </Tooltip>
      );
    },
  },
];

const ReportsTable = () => {
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

  return <Table data={reports} columns={columns} />;
};

export default ReportsTable;
