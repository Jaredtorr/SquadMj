import AuthForm from "../components/auth/AuthForm";
import AuthPanel from "../components/auth/AuthPanel";

const Login = () => {
  return (
    <div className="min-h-screen flex bg-[#0a0818] text-white overflow-hidden">
      <AuthForm />
      <AuthPanel />
    </div>
  );
};

export default Login;
