import { RegisterForm } from "../../../features/auth/register/register-form";

export const RegisterPage = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#eff6ff",
    }}
  >
    <RegisterForm />
  </div>
);
