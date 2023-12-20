import Widget from "../shared/Widget";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/slices/authSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function LoginForm() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(
      login({
        email,
        password,
      }),
    );
  };

  return (
    <Widget heading={t("loggingIn")}>
      <Form
        className="px-3"
        style={{ minWidth: 400 }}
        onSubmit={(event) => handleLogin(event)}
      >
        <FormGroup row>
          <Label htmlFor="email" sm={3} className="text-body-secondary">
            {t("email")}:
          </Label>
          <Col sm={9}>
            <Input
              type="email"
              id="email"
              name="email"
              className="text-body-secondary"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              invalid={error}
            />
            <FormFeedback>{t("badCredentials")}</FormFeedback>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="password" sm={3} className="text-body-secondary">
            {t("password")}:
          </Label>
          <Col sm={9}>
            <Input
              type="password"
              id="password"
              name="password"
              className="text-body-secondary"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              invalid={error}
            />
            <FormFeedback>{t("badCredentials")}</FormFeedback>
          </Col>
        </FormGroup>
        <Button color="primary" className="d-block mx-auto my-4">
          {t("login")}
        </Button>
      </Form>
    </Widget>
  );
}

export default LoginForm;
