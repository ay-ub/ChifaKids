import { Notify } from "utils";
const login = async (data, auth, navigate, redirectPath) => {
  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (resData.status === "success") {
      auth.login(resData.data.user);
      localStorage.setItem("token", resData.data.token);
      console.log(resData.data.token);
      Notify({
        type: "success",
        message: `bienvenue ${resData.data.user.firstName} ${resData.data.user.lastName}`,
      });
      navigate(redirectPath, { replace: true });
    } else {
      Notify({
        type: "error",
        message: "vérifier vos informations de connexion.",
      });
    }
  } catch (err) {
    Notify({
      type: "error",
      message: "Veuillez vérifier votre connexion.",
    });
  }
};

export { login };
