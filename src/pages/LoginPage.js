import LoginForm from "../components/features/LoginForm";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function LoginPage() {
  const user = useSelector((state) => state.auth.user);

  return user === null ? (
    <section className="d-flex vh-100 align-items-center justify-content-center">
      <LoginForm />
    </section>
  ) : (
    <Navigate to="/" />
  );
}

export default LoginPage;
