import React, { useEffect, useState } from "react";
import Table from "../../common/table/Table";
import UsersService from "../../services/UsersService";

const columns = [
  {
    title: "UserID",
    dataIndex: "UserID",
  },
  {
    title: "Fullname",
    dataIndex: "fullname",
  },
  {
    title: "@Email",
    dataIndex: "email",
  },
];

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await UsersService.getUsers();
        setUsers(users);
        return users;
      } catch (error) {
        console.error(error.message);
      }
    };

    getUsers();
  }, []);

  return <Table data={users} columns={columns} />;
};

export default UsersTable;
