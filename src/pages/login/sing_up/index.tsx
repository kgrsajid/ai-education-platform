import { RegisterForm } from "../../../features/auth/register/register-form";

export const RegisterPage = () => (
  <div className="bg-mesh min-h-screen flex flex-col">
    <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <RegisterForm />
    </main>
  </div>
);
