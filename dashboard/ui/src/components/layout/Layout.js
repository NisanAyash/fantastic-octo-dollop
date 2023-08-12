import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  AppstoreOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;

export const DashboardHeader = ({collapsed, setCollapsed}) => {
  return (
    <Header
      style={{
        padding: 0,
        background: "#fff",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

const LayoutComponent = ({ selectedKey, setSelectedKey, children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={selectedKey}
          items={[
            {
              key: "dashboard",
              icon: <AppstoreOutlined />,
              label: "Dashboard",
            },
            {
              key: "table-view",
              icon: <TableOutlined />,
              label: "Reports Table View",
            },
            {
              key: "user-module",
              icon: <UserOutlined />,
              label: "User",
            },
            {
              key: "users-table",
              icon: <UserOutlined />,
              label: "Users",
            },
          ]}
          onClick={({ keyPath }) => setSelectedKey(keyPath)}
        />
      </Sider>
      <Layout>
        <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "calc(100vh - 112px)",
            background: "#fff",
            overflow: "auto"
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;
