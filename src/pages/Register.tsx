import RegisterForm from "../components/auth/RegisterForm";
import RegisterPanel from "../components/auth/RegisterPanel";

const Register = () => {
  return (
    <div className="min-h-screen flex bg-[#0a0818] text-white overflow-hidden">
      <RegisterForm />
      <RegisterPanel />
    </div>
  );
};

export default Register;