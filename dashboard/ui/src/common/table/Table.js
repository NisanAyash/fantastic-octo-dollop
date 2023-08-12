import React, { useState } from "react";
import { Table } from "antd";

const TableTemplate = ({ data = [], columns }) => {
  const tableProps = {
    bordered: false,
    loading: false,
    size: "small", 
    scroll: {
      y: 600,
      x: "100vw",
    },
    tableLayout: "fixed", 
  };

  const scroll = {
    y: 600,
    x: "100vw",
  };

  return (
    <Table
      {...tableProps}
      pagination={{
        position: ["none", "bottomRight"],
      }}
      dataSource={data}
      scroll={scroll}
      columns={columns}
    />
  );
};
export default TableTemplate;
