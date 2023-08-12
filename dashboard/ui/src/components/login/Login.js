import { Button, Input, Typography } from "antd";
import { Col, Row } from "antd";
import { LoginWrapper, LoginForm } from "./Login.style";
import { useForm, Controller } from "react-hook-form";
import AuthService from "../../services/AuthService";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;

const Login = () => {
  const { userLoggedIn } = useAuth();

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const response = await AuthService.login({ email, password });
      const { user, accessToken, refreshToken } = response.data;
      AuthService.setTokens({ accessToken, refreshToken });
      userLoggedIn({ user, accessToken, refreshToken });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <LoginWrapper>
      <Row>
        <Col>
          <LoginForm>
            <Col>
              <Title level={3}>Login</Title>
              <Text>
                is simply dummy text of the printing and typesetting industry.
              </Text>
            </Col>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder="me@email.com" />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input.Password {...field} placeholder="Password" />
              )}
            />
            <Button onClick={handleSubmit(onSubmit)}>Login</Button>
            <Text>"jhon@doe.com":"123456"</Text>
          </LoginForm>
        </Col>
      </Row>
    </LoginWrapper>
  );
};

export default Login;
