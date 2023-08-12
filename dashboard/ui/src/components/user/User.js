import { useAuth } from "../../context/AuthContext";
import { Typography } from "antd";

const { Text } = Typography;

const User = () => {
  const {
    auth: {
      isAuthenticated,
      user: { UserID, email, fullname },
      accessToken,
      refreshToken,
    },
  } = useAuth();
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          margin: "20px 0",
        }}
      >
        <Text level={1}>
          <b>UI State Manager</b>
        </Text>
        <Text level={2}>{fullname}</Text>
        <Text level={5}>ID: {UserID}</Text>
        <Text level={5}>email: {email}</Text>
        <Text level={5}>isAuthenticated: {isAuthenticated ? "Yes" : "No"}</Text>
        <Text level={5}>Access Token: {accessToken}</Text>
        <Text level={5}>Refresh Token: {refreshToken}</Text>
      </div>
    </>
  );
};

export default User;
