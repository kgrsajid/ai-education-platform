import { LoginForm } from "../../../features/auth/login/login-form";

export const LoginPage = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#eff6ff",
    }}
  >
    <LoginForm />
  </div>
);
