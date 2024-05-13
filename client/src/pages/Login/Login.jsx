/* eslint-disable no-unused-vars */
import "./login.css";
import { CiLogin } from "assets/icon";
import doctorImage from "assets/images/loginImage.svg";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "hooks";
import { login } from "./loginFun";
import { InputError } from "components";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectPath = location.state?.path || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data, auth, navigate, redirectPath);
  };

  useEffect(() => {
    document.getElementById("email").focus();
  }, []);

  return (
    <div className="login p-5 container h-[100vh] flex justify-around items-center">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="form-container"
      >
        <p className="title flex items-center justify-center gap-2 relative w-fit mx-auto p-3">
          <span>
            <CiLogin />
          </span>
          Se Connectez
        </p>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label htmlFor="email">email :</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                required: { value: true, message: "email est obligatoire" },
                pattern: {
                  value: emailRegex,
                  message: "Veuillez entrer un email valide",
                },
              })}
              className={`${errors.email ? "inValid" : null}`}
            />
            {<InputError error={errors.email} />}
          </div>
          <div className="input-group">
            <label htmlFor="password">mot de passe :</label>
            <input
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              {...register("password", {
                required: {
                  value: true,
                  message: "mot de passe est obligatoire",
                },
                minLength: {
                  value: 4,
                  message:
                    "Le mot de passe doit comporter au moins 4 caractères",
                },
              })}
              className={`${errors.password ? "inValid" : null}`}
            />
            {<InputError error={errors.password} />}
            {/* <div className="forgot">
              <a rel="noopener noreferrer" href="#">
                Forgot Password ?
              </a>
            </div> */}
          </div>
          <button type="submit" className="sign p-2 bg-p bg-ph rounded-md ">
            Se Connectez
          </button>
        </form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="imageBox w-[600px]"
      >
        <img src={doctorImage} alt="Doctor image" className="w-[100%]" />
      </motion.div>
    </div>
  );
}

export default Login;
