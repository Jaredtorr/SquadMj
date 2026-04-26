import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio.";
    } else if (form.username.length < 3) {
      newErrors.username = "Debe tener al menos 3 caracteres.";
    }

    if (!form.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (form.password.length < 6) {
      newErrors.password = "Debe tener al menos 6 caracteres.";
    }

    if (!form.confirm) {
      newErrors.confirm = "Por favor confirma tu contraseña.";
    } else if (form.confirm !== form.password) {
      newErrors.confirm = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    console.log("Register payload:", form);
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-600 focus:outline-none transition-all ${
      errors[field]
        ? "border-pink-500 focus:border-pink-400 focus:bg-white/10"
        : "border-white/10 focus:border-purple-500 focus:bg-white/10"
    }`;

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center px-10 relative z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-700 opacity-10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative">
        <div className="flex items-center gap-2 mb-8">
          <div
            className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center"
            style={{
              boxShadow:
                "0 0 14px rgba(168,85,247,0.7), 0 0 28px rgba(168,85,247,0.3)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"
                fill="white"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-widest uppercase text-purple-300">
            SquadUp
          </span>
        </div>

        <h1 className="text-5xl font-black mb-2 leading-tight">
          Crea tu
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Cuenta.
          </span>
        </h1>
        <p className="text-gray-500 mb-8 text-sm tracking-wide">
          Únete a miles de jugadores. Es gratis, siempre.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">
              Nombre de usuario
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="xX_TuTag_Xx"
              className={inputClass("username")}
            />
            {errors.username && (
              <p className="text-pink-400 text-xs mt-1 pl-1">
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@squadup.gg"
              className={inputClass("email")}
            />
            {errors.email && (
              <p className="text-pink-400 text-xs mt-1 pl-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputClass("password")}
            />
            {errors.password && (
              <p className="text-pink-400 text-xs mt-1 pl-1">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputClass("confirm")}
            />
            {errors.confirm && (
              <p className="text-pink-400 text-xs mt-1 pl-1">
                {errors.confirm}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-900/40 mt-2"
          >
            Crear cuenta
          </button>
        </div>

        <p className="mt-6 text-gray-500 text-sm text-center">
          ¿Ya tienes una cuenta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 cursor-pointer hover:text-purple-300 transition font-semibold"
          >
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;